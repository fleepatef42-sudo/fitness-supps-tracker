const storageKeys = {
  users: "fitness-users",
  currentUser: "fitness-current-user",
};

const state = {
  users: loadFromStorage(storageKeys.users, []),
  currentUser: loadFromStorage(storageKeys.currentUser, null),
};

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function saveAuthState() {
  localStorage.setItem(storageKeys.users, JSON.stringify(state.users));
  localStorage.setItem(storageKeys.currentUser, JSON.stringify(state.currentUser));
}

function $(id) {
  return document.getElementById(id);
}

function setAuthMessage(message, type) {
  const box = $("authMessage");
  box.textContent = message;
  box.className = `auth-message ${type ? `auth-${type}` : ""}`.trim();
}

function getNextUrl() {
  const next = new URLSearchParams(location.search).get("next");
  if (!next || next.startsWith("http://") || next.startsWith("https://")) {
    return "./index.html";
  }
  return next;
}

function redirectToDashboard() {
  location.replace(getNextUrl());
}

async function handleLogin(event) {
  event.preventDefault();
  const email = $("loginEmail").value.trim().toLowerCase();
  const password = $("loginPassword").value;
  const user = state.users.find((item) => item.email === email);
  const passwordMatches = user ? await verifyPassword(user, password) : false;

  if (!passwordMatches) {
    setAuthMessage("البريد أو كلمة المرور غير صحيحين.", "error");
    return;
  }

  state.currentUser = { id: user.id, name: user.name, email: user.email };
  saveAuthState();
  $("loginForm").reset();
  setAuthMessage("تم تسجيل الدخول بنجاح.", "success");
  setTimeout(redirectToDashboard, 250);
}

async function verifyPassword(user, password) {
  if (user.passwordHash) {
    return user.passwordHash === await hashPassword(password);
  }

  if (user.password === password) {
    user.passwordHash = await hashPassword(password);
    delete user.password;
    saveAuthState();
    return true;
  }

  return false;
}

async function hashPassword(value) {
  if (window.crypto?.subtle) {
    const encoder = new TextEncoder();
    const digest = await window.crypto.subtle.digest("SHA-256", encoder.encode(value));
    return Array.from(new Uint8Array(digest))
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }

  return `plain:${value}`;
}

function bindAuth() {
  $("loginForm").addEventListener("submit", handleLogin);
  $("guestLogin").addEventListener("click", () => {
    state.currentUser = { id: "guest-" + Date.now(), name: "ضيف", email: "guest@example.com" };
    saveAuthState();
    setTimeout(redirectToDashboard, 250);
  });
}

function init() {
  if (state.currentUser) {
    redirectToDashboard();
    return;
  }

  bindAuth();
}

init();
