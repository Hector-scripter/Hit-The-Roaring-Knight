const sandboxModeButton = document.querySelector(".sandbox-mode-button");
sandboxModeButton.addEventListener("click", () => {
  window.location.href = "https://websim.com/@Heitorm2003/hit-the-roaring-knight-2/5";
});

const playKrisButton = document.querySelector(".play-kris-button");
playKrisButton.addEventListener("click", event => {
  event.preventDefault();
  if (window.confirm("Are you sure you want to play hit kris?")) {
    window.location.href = playKrisButton.href;
  }
});

const knight = document.querySelector("#knight");
const streetlight = document.querySelector("#streetlight");
const tvSet = document.querySelector("#tv-set");
const tvImage = document.querySelector("#tv-image");
const secretRoom = document.querySelector("#secret-room");
const secretRoomExit = document.querySelector("#secret-room-exit");
const mysteryMan = document.querySelector("#mystery-man");
const mysteryManSprite = document.querySelector("#mystery-man-sprite");
const hits = document.querySelector("#hits");
const darkDollarsDisplay = document.querySelector("#dark-dollars");
const freezeStatus = document.querySelector("#freeze-status");
const shopToggle = document.querySelector("#shop-toggle");
const shop = document.querySelector("#shop");
const krisShopItem = document.querySelector("#kris-shop-item");
const sadSwordButton = document.querySelector("#sad-sword-toggle");
const sadSwordGift = document.querySelector("#sad-sword-gift");
const sadSwordGrantForm = document.querySelector("#sad-sword-grant-form");
const sadSwordRecipient = document.querySelector("#sad-sword-recipient");
const sadSwordGrantStatus = document.querySelector("#sad-sword-grant-status");
const leaderboardToggle = document.querySelector("#leaderboard-toggle");
const leaderboardPanel = document.querySelector("#leaderboard-panel");
const leaderboardList = document.querySelector("#leaderboard-list");
const leaderboardStatus = document.querySelector("#leaderboard-status");
const adminLeaderboardList = document.querySelector("#admin-leaderboard-list");
const adminLeaderboardStatus = document.querySelector("#admin-leaderboard-status");
const chatToggle = document.querySelector("#chat-toggle");
const chatPanel = document.querySelector("#chat-panel");
const chatStatus = document.querySelector("#chat-status");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSend = document.querySelector("#chat-send");
const achievementsToggle = document.querySelector("#achievements-toggle");
const achievementsPanel = document.querySelector("#achievements-panel");
const achievementList = document.querySelector("#achievement-list");
const backgroundsToggle = document.querySelector("#backgrounds-toggle");
const backgroundsPanel = document.querySelector("#backgrounds-panel");
const socialsToggle = document.querySelector("#socials-toggle");
const socialsPanel = document.querySelector("#socials-panel");
const creditsToggle = document.querySelector("#credits-toggle");
const creditsPanel = document.querySelector("#credits-panel");
const backgroundList = document.querySelector("#background-list");
const knightSprite = knight.querySelector("img");
const achievementScene = document.querySelector("#achievement-scene");
const sceneSwoon = document.querySelector("#scene-swoon");
const sceneAqua = document.querySelector("#scene-aqua");
const sceneAquaSprite = document.querySelector("#scene-aqua-sprite");
const sceneBlueSwoon = document.querySelector("#scene-blue-swoon");
const sceneFlowery = document.querySelector("#scene-flowery");
const sceneFloweryDeath = document.querySelector("#scene-flowery-death");
const sceneKaizoDeath = document.querySelector("#scene-kaizo-death");
const sceneRoaring = document.querySelector("#scene-roaring");
const darkFountain = document.querySelector("#dark-fountain");
const sceneJaronaRipped = document.querySelector("#scene-jarona-ripped");
const kaizoCompanion = document.querySelector("#kaizo-companion");
const adminToggle = document.querySelector("#admin-toggle");
const adminPanel = document.querySelector("#admin-panel");
const victoryScreen = document.querySelector("#victory-screen");
const victoryClose = document.querySelector("#victory-close");
const introScreen = document.querySelector("#intro-screen");
const introDialogue = document.querySelector("#intro-dialogue");
const introNext = document.querySelector("#intro-next");
const vesselOpen = document.querySelector("#vessel-open");
const vesselScreen = document.querySelector("#vessel-screen");
const vesselTitle = document.querySelector("#vessel-title");
const vesselChoices = document.querySelector("#vessel-choices");
const vesselName = document.querySelector("#vessel-name");
const vesselCreate = document.querySelector("#vessel-create");
const vesselPreview = {
  head: document.querySelector("#vessel-preview-head"),
  body: document.querySelector("#vessel-preview-body"),
  legs: document.querySelector("#vessel-preview-legs"),
};
const vesselStorageKey = "roaring-knight-vessel";
const vesselCounts = { head: 7, body: 6, legs: 2 };
let vesselData;
try { vesselData = JSON.parse(localStorage.getItem(vesselStorageKey) || "null"); } catch { vesselData = null; }
if (!vesselData || typeof vesselData !== "object") vesselData = { head: 1, body: 1, legs: 1, name: "" };
for (const part of Object.keys(vesselCounts)) {
  const value = Number.parseInt(vesselData[part], 10);
  vesselData[part] = Number.isInteger(value) && value >= 1 && value <= vesselCounts[part] ? value : 1;
}
vesselData.name = typeof vesselData.name === "string" ? vesselData.name.slice(0, 24) : "";
let vesselSaved = Boolean(vesselData.name.trim());
const grantForm = document.querySelector("#grant-form");
const grantAmount = document.querySelector("#grant-amount");
const setHitsForm = document.querySelector("#set-hits-form");
const setHitsAmount = document.querySelector("#set-hits-amount");
const unlockUpgradesButton = document.querySelector("#unlock-upgrades");
const unlockBackgroundsButton = document.querySelector("#unlock-backgrounds");
const adminCurrentHits = document.querySelector("#admin-current-hits");
const adminBackgroundCount = document.querySelector("#admin-background-count");
const adminUpgradeCount = document.querySelector("#admin-upgrade-count");
const adminStatus = document.querySelector("#admin-status");
const announcementFeed = document.querySelector("#announcement-feed");
const announcementList = document.querySelector("#announcement-list");
const announcementForm = document.querySelector("#announcement-form");
const announcementInput = document.querySelector("#announcement-input");
const announcementSubmit = document.querySelector("#announcement-submit");
const announcementStatus = document.querySelector("#announcement-status");
const banScreen = document.querySelector("#ban-screen");
const banReason = document.querySelector("#ban-reason");
const banForm = document.querySelector("#ban-form");
const banUsername = document.querySelector("#ban-username");
const banReasonInput = document.querySelector("#ban-reason-input");
const banFormStatus = document.querySelector("#ban-form-status");
const banList = document.querySelector("#ban-list");
const banListStatus = document.querySelector("#ban-list-status");
const banListRefresh = document.querySelector("#ban-list-refresh");
const storageKey = "roaring-knight-hits";
const darkDollarStorageKey = "roaring-knight-dark-dollars";
const backgroundKey = "roaring-knight-background";
const backgroundProgressKey = "roaring-knight-background-progress";
const unlockKey = "roaring-knight-shop-unlocked";
const upgradesKey = "roaring-knight-upgrades";
const kaizoEquippedKey = "roaring-knight-kaizo-equipped";
const blowtorchEquippedKey = "roaring-knight-blowtorch-equipped";
const krisItemEquippedKey = "roaring-knight-kris-item-equipped";
const sadSwordEquippedKey = "roaring-knight-sad-sword-equipped";
const victoryDismissedKey = "roaring-knight-victory-dismissed";
const swoonAchievementKey = "roaring-knight-achievement-are-we-serious";
const jaronaAchievementKey = "roaring-knight-achievement-jarona";
const jaronaClicksKey = "roaring-knight-streetlight-clicks";
const roaringAchievementKey = "roaring-knight-achievement-roaring";
const roaringClicksKey = "roaring-knight-roaring-clicks";
const knightClicksKey = "roaring-knight-total-clicks";
const snowgraveAchievementKey = "roaring-knight-achievement-snowgrave";
const snowgraveClicksKey = "roaring-knight-snowgrave-clicks";
const snowgraveFreezeEndKey = "roaring-knight-snowgrave-freeze-end";
const tvAchievementKey = "roaring-knight-achievement-tv-timeee";
const tvClicksKey = "roaring-knight-secret-room-tv-clicks";
const secretRoomUnlockedKey = "roaring-knight-secret-room-unlocked";
const swoonAchievementAt = 1267;
const shopUnlockAt = 100;
const gameWinAt = 1225;
const backgrounds = [
  { id: "void", name: "The Void", at: 0 },
  { id: "fountain", name: "Dark Fountain", at: 100 },
  { id: "twilight", name: "Twilight", at: 500 },
  { id: "roaring", name: "The Roaring", at: 1225 },
  { id: "cold", name: "Cold Place", at: 0 },
  { id: "tvworld", name: "TV World", at: 0 },
  { id: "library", name: "Library", at: 0 },
];
let selectedBackground = localStorage.getItem(backgroundKey) || "void";
let bestHits = Number.parseInt(localStorage.getItem(backgroundProgressKey) ?? "0", 10);
if (!Number.isSafeInteger(bestHits) || bestHits < 0) bestHits = 0;
let victoryShown = false;
let lastSubmittedScore = -1;
let scoreSaveInFlight = false;
let scoreSaveTimer = null;
let victoryDismissed = localStorage.getItem(victoryDismissedKey) === "true";
let swoonAchievementEarned = localStorage.getItem(swoonAchievementKey) === "true";
let jaronaAchievementEarned = localStorage.getItem(jaronaAchievementKey) === "true";
let roaringAchievementEarned = localStorage.getItem(roaringAchievementKey) === "true";
let snowgraveAchievementEarned = localStorage.getItem(snowgraveAchievementKey) === "true";
let tvAchievementEarned = localStorage.getItem(tvAchievementKey) === "true";
let tvClicks = Number.parseInt(localStorage.getItem(tvClicksKey) ?? "0", 10);
if (!Number.isSafeInteger(tvClicks) || tvClicks < 0) tvClicks = 0;
let secretRoomUnlocked = localStorage.getItem(secretRoomUnlockedKey) === "true" || tvClicks >= 30;
let mysteryManClicked = false;
let goatAchievementVisible = false;
let krisItemEligible = false;
let krisItemEquipped = false;
let sadSwordGranted = false;
let sadSwordEquipped = localStorage.getItem(sadSwordEquippedKey) === "true";
if (tvAchievementEarned) tvImage.hidden = false;
let snowgraveClicks = Number.parseInt(localStorage.getItem(snowgraveClicksKey) ?? "0", 10);
if (!Number.isSafeInteger(snowgraveClicks) || snowgraveClicks < 0) snowgraveClicks = 0;
let snowgraveFreezeEnd = Number.parseInt(localStorage.getItem(snowgraveFreezeEndKey) ?? "0", 10);
if (!Number.isSafeInteger(snowgraveFreezeEnd) || snowgraveFreezeEnd < 0) snowgraveFreezeEnd = 0;
let snowgraveTimer = null;
let knightClicks = Number.parseInt(localStorage.getItem(knightClicksKey) ?? "0", 10);
if (!Number.isSafeInteger(knightClicks) || knightClicks < 0) knightClicks = 0;
let roaringClicks = Number.parseInt(localStorage.getItem(roaringClicksKey) ?? "0", 10);
if (!Number.isFinite(roaringClicks) || roaringClicks < 0) roaringClicks = 0;
let jaronaLeftClicks = Number.parseInt(localStorage.getItem(jaronaClicksKey) ?? "0", 10);
if (!Number.isFinite(jaronaLeftClicks) || jaronaLeftClicks < 0 || (jaronaAchievementEarned && jaronaLeftClicks >= 10)) jaronaLeftClicks = 0;
let achievementSequenceStarted = false;
let cutscenePlaying = false;
const items = {
  honed: { cost: 50, darkCost: 5, bonus: 1 },
  strike: { cost: 200, darkCost: 20, bonus: 5 },
  kaizo: { cost: 5000, darkCost: 500, bonus: 0 },
  blowtorch: { cost: 2500, darkCost: 250, bonus: 0 },
  sadSword: { cost: Infinity, bonus: 900 },
};

let count = Number.parseInt(localStorage.getItem(storageKey) ?? "0", 10);
if (!Number.isFinite(count) || count < 0) count = 0;
let darkDollars = Number.parseInt(localStorage.getItem(darkDollarStorageKey) ?? "0", 10);
if (!Number.isSafeInteger(darkDollars) || darkDollars < 0) darkDollars = 0;
let infiniteDarkDollars = false;
let unlocked = localStorage.getItem(unlockKey) === "true" || count >= shopUnlockAt;
let upgrades;
try {
  upgrades = JSON.parse(localStorage.getItem(upgradesKey) ?? "{}");
} catch {
  upgrades = {};
}
if (!upgrades || typeof upgrades !== "object") upgrades = {};
let kaizoEquipped = localStorage.getItem(kaizoEquippedKey) === "true" && Boolean(upgrades.kaizo);
let blowtorchEquipped = localStorage.getItem(blowtorchEquippedKey) === "true" && Boolean(upgrades.blowtorch);
let blowtorchHeld = false;
let blowtorchLastTick = 0;
let blowtorchTimer = null;
krisItemEquipped = localStorage.getItem(krisItemEquippedKey) === "true" && Boolean(upgrades.kris);
function save() {
  localStorage.setItem(storageKey, String(count));
  localStorage.setItem(darkDollarStorageKey, String(darkDollars));
  localStorage.setItem(unlockKey, String(unlocked));
  localStorage.setItem(upgradesKey, JSON.stringify(upgrades));
  localStorage.setItem(kaizoEquippedKey, String(kaizoEquipped));
  localStorage.setItem(blowtorchEquippedKey, String(blowtorchEquipped));
  localStorage.setItem(krisItemEquippedKey, String(krisItemEquipped));
  localStorage.setItem(sadSwordEquippedKey, String(sadSwordEquipped));
  localStorage.setItem(swoonAchievementKey, String(swoonAchievementEarned));
  localStorage.setItem(jaronaAchievementKey, String(jaronaAchievementEarned));
  localStorage.setItem(jaronaClicksKey, String(jaronaLeftClicks));
  localStorage.setItem(roaringAchievementKey, String(roaringAchievementEarned));
  localStorage.setItem(roaringClicksKey, String(roaringClicks));
  localStorage.setItem(knightClicksKey, String(knightClicks));
  localStorage.setItem(snowgraveAchievementKey, String(snowgraveAchievementEarned));
  localStorage.setItem(tvAchievementKey, String(tvAchievementEarned));
  localStorage.setItem(snowgraveClicksKey, String(snowgraveClicks));
  if (snowgraveFreezeEnd > 0) localStorage.setItem(snowgraveFreezeEndKey, String(snowgraveFreezeEnd));
}

let chatRoom = null;
let chatStarted = false;
let chatConnected = false;
const badgeLabels = { owner: "OWNER", admin: "ADMIN", roaring: "the roaring knight if they locked in victor", goat: "THE GOAT", guest: "GUEST", bugle: "bugle from tbb", artist: "ARTIST" };

function getUserTagTypes(username, serverTags) {
  const allowed = Object.keys(badgeLabels);
  const trusted = Array.isArray(serverTags) ? serverTags.filter(tag => allowed.includes(tag)) : [];
  const normalized = String(username || "").toLowerCase();
  const defaults = normalized === "heitorm2003" ? ["owner"]
    : normalized === "kris_is_gaster" ? ["admin", "goat"]
    : normalized === "shadowx" || normalized === "krissss" ? ["admin", "roaring"]
    : normalized === "duuxling" ? ["bugle"]
    : normalized === "jakeyy" ? ["artist"] : [];
  return [...new Set([...trusted, ...defaults])];
}

function appendUserTags(container, types) {
  types.forEach(type => {
    if (!badgeLabels[type]) return;
    const badge = document.createElement("span");
    badge.className = "role-badge role-badge-" + type;
    badge.textContent = badgeLabels[type];
    container.append(badge);
  });
}

async function loadAnnouncements() {
  try {
    const response = await fetch("/api/announcements");
    if (!response.ok) throw new Error("Could not load announcements");
    const data = await response.json();
    const announcements = Array.isArray(data.announcements) ? data.announcements : [];
    announcementList.replaceChildren();
    announcements.forEach(entry => {
      const item = document.createElement("li");
      item.className = "announcement-item";
      const header = document.createElement("div");
      header.className = "announcement-byline";
      const username = String(entry.username || "admin");
      const avatar = document.createElement("img");
      avatar.className = "announcement-avatar";
      avatar.src = "https://images.websim.com/avatar/" + encodeURIComponent(username);
      avatar.alt = "";
      avatar.loading = "lazy";
      const author = document.createElement("a");
      author.className = "announcement-author";
      author.href = "https://websim.com/@" + encodeURIComponent(username);
      author.target = "_blank";
      author.rel = "noopener noreferrer";
      author.textContent = "@" + username;
      header.append(avatar, author);
      appendUserTags(header, getUserTagTypes(username));
      const timestamp = Number(entry.created_at);
      if (Number.isFinite(timestamp) && timestamp > 0) {
        const time = document.createElement("time");
        time.className = "announcement-time";
        time.dateTime = new Date(timestamp).toISOString();
        time.textContent = new Date(timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" });
        header.append(time);
      }
      const message = document.createElement("p");
      message.className = "announcement-text";
      message.textContent = String(entry.text || "").slice(0, 280);
      item.append(header, message);
      announcementList.append(item);
    });
    announcementFeed.hidden = announcements.length === 0;
  } catch (error) {
    console.warn("Announcements unavailable.", error);
  }
}

function appendChatMessage(message) {
  if (message.type !== "chat-message") return;
  const item = document.createElement("li");
  item.className = "chat-message";
  const username = String(message.username || "guest").slice(0, 32);
  const avatar = document.createElement("img");
  avatar.className = "chat-avatar";
  avatar.src = "https://images.websim.com/avatar/" + encodeURIComponent(username);
  avatar.alt = "";
  avatar.loading = "lazy";
  const body = document.createElement("div");
  body.className = "chat-message-body";
  const byline = document.createElement("div");
  byline.className = "chat-byline";
  const author = message.isUser ? document.createElement("a") : document.createElement("span");
  author.className = "chat-author";
  author.textContent = "@" + username;
  if (message.isUser) {
    author.href = "https://websim.com/@" + encodeURIComponent(username);
    author.target = "_blank";
    author.rel = "noopener noreferrer";
  }
  byline.append(author);
  appendUserTags(byline, getUserTagTypes(username, message.tags));
  const text = document.createElement("p");
  text.className = "chat-text";
  text.textContent = String(message.text || "").slice(0, 200);
  body.append(byline, text);
  item.append(avatar, body);
  chatMessages.append(item);
  while (chatMessages.children.length > 50) chatMessages.firstElementChild.remove();
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function connectGlobalChat() {
  if (chatStarted) return;
  chatStarted = true;
  chatStatus.textContent = "Connecting…";
  try {
    const socketApi = window.WebsimSocket;
    if (!socketApi?.joinRoom) throw new Error("Realtime chat is unavailable.");
    const socket = await socketApi.joinRoom();
    chatRoom = socket;
    chatConnected = true;
    chatInput.disabled = false;
    chatSend.disabled = false;
    chatStatus.textContent = "Connected";
    socket.onmessage = event => {
      let message;
      try { message = JSON.parse(event.data); } catch { return; }
      if (message.type === "chat-history") {
        chatMessages.replaceChildren();
        (Array.isArray(message.messages) ? message.messages : []).forEach(appendChatMessage);
      } else if (message.type === "chat-message") {
        appendChatMessage(message);
      } else if (message.type === "chat-warning") {
        chatStatus.textContent = message.text || "Please slow down.";
      }
    };
    socket.onreconnect = () => {
      chatConnected = true;
      chatInput.disabled = false;
      chatSend.disabled = false;
      chatStatus.textContent = "Reconnected";
    };
    socket.onclose = event => {
      chatConnected = false;
      chatStarted = false;
      chatInput.disabled = true;
      chatSend.disabled = true;
      chatStatus.textContent = event.reason || "Disconnected";
    };
  } catch (error) {
    chatConnected = false;
    chatStarted = false;
    chatInput.disabled = true;
    chatSend.disabled = true;
    chatStatus.textContent = error?.message || "Chat unavailable";
  }
}

function renderLeaderboardRows(scores, list) {
  list.replaceChildren();
  scores.forEach((entry, index) => {
    const username = String(entry.username || "player");
    const row = document.createElement("li");
    row.className = "leader-row";
    const rank = document.createElement("span");
    rank.className = "leader-rank";
    rank.textContent = String(index + 1);
    const profile = document.createElement("a");
    profile.className = "leader-user";
    profile.href = "https://websim.com/@" + encodeURIComponent(username);
    profile.target = "_blank";
    profile.rel = "noopener noreferrer";
    const avatar = document.createElement("img");
    avatar.src = "https://images.websim.com/avatar/" + encodeURIComponent(username);
    avatar.alt = "";
    avatar.loading = "lazy";
    const name = document.createElement("span");
    name.className = "leader-username";
    name.textContent = "@" + username;
    profile.append(avatar, name);
    appendUserTags(profile, getUserTagTypes(username));
    const points = document.createElement("span");
    points.className = "leader-score";
    points.textContent = Number(entry.points || 0).toLocaleString() + " hits";
    row.append(rank, profile, points);
    list.append(row);
  });
}

async function loadLeaderboard() {
  leaderboardStatus.textContent = "Loading…";
  adminLeaderboardStatus.textContent = "Loading…";
  try {
    const [allResponse, adminsResponse] = await Promise.all([
      fetch("/api/leaderboard"),
      fetch("/api/admin-leaderboard"),
    ]);
    if (!allResponse.ok || !adminsResponse.ok) throw new Error("Leaderboard request failed");
    const [allData, adminsData] = await Promise.all([allResponse.json(), adminsResponse.json()]);
    const scores = Array.isArray(allData.scores) ? allData.scores : [];
    const adminScores = Array.isArray(adminsData.scores) ? adminsData.scores : [];
    renderLeaderboardRows(scores, leaderboardList);
    renderLeaderboardRows(adminScores, adminLeaderboardList);
    leaderboardStatus.textContent = scores.length ? "" : "No scores yet.";
    adminLeaderboardStatus.textContent = adminScores.length ? "" : "No admin scores yet.";
  } catch {
    leaderboardStatus.textContent = "Leaderboard unavailable right now.";
    adminLeaderboardStatus.textContent = "Admin leaderboard unavailable right now.";
  }
}

function queueScoreSave() {
  if (count === lastSubmittedScore) return;
  clearTimeout(scoreSaveTimer);
  scoreSaveTimer = setTimeout(async () => {
    if (scoreSaveInFlight) return;
    const score = count;
    if (score === lastSubmittedScore) return;
    scoreSaveInFlight = true;
    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ points: score }),
      });
      if (response.status === 401) {
        lastSubmittedScore = score;
        leaderboardStatus.textContent = "Sign in to save your score.";
        return;
      }
      if (!response.ok) throw new Error("Score save failed");
      lastSubmittedScore = score;
      await loadLeaderboard();
    } catch {
      leaderboardStatus.textContent = "Could not save your score.";
    } finally {
      scoreSaveInFlight = false;
      if (count !== lastSubmittedScore) queueScoreSave();
    }
  }, 1500);
}

function renderBackgrounds() {
  bestHits = Math.max(bestHits, count);
  localStorage.setItem(backgroundProgressKey, String(bestHits));
  if (!backgrounds.some(background => background.id === selectedBackground && bestHits >= background.at)) {
    selectedBackground = "void";
  }
  document.body.classList.remove("theme-fountain", "theme-twilight", "theme-roaring", "theme-cold", "theme-tvworld", "theme-library");
  if (selectedBackground !== "void") document.body.classList.add("theme-" + selectedBackground);
  localStorage.setItem(backgroundKey, selectedBackground);

  backgroundList.replaceChildren();
  backgrounds.forEach(background => {
    const unlocked = bestHits >= background.at;
    const option = document.createElement("button");
    option.type = "button";
    option.className = "background-option";
    option.disabled = !unlocked;
    option.setAttribute("aria-pressed", String(selectedBackground === background.id));
    const name = document.createElement("span");
    name.textContent = background.name;
    const requirement = document.createElement("span");
    requirement.className = "background-req";
    requirement.textContent = selectedBackground === background.id ? "Selected" : unlocked ? "Use" : background.at.toLocaleString() + " hits";
    option.append(name, requirement);
    option.addEventListener("click", () => {
      if (bestHits < background.at) return;
      selectedBackground = background.id;
      renderBackgrounds();
    });
    backgroundList.append(option);
  });
}

function renderAchievement() {
  achievementList.replaceChildren();
  addAchievementCard("Assets/Sprites/Swoon.jpg", "are we serious?", swoonAchievementEarned, "Reach 1,267 hits and awaken something unexpected.");
  addAchievementCard("Assets/Sprites/Flowery.webp", "jarona", jaronaAchievementEarned, "Click the streetlight 10 times.");
  addAchievementCard("Assets/Sprites/Achivements/The_Roaring.webp", "roaring", roaringAchievementEarned, "Click Kaizo Knight 20 times to begin the Roaring.");
  addAchievementCard("Assets/Backgrounds/dark-fountain.jpg", "A Little Momentum", bestHits >= 100, "Reach 100 hits.");
  addAchievementCard("Assets/Backgrounds/the-roaring.jpg", "THEN THE WORLD WAS COVERED IN DARKNESS", bestHits >= 100000, "Reach 100,000 hits.");
  addAchievementCard("Roaring_Knight_Idle.webp", "Stubborn Persistence", knightClicks >= 100, "Click the Roaring Knight 100 times.");
  addAchievementCard("static-assets-upload14633654429706285761.webp", "Fully Armed", Boolean(upgrades.honed && upgrades.strike && upgrades.kaizo), "Own Honed Blade, Roaring Strike, and Kaizo Knight.");
  addAchievementCard("static-assets-upload14633654429706285761.webp", "Snowgrave..?", snowgraveAchievementEarned, "After unlocking Roaring, click Kaizo Knight 20 times and survive the freeze.");
  addAchievementCard("Tenna_battle.gif", "TV TIMEEE", tvAchievementEarned, "Click the TV set.");
  if (goatAchievementVisible) addGoatAchievementCard();
}

function addAchievementCard(imageSource, achievementName, unlocked = true, description = "") {
  const card = document.createElement("article");
  card.className = "achievement-card" + (unlocked ? "" : " is-locked");
  const icon = document.createElement("img");
  icon.src = imageSource;
  icon.alt = "";
  const copy = document.createElement("div");
  copy.className = "achievement-copy";
  const title = document.createElement("h3");
  title.textContent = achievementName;
  const detail = document.createElement("p");
  detail.className = "achievement-description";
  detail.textContent = description;
  copy.append(title, detail);
  card.append(icon, copy);
  if (!unlocked) {
    const status = document.createElement("span");
    status.className = "achievement-status";
    status.textContent = "Locked";
    card.append(status);
  }
  achievementList.append(card);
}

function addGoatAchievementCard() {
  const card = document.createElement("article");
  card.className = "achievement-card goat-achievement";
  const icon = document.createElement("img");
  icon.src = "Roaring_Knight_Idle.webp";
  icon.alt = "";
  const copy = document.createElement("div");
  copy.className = "goat-achievement-copy";
  const title = document.createElement("h3");
  title.textContent = "Youre The GOAT";
  const description = document.createElement("p");
  description.textContent = "youre The GOAT And i really like your game (thats why i even made this game in The First place) so i am giving you This achivement, also i think you already known that you Have admin sooooooo i am not even gonna list that in This achivement's description";
  copy.append(title, description);
  card.append(icon, copy);
  achievementList.append(card);
}

async function checkGoatAchievementAccess() {
  try {
    const user = await window.websim?.getUser();
    const username = String(user?.username || "").toLowerCase();
    goatAchievementVisible = username === "kris_is_gaster" || username === "heitorm2003";
    krisItemEligible = username === "kris_is_gaster" || username === "heitorm20003" || username === "heitorm2003";
    infiniteDarkDollars = username === "heitorm2003";
    render();
  } catch (error) {
    console.warn("Could not verify exclusive achievement access.", error);
  }
}

function stopBlowtorch() {
  blowtorchHeld = false;
  if (blowtorchTimer) {
    clearInterval(blowtorchTimer);
    blowtorchTimer = null;
  }
  knight.classList.remove("is-torching");
}

function startBlowtorch() {
  if (!blowtorchEquipped || snowgraveAchievementEarned || snowgraveFreezeEnd <= Date.now() || blowtorchHeld) return;
  blowtorchHeld = true;
  blowtorchLastTick = Date.now();
  knight.classList.add("is-torching");
  blowtorchTimer = setInterval(() => {
    if (!blowtorchHeld || !blowtorchEquipped || snowgraveFreezeEnd <= Date.now()) {
      stopBlowtorch();
      refreshSnowgraveState();
      return;
    }
    const now = Date.now();
    snowgraveFreezeEnd -= (now - blowtorchLastTick) * 4;
    blowtorchLastTick = now;
    save();
    refreshSnowgraveState();
  }, 250);
}

function refreshSnowgraveState() {
  const remaining = snowgraveFreezeEnd - Date.now();
  const frozen = snowgraveFreezeEnd > 0 && remaining > 0 && !snowgraveAchievementEarned;
  if (!frozen && blowtorchHeld) stopBlowtorch();
  knight.disabled = frozen && !blowtorchEquipped;
  knight.classList.toggle("is-frozen", frozen);
  knight.classList.toggle("is-torching", frozen && blowtorchHeld);

  if (frozen) {
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    const timerText = minutes + ":" + String(seconds).padStart(2, "0");
    freezeStatus.textContent = blowtorchHeld ? "Blowtorch heating · " + timerText : blowtorchEquipped ? "Hold the knight to thaw · " + timerText : "Frozen solid · " + timerText;
    freezeStatus.hidden = false;
    if (!snowgraveTimer) snowgraveTimer = setInterval(refreshSnowgraveState, 1000);
    return;
  }

  if (snowgraveTimer) {
    clearInterval(snowgraveTimer);
    snowgraveTimer = null;
  }
  if (snowgraveFreezeEnd > 0 && remaining <= 0 && !snowgraveAchievementEarned) {
    snowgraveFreezeEnd = 0;
    snowgraveAchievementEarned = true;
    localStorage.removeItem(snowgraveFreezeEndKey);
    freezeStatus.textContent = "Snowgrave..? unlocked";
    freezeStatus.hidden = false;
    save();
    renderAchievement();
    setTimeout(() => { freezeStatus.hidden = true; }, 5000);
  } else if (snowgraveAchievementEarned) {
    freezeStatus.hidden = true;
  }
}

function startSnowgraveFreeze() {
  snowgraveClicks = 0;
  snowgraveFreezeEnd = Date.now() + 10 * 60 * 1000;
  localStorage.setItem(snowgraveFreezeEndKey, String(snowgraveFreezeEnd));
  save();
  refreshSnowgraveState();
}

function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function playSwoonAchievement() {
  if (achievementSequenceStarted || swoonAchievementEarned) return;
  achievementSequenceStarted = true;
  cutscenePlaying = true;
  knightSprite.src = "Assets/Sprites/AreWeForReal.webp";
  victoryScreen.hidden = true;
  victoryDismissed = true;
  localStorage.setItem(victoryDismissedKey, "true");
  achievementScene.hidden = false;
  sceneSwoon.hidden = false;
  await wait(1300);
  sceneSwoon.hidden = true;
  sceneAqua.hidden = false;
  await wait(1900);
  sceneAquaSprite.src = "Assets/Sprites/AquaSwoon.webp";
  await wait(1000);
  sceneAqua.hidden = true;
  sceneBlueSwoon.hidden = false;
  await wait(1500);
  achievementScene.hidden = true;
  knightSprite.src = "Roaring_Knight_Idle.webp";
  swoonAchievementEarned = true;
  cutscenePlaying = false;
  save();
  renderAchievement();
  playNextPendingAchievement();
}

async function playJaronaAchievement() {
  if (jaronaAchievementEarned || cutscenePlaying) return;
  cutscenePlaying = true;
  achievementScene.hidden = false;
  sceneFlowery.hidden = false;
  await wait(1500);
  sceneFlowery.hidden = true;
  sceneFloweryDeath.hidden = false;
  await wait(1800);
  achievementScene.hidden = true;
  jaronaAchievementEarned = true;
  jaronaLeftClicks = 0;
  cutscenePlaying = false;
  save();
  renderAchievement();
  playNextPendingAchievement();
}

async function playJaronaRetry() {
  if (!jaronaAchievementEarned || cutscenePlaying) return;
  cutscenePlaying = true;
  achievementScene.hidden = false;
  sceneJaronaRipped.hidden = false;
  await wait(2400);
  sceneJaronaRipped.hidden = true;
  achievementScene.hidden = true;
  cutscenePlaying = false;
}

async function playRoaringAchievement() {
  if (roaringAchievementEarned || cutscenePlaying) return;
  cutscenePlaying = true;
  achievementScene.hidden = false;
  sceneKaizoDeath.hidden = false;
  await wait(1500);
  sceneKaizoDeath.hidden = true;
  sceneRoaring.hidden = false;
  for (let frame = 1; frame <= 6; frame++) {
    darkFountain.src = "Assets/Sprites/DarkFountainFrames/frame-0" + frame + ".png";
    await wait(180);
  }
  await wait(1800);
  achievementScene.hidden = true;
  roaringAchievementEarned = true;
  cutscenePlaying = false;
  save();
  renderAchievement();
  playNextPendingAchievement();
}

function playNextPendingAchievement() {
  if (cutscenePlaying) return;
  if (count >= swoonAchievementAt && !swoonAchievementEarned) return playSwoonAchievement();
  if (jaronaLeftClicks >= 10 && !jaronaAchievementEarned) return playJaronaAchievement();
  if (roaringClicks >= 20 && !roaringAchievementEarned) playRoaringAchievement();
}

function render() {
  hits.textContent = count.toLocaleString();
  darkDollarsDisplay.textContent = infiniteDarkDollars ? "∞" : darkDollars.toLocaleString();
  if (count >= shopUnlockAt) unlocked = true;
  shopToggle.hidden = !unlocked;
  kaizoCompanion.hidden = !kaizoEquipped;
  krisShopItem.hidden = !krisItemEligible;
  sadSwordGift.hidden = !sadSwordGranted;
  sadSwordButton.textContent = sadSwordEquipped ? "Unequip" : "Equip";
  if (!unlocked) {
    shop.hidden = true;
    shopToggle.setAttribute("aria-expanded", "false");
  }
  document.querySelectorAll(".buy-button[data-item]").forEach(button => {
    const id = button.dataset.item;
    const item = items[id];
    const owned = Boolean(upgrades[id]);
    if (id === "kris") {
      button.disabled = !krisItemEligible;
      button.textContent = owned ? (krisItemEquipped ? "Unequip" : "Equip") : "Claim";
    } else if (id === "kaizo" && owned) {
      button.disabled = false;
      button.textContent = kaizoEquipped ? "Unequip" : "Equip";
    } else if (id === "blowtorch" && owned) {
      button.disabled = false;
      button.textContent = blowtorchEquipped ? "Unequip" : "Equip";
    } else {
      button.disabled = owned || (count < item.cost && !infiniteDarkDollars && darkDollars < item.darkCost);
      button.textContent = owned ? "Owned" : "Buy · " + item.cost + " hits / " + item.darkCost + " DD";
    }
  });
  save();
  renderBackgrounds();
  adminCurrentHits.textContent = count.toLocaleString();
  const unlockedBackgroundCount = backgrounds.filter(background => bestHits >= background.at).length;
  adminBackgroundCount.textContent = unlockedBackgroundCount + " / " + backgrounds.length;
  const ownedUpgrades = ["honed", "strike", "kaizo", "blowtorch"].filter(id => upgrades[id]).length;
  adminUpgradeCount.textContent = ownedUpgrades + " / 4";
  refreshSnowgraveState();
  renderAchievement();
  if (count >= gameWinAt && !victoryShown && !victoryDismissed) {
    victoryShown = true;
    victoryScreen.hidden = false;
  }
  if (count >= swoonAchievementAt) playSwoonAchievement();
  queueScoreSave();
}

render();
checkBanStatus();
loadSadSwordStatus();
checkGoatAchievementAccess();
loadLeaderboard();
loadAnnouncements();
setInterval(loadAnnouncements, 300000);

streetlight.addEventListener("click", () => {
  if (cutscenePlaying) return;
  jaronaLeftClicks += 1;
  if (jaronaAchievementEarned && jaronaLeftClicks >= 10) {
    jaronaLeftClicks = 0;
    localStorage.setItem(jaronaClicksKey, "0");
    playJaronaRetry();
  } else {
    localStorage.setItem(jaronaClicksKey, String(jaronaLeftClicks));
    if (!jaronaAchievementEarned && jaronaLeftClicks >= 10) playJaronaAchievement();
  }
});

kaizoCompanion.addEventListener("click", () => {
  if (cutscenePlaying || snowgraveAchievementEarned || snowgraveFreezeEnd > Date.now()) return;
  if (!roaringAchievementEarned) {
    roaringClicks += 1;
    localStorage.setItem(roaringClicksKey, String(roaringClicks));
    if (roaringClicks >= 20) playRoaringAchievement();
    return;
  }
  snowgraveClicks += 1;
  save();
  if (snowgraveClicks >= 20) startSnowgraveFreeze();
});

playNextPendingAchievement();

victoryClose.addEventListener("click", () => {
  victoryDismissed = true;
  victoryScreen.hidden = true;
  localStorage.setItem(victoryDismissedKey, "true");
});

const introLines = [
  "umm hello!",
  "Welcome to hit The Roaring Knight!",
  "This game is in Early alpha tho...",
  "Have Fun!",
];
let introLineIndex = 0;
function renderVessel() {
  for (const part of Object.keys(vesselCounts)) {
    vesselPreview[part].src = "Assets/Sprites/Vessel/" + part + "-" + vesselData[part] + ".png";
  }
  vesselChoices.replaceChildren();
  for (const [part, total] of Object.entries(vesselCounts)) {
    const row = document.createElement("div");
    row.className = "vessel-choice-row";
    const label = document.createElement("span");
    label.className = "vessel-choice-label";
    label.textContent = part;
    const options = document.createElement("div");
    options.className = "vessel-option-list vessel-" + part + "-options";
    for (let n = 1; n <= total; n += 1) {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "vessel-option";
      option.setAttribute("aria-label", part + " " + n);
      option.setAttribute("aria-pressed", String(vesselData[part] === n));
      const image = document.createElement("img");
      image.src = "Assets/Sprites/Vessel/" + part + "-" + n + ".png";
      image.alt = "";
      option.append(image);
      option.addEventListener("click", () => {
        vesselData[part] = n;
        renderVessel();
        vesselChoices.querySelector('[aria-label="' + part + ' ' + n + '"]').focus();
      });
      options.append(option);
    }
    row.append(label, options);
    vesselChoices.append(row);
  }
}
function openVesselEditor() {
  vesselTitle.textContent = vesselSaved ? "Your vessel" : "Create your vessel";
  vesselCreate.textContent = vesselSaved ? "Done" : "Create vessel";
  vesselName.value = vesselData.name;
  renderVessel();
  vesselScreen.hidden = false;
  vesselName.focus();
}
vesselOpen.addEventListener("click", openVesselEditor);
vesselCreate.addEventListener("click", () => {
  const name = vesselName.value.trim();
  if (!name) {
    vesselName.setCustomValidity("Give your vessel a name.");
    vesselName.reportValidity();
    vesselName.addEventListener("input", () => vesselName.setCustomValidity(""), { once: true });
    return;
  }
  vesselData.name = name;
  vesselSaved = true;
  localStorage.setItem(vesselStorageKey, JSON.stringify(vesselData));
  vesselScreen.hidden = true;
});
introNext.addEventListener("click", () => {
  introLineIndex += 1;
  if (introLineIndex >= introLines.length) {
    introScreen.hidden = true;
    if (!vesselSaved) openVesselEditor();
    return;
  }
  introDialogue.textContent = introLines[introLineIndex];
  introNext.textContent = introLineIndex === introLines.length - 1 ? "Start" : "Next";
});

async function loadSadSwordStatus() {
  try {
    const response = await fetch("/api/sad-sword-status");
    if (!response.ok) return;
    const data = await response.json();
    sadSwordGranted = Boolean(data.granted);
    if (sadSwordGranted) upgrades.sadSword = true;
    else {
      delete upgrades.sadSword;
      sadSwordEquipped = false;
    }
    sadSwordGrantForm.hidden = !data.canGrant;
    render();
  } catch (error) {
    console.warn("Could not load Sad Tumore Sword status.", error);
  }
}

async function checkBanStatus() {
  try {
    const response = await fetch("/api/ban-status");
    if (!response.ok) return;
    const data = await response.json();
    if (!data.banned) return;
    banReason.textContent = String(data.reason || "No reason was provided.").slice(0, 280);
    banScreen.hidden = false;
    document.querySelector("main").inert = true;
    for (const screen of [achievementScene, victoryScreen, introScreen, vesselScreen]) screen.inert = true;
    document.body.style.overflow = "hidden";
    banScreen.focus();
  } catch (error) {
    console.warn("Could not check ban status.", error);
  }
}

async function revealAdminForAuthorizedUser() {
  try {
    const user = await window.websim?.getUser();
    const username = user?.username?.toLowerCase();
    if (["heitorm2003", "kris_is_gaster", "shadowx", "krissss"].includes(username)) {
      adminToggle.hidden = false;
    }
  } catch (error) {
    console.warn("Could not verify admin account.", error);
  }
}

revealAdminForAuthorizedUser();

function enterSecretRoom() {
  secretRoom.hidden = false;
  document.querySelector("main").inert = true;
  secretRoomExit.focus();
}

function leaveSecretRoom() {
  secretRoom.hidden = true;
  document.querySelector("main").inert = false;
  tvSet.focus();
}

secretRoomExit.addEventListener("click", leaveSecretRoom);
window.addEventListener("keydown", event => {
  if (event.key === "Escape" && !secretRoom.hidden) leaveSecretRoom();
});

mysteryMan.addEventListener("click", () => {
  if (mysteryManClicked) return;
  mysteryManClicked = true;
  mysteryManSprite.src = "Mysteryman_overworld_2.png";
  mysteryMan.classList.add("is-fading");
  mysteryMan.addEventListener("animationend", () => {
    mysteryMan.classList.add("is-gone");
    mysteryMan.setAttribute("aria-label", "Mystery man disappeared");
  }, { once: true });
});

tvSet.addEventListener("click", () => {
  tvClicks += 1;
  localStorage.setItem(tvClicksKey, String(tvClicks));
  if (!tvAchievementEarned) {
    tvAchievementEarned = true;
    tvImage.hidden = false;
    tvSet.setAttribute("aria-label", "TV TIMEEE achievement unlocked; " + tvClicks + " of 30 clicks");
    save();
    renderAchievement();
  } else {
    tvSet.setAttribute("aria-label", "TV click " + tvClicks + " of 30");
  }
  if (!secretRoomUnlocked && tvClicks >= 30) {
    secretRoomUnlocked = true;
    localStorage.setItem(secretRoomUnlockedKey, "true");
    enterSecretRoom();
  } else if (secretRoomUnlocked) {
    enterSecretRoom();
  }
});

knight.addEventListener("pointerdown", event => {
  if (blowtorchEquipped && snowgraveFreezeEnd > Date.now() && !snowgraveAchievementEarned) {
    event.preventDefault();
    startBlowtorch();
  }
});
window.addEventListener("pointerup", stopBlowtorch);
window.addEventListener("pointercancel", stopBlowtorch);

knight.addEventListener("click", () => {
  if (knight.disabled || (snowgraveFreezeEnd > Date.now() && !snowgraveAchievementEarned)) return;
  knightClicks += 1;
  if (!infiniteDarkDollars) darkDollars += 1;
  const bonus = Object.entries(upgrades).reduce((sum, entry) => {
    const id = entry[0];
    const owned = entry[1];
    return sum + (owned && items[id] && (id !== "sadSword" || (sadSwordGranted && sadSwordEquipped)) ? items[id].bonus : 0);
  }, 0);
  count += (1 + bonus) * (kaizoEquipped ? 3 : 1) + (krisItemEligible && krisItemEquipped ? 75000000 : 0);
  render();
});

shopToggle.addEventListener("click", () => {
  shop.hidden = !shop.hidden;
  shopToggle.setAttribute("aria-expanded", String(!shop.hidden));
});

leaderboardToggle.addEventListener("click", () => {
  leaderboardPanel.hidden = !leaderboardPanel.hidden;
  leaderboardToggle.setAttribute("aria-expanded", String(!leaderboardPanel.hidden));
  if (!leaderboardPanel.hidden) loadLeaderboard();
});

chatToggle.addEventListener("click", () => {
  chatPanel.hidden = !chatPanel.hidden;
  chatToggle.setAttribute("aria-expanded", String(!chatPanel.hidden));
  if (!chatPanel.hidden) connectGlobalChat();
});

chatForm.addEventListener("submit", event => {
  event.preventDefault();
  const text = chatInput.value.trim();
  if (!text || !chatConnected || !chatRoom) return;
  chatRoom.send({ type: "chat", text });
  chatInput.value = "";
  chatInput.focus();
});

achievementsToggle.addEventListener("click", () => {
  achievementsPanel.hidden = !achievementsPanel.hidden;
  achievementsToggle.setAttribute("aria-expanded", String(!achievementsPanel.hidden));
});

backgroundsToggle.addEventListener("click", () => {
  backgroundsPanel.hidden = !backgroundsPanel.hidden;
  backgroundsToggle.setAttribute("aria-expanded", String(!backgroundsPanel.hidden));
});

socialsToggle.addEventListener("click", () => {
  socialsPanel.hidden = !socialsPanel.hidden;
  socialsToggle.setAttribute("aria-expanded", String(!socialsPanel.hidden));
});

creditsToggle.addEventListener("click", () => {
  creditsPanel.hidden = !creditsPanel.hidden;
  creditsToggle.setAttribute("aria-expanded", String(!creditsPanel.hidden));
});

adminToggle.addEventListener("click", () => {
  adminPanel.hidden = !adminPanel.hidden;
  adminToggle.setAttribute("aria-expanded", String(!adminPanel.hidden));
  if (!adminPanel.hidden) loadBanList();
});

sadSwordGrantForm.addEventListener("submit", async event => {
  event.preventDefault();
  const username = sadSwordRecipient.value.trim();
  if (!username) return;
  sadSwordGrantStatus.textContent = "Giving item…";
  try {
    const response = await fetch("/api/sad-sword-grant", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not grant the item.");
    sadSwordRecipient.value = "";
    sadSwordGrantStatus.textContent = "Sad Tumore Sword given to @" + data.username + ".";
    await loadSadSwordStatus();
  } catch (error) {
    sadSwordGrantStatus.textContent = error?.message || "Could not grant the item.";
  }
});

async function loadBanList() {
  banListStatus.textContent = "Loading…";
  try {
    const response = await fetch("/api/bans");
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not load the ban list.");
    banList.replaceChildren();
    for (const ban of data.bans || []) {
      const item = document.createElement("li");
      item.className = "ban-list-item";
      const details = document.createElement("div");
      details.className = "ban-list-details";
      const name = document.createElement("strong");
      name.textContent = "@" + ban.target_username;
      const reason = document.createElement("span");
      reason.textContent = String(ban.reason || "No reason provided.");
      details.append(name, reason);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "ban-remove";
      remove.textContent = "Unban";
      remove.setAttribute("aria-label", "Unban @" + ban.target_username);
      remove.addEventListener("click", () => removeBan(ban.target_username, remove));
      item.append(details, remove);
      banList.append(item);
    }
    banListStatus.textContent = data.bans?.length ? "" : "No players are banned.";
  } catch (error) {
    banList.replaceChildren();
    banListStatus.textContent = error?.message || "Could not load the ban list.";
  }
}

async function removeBan(username, button) {
  button.disabled = true;
  try {
    const response = await fetch("/api/bans", {
      method: "DELETE",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not remove ban.");
    await loadBanList();
    banFormStatus.textContent = "@" + data.username + " has been unbanned.";
  } catch (error) {
    button.disabled = false;
    banListStatus.textContent = error?.message || "Could not remove ban.";
  }
}

banListRefresh.addEventListener("click", loadBanList);

banForm.addEventListener("submit", async event => {
  event.preventDefault();
  const username = banUsername.value.trim();
  const reason = banReasonInput.value.trim();
  if (!username || !reason) return;
  banFormStatus.textContent = "Issuing ban…";
  try {
    const response = await fetch("/api/bans", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username, reason }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not issue ban.");
    banForm.reset();
    banFormStatus.textContent = "@" + data.username + " has been banned.";
    await Promise.all([loadBanList(), checkBanStatus()]);
  } catch (error) {
    banFormStatus.textContent = error?.message || "Could not issue ban.";
  }
});

announcementForm.addEventListener("submit", async event => {
  event.preventDefault();
  const text = announcementInput.value.trim();
  if (!text || text.length > 280) return;
  announcementSubmit.disabled = true;
  announcementStatus.textContent = "Publishing…";
  try {
    const response = await fetch("/api/announcements", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Could not publish announcement.");
    announcementInput.value = "";
    announcementStatus.textContent = "Announcement published.";
    await loadAnnouncements();
  } catch (error) {
    announcementStatus.textContent = error?.message || "Could not publish announcement.";
  } finally {
    announcementSubmit.disabled = false;
  }
});

grantForm.addEventListener("submit", event => {
  event.preventDefault();
  const amount = Number(grantAmount.value);
  if (!Number.isSafeInteger(amount) || amount < 1 || amount > 1000000000 - count) return;
  count += amount;
  grantAmount.value = "";
  adminStatus.textContent = amount.toLocaleString() + " hits added.";
  render();
});

setHitsForm.addEventListener("submit", event => {
  event.preventDefault();
  const amount = Number(setHitsAmount.value);
  if (!Number.isSafeInteger(amount) || amount < 0 || amount > 1000000000) return;
  count = amount;
  setHitsAmount.value = "";
  adminStatus.textContent = "Hit total set to " + amount.toLocaleString() + ".";
  render();
});

unlockUpgradesButton.addEventListener("click", () => {
  upgrades = { honed: true, strike: true, kaizo: true, blowtorch: true };
  kaizoEquipped = true;
  blowtorchEquipped = false;
  unlocked = true;
  adminStatus.textContent = "All upgrades unlocked. Kaizo Knight equipped.";
  render();
});

unlockBackgroundsButton.addEventListener("click", () => {
  bestHits = Math.max(bestHits, 1225);
  localStorage.setItem(backgroundProgressKey, String(bestHits));
  adminStatus.textContent = "All backgrounds unlocked.";
  render();
});

sadSwordButton.addEventListener("click", () => {
  if (!sadSwordGranted) return;
  sadSwordEquipped = !sadSwordEquipped;
  upgrades.sadSword = true;
  render();
});

document.querySelectorAll(".buy-button[data-item]").forEach(button => {
  button.addEventListener("click", () => {
    const id = button.dataset.item;
    const item = items[id];
    if (id === "kris") {
      if (!krisItemEligible) return;
      if (!upgrades.kris) {
        upgrades.kris = true;
      } else {
        krisItemEquipped = !krisItemEquipped;
      }
      render();
      return;
    }
    if (id === "kaizo" && upgrades.kaizo) {
      kaizoEquipped = !kaizoEquipped;
      render();
      return;
    }
    if (id === "blowtorch" && upgrades.blowtorch) {
      blowtorchEquipped = !blowtorchEquipped;
      if (!blowtorchEquipped) stopBlowtorch();
      render();
      return;
    }
    if (upgrades[id]) return;
    if (count >= item.cost) {
      count -= item.cost;
    } else if (infiniteDarkDollars || darkDollars >= item.darkCost) {
      if (!infiniteDarkDollars) darkDollars -= item.darkCost;
    } else {
      return;
    }
    upgrades[id] = true;
    render();
  });
});
