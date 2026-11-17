const gameStorage = {
  getItem() { return null; },
  setItem() {},
  removeItem() {},
};

const playKrisButton = document.querySelector(".play-kris-button");
playKrisButton.addEventListener("click", event => {
  event.preventDefault();
  if (window.confirm("Are you sure you want to play hit kris?")) {
    window.location.href = playKrisButton.href;
  }
});

const knight = document.querySelector("#knight");
const tvSet = document.querySelector("#tv-set");
const tvImage = document.querySelector("#tv-image");
const hits = document.querySelector("#hits");
const freezeStatus = document.querySelector("#freeze-status");
const shopToggle = document.querySelector("#shop-toggle");
const shop = document.querySelector("#shop");
const krisShopItem = document.querySelector("#kris-shop-item");
const chatToggle = document.querySelector("#chat-toggle");
const chatPanel = document.querySelector("#chat-panel");
const chatStatus = document.querySelector("#chat-status");
const chatMessages = document.querySelector("#chat-messages");
const chatForm = document.querySelector("#chat-form");
const chatInput = document.querySelector("#chat-input");
const chatSend = document.querySelector("#chat-send");
const sandboxToggle = document.querySelector("#sandbox-mode-button");
const sandboxPanel = document.querySelector("#sandbox-panel");
const sandboxClose = document.querySelector("#sandbox-close");
const sandboxHits = document.querySelector("#sandbox-hits");
const sandboxSetForm = document.querySelector("#sandbox-set-form");
const sandboxHitInput = document.querySelector("#sandbox-hit-input");
const sandboxUnlock = document.querySelector("#sandbox-unlock");
const sandboxReset = document.querySelector("#sandbox-reset");
const sandboxStatus = document.querySelector("#sandbox-status");
const achievementsToggle = document.querySelector("#achievements-toggle");
const achievementsPanel = document.querySelector("#achievements-panel");
const achievementList = document.querySelector("#achievement-list");
const backgroundsToggle = document.querySelector("#backgrounds-toggle");
const backgroundsPanel = document.querySelector("#backgrounds-panel");
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
const storageKey = "roaring-knight-hits";
const backgroundKey = "roaring-knight-background";
const backgroundProgressKey = "roaring-knight-background-progress";
const unlockKey = "roaring-knight-shop-unlocked";
const upgradesKey = "roaring-knight-upgrades";
const kaizoEquippedKey = "roaring-knight-kaizo-equipped";
const krisItemEquippedKey = "roaring-knight-kris-item-equipped";
const victoryDismissedKey = "roaring-knight-victory-dismissed";
const swoonAchievementKey = "roaring-knight-achievement-are-we-serious";
const jaronaAchievementKey = "roaring-knight-achievement-jarona";
const jaronaClicksKey = "roaring-knight-jarona-left-clicks";
const roaringAchievementKey = "roaring-knight-achievement-roaring";
const roaringClicksKey = "roaring-knight-roaring-clicks";
const knightClicksKey = "roaring-knight-total-clicks";
const snowgraveAchievementKey = "roaring-knight-achievement-snowgrave";
const snowgraveClicksKey = "roaring-knight-snowgrave-clicks";
const snowgraveFreezeEndKey = "roaring-knight-snowgrave-freeze-end";
const tvAchievementKey = "roaring-knight-achievement-tv-timeee";
const swoonAchievementAt = 1267;
const shopUnlockAt = 100;
const gameWinAt = 1225;
const backgrounds = [
  { id: "void", name: "The Void", at: 0 },
  { id: "fountain", name: "Dark Fountain", at: 100 },
  { id: "twilight", name: "Twilight", at: 500 },
  { id: "roaring", name: "The Roaring", at: 1225 },
];
let selectedBackground = gameStorage.getItem(backgroundKey) || "void";
let bestHits = Number.parseInt(gameStorage.getItem(backgroundProgressKey) ?? "0", 10);
if (!Number.isSafeInteger(bestHits) || bestHits < 0) bestHits = 0;
let victoryShown = false;
let lastSubmittedScore = -1;
let scoreSaveInFlight = false;
let scoreSaveTimer = null;
let victoryDismissed = gameStorage.getItem(victoryDismissedKey) === "true";
let swoonAchievementEarned = gameStorage.getItem(swoonAchievementKey) === "true";
let jaronaAchievementEarned = gameStorage.getItem(jaronaAchievementKey) === "true";
let roaringAchievementEarned = gameStorage.getItem(roaringAchievementKey) === "true";
let snowgraveAchievementEarned = gameStorage.getItem(snowgraveAchievementKey) === "true";
let tvAchievementEarned = gameStorage.getItem(tvAchievementKey) === "true";
let goatAchievementVisible = false;
let krisItemEligible = false;
let krisItemEquipped = false;
if (tvAchievementEarned) tvImage.hidden = false;
let snowgraveClicks = Number.parseInt(gameStorage.getItem(snowgraveClicksKey) ?? "0", 10);
if (!Number.isSafeInteger(snowgraveClicks) || snowgraveClicks < 0) snowgraveClicks = 0;
let snowgraveFreezeEnd = Number.parseInt(gameStorage.getItem(snowgraveFreezeEndKey) ?? "0", 10);
if (!Number.isSafeInteger(snowgraveFreezeEnd) || snowgraveFreezeEnd < 0) snowgraveFreezeEnd = 0;
let snowgraveTimer = null;
let knightClicks = Number.parseInt(gameStorage.getItem(knightClicksKey) ?? "0", 10);
if (!Number.isSafeInteger(knightClicks) || knightClicks < 0) knightClicks = 0;
let roaringClicks = Number.parseInt(gameStorage.getItem(roaringClicksKey) ?? "0", 10);
if (!Number.isFinite(roaringClicks) || roaringClicks < 0) roaringClicks = 0;
let jaronaLeftClicks = Number.parseInt(gameStorage.getItem(jaronaClicksKey) ?? "0", 10);
if (!Number.isFinite(jaronaLeftClicks) || jaronaLeftClicks < 0 || (jaronaAchievementEarned && jaronaLeftClicks >= 10)) jaronaLeftClicks = 0;
let achievementSequenceStarted = false;
let cutscenePlaying = false;
const items = {
  honed: { cost: 50, bonus: 1 },
  strike: { cost: 200, bonus: 5 },
  kaizo: { cost: 1225, bonus: 0 },
};

let count = Number.parseInt(gameStorage.getItem(storageKey) ?? "0", 10);
if (!Number.isFinite(count) || count < 0) count = 0;
let unlocked = gameStorage.getItem(unlockKey) === "true" || count >= shopUnlockAt;
let upgrades;
try {
  upgrades = JSON.parse(gameStorage.getItem(upgradesKey) ?? "{}");
} catch {
  upgrades = {};
}
if (!upgrades || typeof upgrades !== "object") upgrades = {};
let kaizoEquipped = gameStorage.getItem(kaizoEquippedKey) === "true" && Boolean(upgrades.kaizo);
krisItemEquipped = gameStorage.getItem(krisItemEquippedKey) === "true" && Boolean(upgrades.kris);
function save() {
  gameStorage.setItem(storageKey, String(count));
  gameStorage.setItem(unlockKey, String(unlocked));
  gameStorage.setItem(upgradesKey, JSON.stringify(upgrades));
  gameStorage.setItem(kaizoEquippedKey, String(kaizoEquipped));
  gameStorage.setItem(krisItemEquippedKey, String(krisItemEquipped));
  gameStorage.setItem(swoonAchievementKey, String(swoonAchievementEarned));
  gameStorage.setItem(jaronaAchievementKey, String(jaronaAchievementEarned));
  gameStorage.setItem(jaronaClicksKey, String(jaronaLeftClicks));
  gameStorage.setItem(roaringAchievementKey, String(roaringAchievementEarned));
  gameStorage.setItem(roaringClicksKey, String(roaringClicks));
  gameStorage.setItem(knightClicksKey, String(knightClicks));
  gameStorage.setItem(snowgraveAchievementKey, String(snowgraveAchievementEarned));
  gameStorage.setItem(tvAchievementKey, String(tvAchievementEarned));
  gameStorage.setItem(snowgraveClicksKey, String(snowgraveClicks));
  if (snowgraveFreezeEnd > 0) gameStorage.setItem(snowgraveFreezeEndKey, String(snowgraveFreezeEnd));
}

let chatRoom = null;
let chatStarted = false;
let chatConnected = false;
const badgeLabels = { owner: "OWNER", admin: "ADMIN", goat: "THE GOAT", guest: "GUEST" };

function getUserTagTypes(username, serverTags) {
  const allowed = Object.keys(badgeLabels);
  const trusted = Array.isArray(serverTags) ? serverTags.filter(tag => allowed.includes(tag)) : [];
  if (trusted.length) return [...new Set(trusted)];
  const normalized = String(username || "").toLowerCase();
  if (normalized === "heitorm2003") return ["owner"];
  if (normalized === "kris_is_gaster") return ["admin", "goat"];
  return [];
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

function renderBackgrounds() {
  bestHits = Math.max(bestHits, count);
  gameStorage.setItem(backgroundProgressKey, String(bestHits));
  if (!backgrounds.some(background => background.id === selectedBackground && bestHits >= background.at)) {
    selectedBackground = "void";
  }
  document.body.classList.remove("theme-fountain", "theme-twilight", "theme-roaring");
  if (selectedBackground !== "void") document.body.classList.add("theme-" + selectedBackground);
  gameStorage.setItem(backgroundKey, selectedBackground);

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
  addAchievementCard("Assets/Sprites/Swoon.jpg", "are we serious?", swoonAchievementEarned);
  addAchievementCard("Assets/Sprites/Flowery.webp", "jarona", jaronaAchievementEarned);
  addAchievementCard("Assets/Sprites/Achivements/The_Roaring.webp", "roaring", roaringAchievementEarned);
  addAchievementCard("Assets/Backgrounds/dark-fountain.jpg", "A Little Momentum", bestHits >= 100);
  addAchievementCard("Assets/Backgrounds/the-roaring.jpg", "THEN THE WORLD WAS COVERED IN DARKNESS", bestHits >= 100000);
  addAchievementCard("Roaring_Knight_Idle.webp", "Stubborn Persistence", knightClicks >= 100);
  addAchievementCard("static-assets-upload14633654429706285761.webp", "Fully Armed", Boolean(upgrades.honed && upgrades.strike && upgrades.kaizo));
  addAchievementCard("static-assets-upload14633654429706285761.webp", "Snowgrave..?", snowgraveAchievementEarned);
  addAchievementCard("Tenna_battle.gif", "TV TIMEEE", tvAchievementEarned);
  if (goatAchievementVisible) addGoatAchievementCard();
}

function addAchievementCard(imageSource, achievementName, unlocked = true) {
  const card = document.createElement("article");
  card.className = "achievement-card" + (unlocked ? "" : " is-locked");
  const icon = document.createElement("img");
  icon.src = imageSource;
  icon.alt = "";
  const title = document.createElement("h3");
  title.textContent = achievementName;
  card.append(icon, title);
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
    render();
  } catch (error) {
    console.warn("Could not verify exclusive achievement access.", error);
  }
}

function refreshSnowgraveState() {
  const remaining = snowgraveFreezeEnd - Date.now();
  const frozen = snowgraveFreezeEnd > 0 && remaining > 0 && !snowgraveAchievementEarned;
  knight.disabled = frozen;
  knight.classList.toggle("is-frozen", frozen);

  if (frozen) {
    const minutes = Math.floor(remaining / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    freezeStatus.textContent = "Frozen solid · " + minutes + ":" + String(seconds).padStart(2, "0");
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
    gameStorage.removeItem(snowgraveFreezeEndKey);
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
  gameStorage.setItem(snowgraveFreezeEndKey, String(snowgraveFreezeEnd));
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
  gameStorage.setItem(victoryDismissedKey, "true");
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
  sandboxHits.textContent = count.toLocaleString();
  if (document.activeElement !== sandboxHitInput) sandboxHitInput.value = String(count);
  if (count >= shopUnlockAt) unlocked = true;
  shopToggle.hidden = !unlocked;
  kaizoCompanion.hidden = !kaizoEquipped;
  krisShopItem.hidden = !krisItemEligible;
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
    } else {
      button.disabled = owned || count < item.cost;
      button.textContent = owned ? "Owned" : "Buy · " + item.cost + " hits";
    }
  });
  save();
  renderBackgrounds();
  adminCurrentHits.textContent = count.toLocaleString();
  const unlockedBackgroundCount = backgrounds.filter(background => bestHits >= background.at).length;
  adminBackgroundCount.textContent = unlockedBackgroundCount + " / " + backgrounds.length;
  const ownedUpgrades = ["honed", "strike", "kaizo"].filter(id => upgrades[id]).length;
  adminUpgradeCount.textContent = ownedUpgrades + " / 3";
  refreshSnowgraveState();
  renderAchievement();
  if (count >= gameWinAt && !victoryShown && !victoryDismissed) {
    victoryShown = true;
    victoryScreen.hidden = false;
  }
  if (count >= swoonAchievementAt) playSwoonAchievement();
}

render();
checkGoatAchievementAccess();
loadAnnouncements();
setInterval(loadAnnouncements, 60000);

document.addEventListener("click", event => {
  if (event.detail === 0 || event.clientX >= window.innerWidth / 2 || cutscenePlaying) return;
  jaronaLeftClicks += 1;
  if (jaronaAchievementEarned && jaronaLeftClicks >= 10) {
    jaronaLeftClicks = 0;
    gameStorage.setItem(jaronaClicksKey, "0");
    playJaronaRetry();
  } else {
    gameStorage.setItem(jaronaClicksKey, String(jaronaLeftClicks));
    if (!jaronaAchievementEarned && jaronaLeftClicks >= 10) playJaronaAchievement();
  }
});

kaizoCompanion.addEventListener("click", () => {
  if (cutscenePlaying || snowgraveAchievementEarned || snowgraveFreezeEnd > Date.now()) return;
  if (!roaringAchievementEarned) {
    roaringClicks += 1;
    gameStorage.setItem(roaringClicksKey, String(roaringClicks));
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
  gameStorage.setItem(victoryDismissedKey, "true");
});

const introLines = [
  "umm hello!",
  "Welcome to hit The Roaring Knight!",
  "This game is in Early alpha tho...",
  "Have Fun!",
];
let introLineIndex = 0;
introNext.addEventListener("click", () => {
  introLineIndex += 1;
  if (introLineIndex >= introLines.length) {
    introScreen.hidden = true;
    return;
  }
  introDialogue.textContent = introLines[introLineIndex];
  introNext.textContent = introLineIndex === introLines.length - 1 ? "Start" : "Next";
});

async function revealAdminForAuthorizedUser() {
  try {
    const user = await window.websim?.getUser();
    const username = user?.username?.toLowerCase();
    if (username === "heitorm2003" || username === "kris_is_gaster") {
      adminToggle.hidden = false;
    }
  } catch (error) {
    console.warn("Could not verify admin account.", error);
  }
}

revealAdminForAuthorizedUser();

tvSet.addEventListener("click", () => {
  if (tvAchievementEarned) return;
  tvAchievementEarned = true;
  tvImage.hidden = false;
  tvSet.setAttribute("aria-label", "TV TIMEEE achievement unlocked");
  save();
  renderAchievement();
});

knight.addEventListener("click", () => {
  if (knight.disabled || (snowgraveFreezeEnd > Date.now() && !snowgraveAchievementEarned)) return;
  knightClicks += 1;
  const bonus = Object.entries(upgrades).reduce((sum, entry) => {
    const id = entry[0];
    const owned = entry[1];
    return sum + (owned && items[id] ? items[id].bonus : 0);
  }, 0);
  count += (1 + bonus) * (kaizoEquipped ? 3 : 1) + (krisItemEligible && krisItemEquipped ? 100000000 : 0);
  render();
});

shopToggle.addEventListener("click", () => {
  shop.hidden = !shop.hidden;
  shopToggle.setAttribute("aria-expanded", String(!shop.hidden));
});

function setSandboxOpen(open) {
  sandboxPanel.hidden = !open;
  sandboxToggle.setAttribute("aria-expanded", String(open));
  if (open) sandboxClose.focus();
  else sandboxToggle.focus();
}

sandboxToggle.addEventListener("click", () => {
  setSandboxOpen(sandboxPanel.hidden);
});
sandboxClose.addEventListener("click", () => setSandboxOpen(false));
sandboxSetForm.addEventListener("submit", event => {
  event.preventDefault();
  const amount = Number(sandboxHitInput.value);
  if (!Number.isSafeInteger(amount) || amount < 0 || amount > 1000000000) return;
  count = amount;
  sandboxStatus.textContent = "Hit total set for this run.";
  render();
});
document.querySelectorAll("[data-sandbox-add]").forEach(button => {
  button.addEventListener("click", () => {
    const amount = Number(button.dataset.sandboxAdd);
    if (count > 1000000000 - amount) return;
    count += amount;
    sandboxStatus.textContent = amount.toLocaleString() + " hits added for this run.";
    render();
  });
});
sandboxUnlock.addEventListener("click", () => {
  unlocked = true;
  upgrades = { honed: true, strike: true, kaizo: true };
  kaizoEquipped = true;
  bestHits = Math.max(bestHits, 1225);
  selectedBackground = "roaring";
  sandboxStatus.textContent = "Upgrades and backgrounds unlocked for this run.";
  render();
});
sandboxReset.addEventListener("click", () => window.location.reload());
sandboxPanel.addEventListener("keydown", event => {
  if (event.key === "Escape") setSandboxOpen(false);
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

adminToggle.addEventListener("click", () => {
  adminPanel.hidden = !adminPanel.hidden;
  adminToggle.setAttribute("aria-expanded", String(!adminPanel.hidden));
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
  upgrades = { honed: true, strike: true, kaizo: true };
  kaizoEquipped = true;
  unlocked = true;
  adminStatus.textContent = "All upgrades unlocked. Kaizo Knight equipped.";
  render();
});

unlockBackgroundsButton.addEventListener("click", () => {
  bestHits = Math.max(bestHits, 1225);
  gameStorage.setItem(backgroundProgressKey, String(bestHits));
  adminStatus.textContent = "All backgrounds unlocked.";
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
    if (upgrades[id] || count < item.cost) return;
    count -= item.cost;
    upgrades[id] = true;
    render();
  });
});
