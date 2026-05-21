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

function redirectToDashboard() {
  location.replace("./index.html");
}

async function handleSignup(event) {
  event.preventDefault();
  const name = $("signupName").value.trim();
  const email = $("signupEmail").value.trim().toLowerCase();
  const password = $("signupPassword").value;

  if (!name || !email || password.length < 8) {
    setAuthMessage("أدخل الاسم والبريد وكلمة مرور من 8 أحرف على الأقل.", "error");
    return;
  }

  const exists = state.users.find((user) => user.email === email);
  if (exists) {
    setAuthMessage("هذا البريد مستخدم بالفعل. جرّب تسجيل الدخول بدلًا من ذلك.", "error");
    return;
  }

  const passwordHash = await hashPassword(password);
  const user = { id: Date.now(), name, email, passwordHash };
  state.users.push(user);
  state.currentUser = { id: user.id, name: user.name, email: user.email };
  saveAuthState();
  $("signupForm").reset();
  setAuthMessage("تم إنشاء الحساب بنجاح. يتم تحويلك الآن إلى اللوحة.", "success");
  setTimeout(redirectToDashboard, 500);
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

function init() {
  if (state.currentUser) {
    redirectToDashboard();
    return;
  }

  $("signupForm").addEventListener("submit", handleSignup);
  $("guestLogin").addEventListener("click", () => {
    state.currentUser = { id: "guest-" + Date.now(), name: "ضيف", email: "guest@example.com" };
    saveAuthState();
    setAuthMessage("جاري الدخول كضيف...", "success");
    setTimeout(redirectToDashboard, 250);
  });
}

init();
