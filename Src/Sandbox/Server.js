export const schema = 
  "CREATE TABLE IF NOT EXISTS leaderboard_scores (" +
  "user_id TEXT PRIMARY KEY, " +
  "username TEXT NOT NULL, " +
  "points INTEGER NOT NULL DEFAULT 0" +
  ");" +
  "CREATE INDEX IF NOT EXISTS leaderboard_scores_rank ON leaderboard_scores (points DESC, username ASC);" +
  "CREATE TABLE IF NOT EXISTS project_announcements (" +
  "id INTEGER PRIMARY KEY, " +
  "user_id TEXT NOT NULL, " +
  "username TEXT NOT NULL, " +
  "text TEXT NOT NULL, " +
  "created_at INTEGER NOT NULL" +
  ");";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/leaderboard") {
      const { results } = await env.DB
        .prepare("SELECT username, points FROM leaderboard_scores ORDER BY points DESC, username ASC LIMIT 10")
        .all();
      return Response.json({ scores: results });
    }

    if (request.method === "GET" && url.pathname === "/api/announcements") {
      const { results } = await env.DB.prepare(
        "SELECT id, username, text, created_at FROM project_announcements ORDER BY id DESC LIMIT 5"
      ).all();
      return Response.json({ announcements: results });
    }

    if (request.method === "POST" && url.pathname === "/api/announcements") {
      const userId = request.headers.get("x-websim-user-id");
      const username = request.headers.get("x-websim-username");
      if (!userId || !username) {
        return Response.json({ error: "Sign in to post an announcement." }, { status: 401 });
      }
      const normalizedUsername = username.toLowerCase();
      const role = request.headers.get("x-websim-user-role");
      const ownerId = request.headers.get("x-websim-project-owner-id");
      const namedAdmin = normalizedUsername === "heitorm2003" || normalizedUsername === "kris_is_gaster";
      const isAuthorized = userId === ownerId || role === "owner" || role === "admin" || namedAdmin;
      if (!isAuthorized) {
        return Response.json({ error: "Only project admins can post announcements." }, { status: 403 });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "Invalid JSON body." }, { status: 400 });
      }
      if (typeof body?.text !== "string") {
        return Response.json({ error: "Announcement text is required." }, { status: 400 });
      }
      const text = body.text.trim();
      if (!text || text.length > 280) {
        return Response.json({ error: "Announcements must be 1–280 characters." }, { status: 400 });
      }

      const createdAt = Date.now();
      const result = await env.DB.prepare(
        "INSERT INTO project_announcements (user_id, username, text, created_at) VALUES (?, ?, ?, ?)"
      ).bind(userId, username, text, createdAt).run();
      const announcement = await env.DB.prepare(
        "SELECT id, username, text, created_at FROM project_announcements WHERE id = ?"
      ).bind(result.meta.last_row_id).first();
      return Response.json({ announcement }, { status: 201 });
    }

    if (request.method === "POST" && url.pathname === "/api/score") {
      const userId = request.headers.get("x-websim-user-id");
      const username = request.headers.get("x-websim-username");
      if (!userId || !username) {
        return Response.json({ error: "Sign in to save a leaderboard score." }, { status: 401 });
      }

      let body;
      try {
        body = await request.json();
      } catch {
        return Response.json({ error: "Invalid JSON body." }, { status: 400 });
      }
      const points = body?.points;
      if (!Number.isSafeInteger(points) || points < 0 || points > 1000000000) {
        return Response.json({ error: "Score must be a whole number between 0 and 1,000,000,000." }, { status: 400 });
      }

      await env.DB.prepare(
        "INSERT INTO leaderboard_scores (user_id, username, points) VALUES (?, ?, ?) " +
        "ON CONFLICT(user_id) DO UPDATE SET points = excluded.points, username = excluded.username"
      ).bind(userId, username, points).run();
      return Response.json({ ok: true });
    }

    return new Response("Not found", { status: 404 });
  },
};

const globalChatMessages = [];
const lastChatPostAt = new Map();
const CHAT_HISTORY_LIMIT = 50;
const CHAT_RATE_LIMIT_MS = 800;

export const room = {
  async onConnect(conn) {
    conn.send({ type: "chat-history", messages: globalChatMessages });
  },

  async onMessage(conn, wireMessage, room) {
    let input;
    try {
      input = typeof wireMessage === "string" ? JSON.parse(wireMessage) : wireMessage;
    } catch {
      return;
    }
    if (input?.type !== "chat") return;

    const now = Date.now();
    const previous = lastChatPostAt.get(conn.id) || 0;
    if (now - previous < CHAT_RATE_LIMIT_MS) {
      conn.send({ type: "chat-warning", text: "Please wait a moment before sending again." });
      return;
    }

    const text = room.censor(String(input.text ?? "").slice(0, 1000)).trim().slice(0, 200);
    if (!text) return;
    const username = room.censor(String(conn.username || "guest").slice(0, 64)).trim().slice(0, 32) || "guest";
    const normalizedUsername = username.toLowerCase();
    const tags = [];
    if (conn.isOwner || conn.role === "owner" || normalizedUsername === "heitorm2003") {
      tags.push("owner");
    } else if (conn.role === "admin" || normalizedUsername === "kris_is_gaster") {
      tags.push("admin");
    }
    if (normalizedUsername === "kris_is_gaster") tags.push("goat");
    if (!tags.length && conn.identity !== "user") tags.push("guest");

    const chatMessage = {
      type: "chat-message",
      username,
      isUser: conn.identity === "user",
      tags,
      text,
      at: now,
    };

    lastChatPostAt.set(conn.id, now);
    globalChatMessages.push(chatMessage);
    if (globalChatMessages.length > CHAT_HISTORY_LIMIT) globalChatMessages.shift();
    room.broadcast(chatMessage);
  },

  async onClose(conn) {
    lastChatPostAt.delete(conn.id);
  },
};
