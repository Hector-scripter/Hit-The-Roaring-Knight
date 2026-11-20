// Cache ban lookups so reconnects do not block on another database round trip.
const roomBanCache = new Map();
function cacheRoomBanStatus(username, status) {
  roomBanCache.delete(username);
  roomBanCache.set(username, status);
  if (roomBanCache.size > 500) roomBanCache.delete(roomBanCache.keys().next().value);
}

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
  ");" +
  "CREATE TABLE IF NOT EXISTS project_bans (" +
  "target_username TEXT PRIMARY KEY, " +
  "user_id TEXT NOT NULL, " +
  "username TEXT NOT NULL, " +
  "reason TEXT NOT NULL, " +
  "created_at INTEGER NOT NULL" +
  ");" +
  "CREATE TABLE IF NOT EXISTS sad_sword_grants (" +
  "target_username TEXT PRIMARY KEY, " +
  "user_id TEXT NOT NULL, " +
  "username TEXT NOT NULL, " +
  "granted_at INTEGER NOT NULL" +
  ");";

function isProjectOwner(request) {
  const userId = request.headers.get("x-websim-user-id");
  const ownerId = request.headers.get("x-websim-project-owner-id");
  const role = request.headers.get("x-websim-user-role");
  return Boolean(userId && (userId === ownerId || role === "owner"));
}

function canManageProject(request) {
  const userId = request.headers.get("x-websim-user-id");
  const username = (request.headers.get("x-websim-username") || "").toLowerCase();
  const role = request.headers.get("x-websim-user-role");
  const ownerId = request.headers.get("x-websim-project-owner-id");
  const namedAdmin = ["heitorm2003", "kris_is_gaster", "shadowx", "krissss"].includes(username);
  return Boolean(userId && (userId === ownerId || role === "owner" || role === "admin" || namedAdmin));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === "GET" && url.pathname === "/api/sad-sword-status") {
      const username = (request.headers.get("x-websim-username") || "").toLowerCase();
      const grant = username ? await env.DB.prepare("SELECT 1 AS granted FROM sad_sword_grants WHERE target_username = ?").bind(username).first() : null;
      return Response.json({ granted: Boolean(grant), canGrant: isProjectOwner(request) });
    }

    if (request.method === "POST" && url.pathname === "/api/sad-sword-grant") {
      if (!isProjectOwner(request)) return Response.json({ error: "Only the project owner can give this item." }, { status: 403 });
      const userId = request.headers.get("x-websim-user-id");
      const ownerUsername = request.headers.get("x-websim-username");
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body." }, { status: 400 }); }
      const target = String(body?.username || "").trim().replace(/^@/, "").toLowerCase();
      if (!/^[a-z0-9_]{1,32}$/.test(target)) return Response.json({ error: "Enter a valid username." }, { status: 400 });
      await env.DB.prepare("INSERT INTO sad_sword_grants (target_username, user_id, username, granted_at) VALUES (?, ?, ?, ?) ON CONFLICT(target_username) DO UPDATE SET user_id = excluded.user_id, username = excluded.username, granted_at = excluded.granted_at")
        .bind(target, userId, ownerUsername, Date.now()).run();
      return Response.json({ ok: true, username: target });
    }

    if (request.method === "GET" && url.pathname === "/api/ban-status") {
      const username = (request.headers.get("x-websim-username") || "").toLowerCase();
      if (!username) return Response.json({ banned: false });
      const ban = await env.DB.prepare("SELECT reason FROM project_bans WHERE target_username = ?").bind(username).first();
      if (username) cacheRoomBanStatus(username, ban ? String(ban.reason || "No reason provided.") : false);
      return Response.json(ban ? { banned: true, reason: ban.reason } : { banned: false });
    }

    if (request.method === "GET" && url.pathname === "/api/bans") {
      if (!canManageProject(request)) return Response.json({ error: "Only project admins can view bans." }, { status: 403 });
      const { results } = await env.DB.prepare(
        "SELECT target_username, reason, created_at FROM project_bans ORDER BY created_at DESC, target_username ASC"
      ).all();
      return Response.json({ bans: results });
    }

    if (request.method === "POST" && url.pathname === "/api/bans") {
      if (!canManageProject(request)) return Response.json({ error: "Only project admins can issue bans." }, { status: 403 });
      const adminId = request.headers.get("x-websim-user-id");
      const adminUsername = request.headers.get("x-websim-username");
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body." }, { status: 400 }); }
      const target = String(body?.username || "").trim().replace(/^@/, "").toLowerCase();
      const reason = String(body?.reason || "").trim();
      if (!/^[a-z0-9_]{1,32}$/.test(target)) return Response.json({ error: "Enter a valid username." }, { status: 400 });
      if (!reason || reason.length > 280) return Response.json({ error: "A reason of 1–280 characters is required." }, { status: 400 });
      await env.DB.prepare("INSERT INTO project_bans (target_username, user_id, username, reason, created_at) VALUES (?, ?, ?, ?, ?) ON CONFLICT(target_username) DO UPDATE SET user_id = excluded.user_id, username = excluded.username, reason = excluded.reason, created_at = excluded.created_at")
        .bind(target, adminId, adminUsername, reason, Date.now()).run();
      cacheRoomBanStatus(target, reason);
      return Response.json({ ok: true, username: target });
    }

    if (request.method === "DELETE" && url.pathname === "/api/bans") {
      if (!canManageProject(request)) return Response.json({ error: "Only project admins can remove bans." }, { status: 403 });
      let body;
      try { body = await request.json(); } catch { return Response.json({ error: "Invalid JSON body." }, { status: 400 }); }
      const target = String(body?.username || "").trim().replace(/^@/, "").toLowerCase();
      if (!/^[a-z0-9_]{1,32}$/.test(target)) return Response.json({ error: "Enter a valid username." }, { status: 400 });
      await env.DB.prepare("DELETE FROM project_bans WHERE target_username = ?").bind(target).run();
      cacheRoomBanStatus(target, false);
      return Response.json({ ok: true, username: target });
    }

    if (request.method === "GET" && url.pathname === "/api/admin-leaderboard") {
      const { results } = await env.DB
        .prepare("SELECT username, points FROM leaderboard_scores WHERE lower(username) IN (?, ?, ?, ?) ORDER BY points DESC, username ASC LIMIT 10")
        .bind("heitorm2003", "kris_is_gaster", "shadowx", "krissss")
        .all();
      return Response.json({ scores: results });
    }

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
      const namedAdmin = ["heitorm2003", "kris_is_gaster", "shadowx", "krissss"].includes(normalizedUsername);
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
  async onConnect(conn, room, env) {
    const username = String(conn.username || "").toLowerCase();
    if (username) {
      let banReason = roomBanCache.get(username);
      if (banReason === undefined) {
        const ban = await env.DB.prepare("SELECT reason FROM project_bans WHERE target_username = ?").bind(username).first();
        banReason = ban ? String(ban.reason || "No reason provided.") : false;
        cacheRoomBanStatus(username, banReason);
      }
      if (banReason) {
        conn.close(4003, "Banned from this project: " + String(banReason));
        return;
      }
    }
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
    } else if (conn.role === "admin" || ["kris_is_gaster", "shadowx", "krissss"].includes(normalizedUsername)) {
      tags.push("admin");
    }
    if (["shadowx", "krissss"].includes(normalizedUsername)) tags.push("roaring");
    if (normalizedUsername === "kris_is_gaster") tags.push("goat");
    if (normalizedUsername === "duuxling") tags.push("bugle");
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
