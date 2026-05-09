const activityLevels = {
  low: { multiplier: 1.2, label: "نشاط خفيف" },
  moderate: { multiplier: 1.55, label: "نشاط متوسط" },
  high: { multiplier: 1.725, label: "نشاط عالٍ" },
  athlete: { multiplier: 1.9, label: "رياضي مكثف" },
};

const goals = {
  cut: { caloriesOffset: -350, protein: 2.2, fat: 0.8, label: "تنشيف" },
  maintain: { caloriesOffset: 0, protein: 1.9, fat: 0.9, label: "ثبات" },
  bulk: { caloriesOffset: 320, protein: 2.0, fat: 1.0, label: "زيادة عضلية" },
};

const exerciseOptions = {
  chest: ["Bench Press", "Incline Dumbbell Press", "Decline Press", "Chest Fly", "Cable Fly", "Machine Press", "Push Up", "Weighted Dip"],
  back: ["Lat Pulldown", "Barbell Row", "Seated Cable Row", "Pull Up", "Deadlift", "T-Bar Row", "Single Arm Row", "Straight Arm Pulldown"],
  shoulders: ["Shoulder Press", "Lateral Raise", "Rear Delt Fly", "Arnold Press", "Upright Row", "Front Raise", "Machine Shoulder Press", "Face Pull"],
  legs: ["Squat", "Leg Press", "Romanian Deadlift", "Walking Lunges", "Bulgarian Split Squat", "Leg Extension", "Leg Curl", "Hip Thrust"],
  arms: ["Barbell Curl", "Hammer Curl", "Incline Curl", "Cable Curl", "Triceps Pushdown", "Overhead Extension", "Skull Crusher", "Close Grip Bench Press"],
  abs: ["Crunch", "Cable Crunch", "Hanging Leg Raise", "Plank", "Russian Twist", "Ab Wheel", "Mountain Climber", "Toe Touch"],
  glutes: ["Hip Thrust", "Glute Bridge", "Cable Kickback", "Sumo Squat", "Bulgarian Split Squat", "Romanian Deadlift", "Step Up", "Frog Pump"],
  cardio: ["Incline Walk", "Cycling", "Rowing Machine", "Jump Rope", "Treadmill Run", "Stairmaster", "Elliptical", "Sprint Intervals"],
  fullbody: ["Goblet Squat", "Push Up", "Kettlebell Swing", "Burpee", "Thruster", "Renegade Row", "Farmer Carry", "Battle Rope"],
};

const mealChoicesData = {
  breakfast: ["شوفان + لبن + موز + زبدة فول سوداني", "بيض + توست أسمر + جبنة قريش", "زبادي يوناني + جرانولا + فاكهة", "فول + بيض + خبز بلدي"],
  snack1: ["واي بروتين + موز", "زبادي يوناني + عسل", "تفاح + حفنة مكسرات", "تونة + 2 رايس كيك"],
  lunch: ["أرز + دجاج مشوي + سلطة", "بطاطس + لحم مفروم + خضار", "مكرونة + تونة + سلطة", "أرز بسمتي + سمك + خضار سوتيه"],
  workout: ["موز + واي بروتين", "قهوة + تمر + بروتين", "توست + عسل + زبادي", "أرز أبيض + دجاج خفيف"],
  dinner: ["جبنة قريش + خبز أسمر + خيار", "تونة + سلطة + بطاطس", "بيض + خضار + توست", "زبادي يوناني + شوفان + مكسرات"],
};

const mealSlotLabels = {
  breakfast: "الفطور",
  snack1: "سناك 1",
  lunch: "الغداء",
  workout: "قبل/بعد التمرين",
  dinner: "العشاء",
};

const programTemplates = {
  pushpulllegs: [
    { day: "السبت", focus: "Push", details: "صدر + كتف أمامي + ترايسبس", exercises: "Bench Press, Incline Press, Shoulder Press, Triceps Pushdown" },
    { day: "الأحد", focus: "Pull", details: "ظهر + كتف خلفي + بايسبس", exercises: "Lat Pulldown, Row, Face Pull, Barbell Curl" },
    { day: "الاثنين", focus: "Legs", details: "رجل كاملة", exercises: "Squat, Leg Press, RDL, Calf Raise" },
    { day: "الثلاثاء", focus: "راحة", details: "مشي خفيف أو إطالات", exercises: "Recovery Walk, Mobility" },
    { day: "الأربعاء", focus: "Push", details: "تنويع ضغط علوي وأفقي", exercises: "Dumbbell Press, Chest Fly, Lateral Raise, Dips" },
    { day: "الخميس", focus: "Pull", details: "سحب أفقي وعمودي", exercises: "Pull Up, Cable Row, Rear Delt Fly, Hammer Curl" },
    { day: "الجمعة", focus: "Legs", details: "تركيز قوة وتحمل", exercises: "Front Squat, Lunges, Leg Curl, Hip Thrust" },
  ],
  upperlower: [
    { day: "السبت", focus: "Upper", details: "صدر + ظهر + كتف + ذراع", exercises: "Bench Press, Row, Shoulder Press, Curl" },
    { day: "الأحد", focus: "Lower", details: "رجل + كور", exercises: "Squat, RDL, Leg Press, Plank" },
    { day: "الاثنين", focus: "راحة", details: "تعافٍ نشط", exercises: "Walking, Stretching" },
    { day: "الثلاثاء", focus: "Upper", details: "نسخة أخف أو أعلى تكرار", exercises: "Incline Press, Lat Pulldown, Lateral Raise, Triceps Extension" },
    { day: "الأربعاء", focus: "Lower", details: "مؤخرة ورجل خلفية", exercises: "Deadlift, Split Squat, Leg Curl, Calf Raise" },
    { day: "الخميس", focus: "راحة", details: "كارديو خفيف", exercises: "Cycling, Mobility" },
    { day: "الجمعة", focus: "Full Body", details: "جلسة تجميعية", exercises: "Goblet Squat, Push Up, Row, Core" },
  ],
  fatloss: [
    { day: "السبت", focus: "قوة علوي", details: "مقاومة مع نبض متوسط", exercises: "Bench Press, Row, Shoulder Press, Curl" },
    { day: "الأحد", focus: "كارديو", details: "30-40 دقيقة", exercises: "Incline Walk, Bike" },
    { day: "الاثنين", focus: "قوة سفلي", details: "رجل + كور", exercises: "Squat, RDL, Lunges, Plank" },
    { day: "الثلاثاء", focus: "HIIT", details: "فترات قصيرة عالية الشدة", exercises: "Bike Sprint, Jump Rope" },
    { day: "الأربعاء", focus: "Full Body", details: "دورة تمارين", exercises: "Kettlebell Squat, Push Up, Row, Mountain Climbers" },
    { day: "الخميس", focus: "كارديو", details: "LISS", exercises: "Walk, Stairmaster" },
    { day: "الجمعة", focus: "راحة", details: "استشفاء", exercises: "Mobility, Stretching" },
  ],
};

const defaultProfile = {
  age: 25,
  weight: 78,
  height: 178,
  gender: "male",
  activity: "moderate",
  goal: "maintain",
};

const demoSupplements = [
  { id: 1, name: "Creatine", dose: "5g", time: "08:00" },
  { id: 2, name: "Whey Protein", dose: "1 scoop", time: "17:30" },
];

const demoHistory = [
  { id: 1, date: "2026-04-05", exercise: "Bench Press", weight: 70, reps: 8 },
  { id: 2, date: "2026-04-10", exercise: "Bench Press", weight: 72.5, reps: 8 },
  { id: 3, date: "2026-04-16", exercise: "Bench Press", weight: 75, reps: 6 },
  { id: 4, date: "2026-04-22", exercise: "Bench Press", weight: 77.5, reps: 6 },
];

const storageKeys = {
  currentUser: "fitness-current-user",
  userData: "fitness-user-data",
  legacyProfile: "fitness-profile",
  legacySupplements: "fitness-supplements",
  legacyHistory: "fitness-history",
  legacyProgramType: "fitness-program-type",
  legacySelectedMeals: "fitness-selected-meals",
};

const state = {
  currentUser: loadFromStorage(storageKeys.currentUser, null),
  userData: loadFromStorage(storageKeys.userData, {}),
  profile: { ...defaultProfile },
  supplements: [],
  history: [],
  programType: "pushpulllegs",
  selectedMeals: {},
  bodyMetrics: [],
  waterIntake: 0,
};

const profileFields = ["age", "weight", "height", "gender", "activity", "goal"];
const numberFormatter = new Intl.NumberFormat("ar-EG");

function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function createEmptyWorkspace() {
  return {
    profile: { ...defaultProfile },
    supplements: [],
    history: [],
    programType: "pushpulllegs",
    selectedMeals: {},
    bodyMetrics: [],
    waterIntake: 0,
  };
}

function normalizeWorkspace(raw) {
  const workspace = raw || {};
  return {
    profile: { ...defaultProfile, ...(workspace.profile || {}) },
    supplements: Array.isArray(workspace.supplements) ? workspace.supplements : [],
    history: Array.isArray(workspace.history) ? workspace.history : [],
    programType: workspace.programType || "pushpulllegs",
    selectedMeals: workspace.selectedMeals && typeof workspace.selectedMeals === "object" ? workspace.selectedMeals : {},
    bodyMetrics: Array.isArray(workspace.bodyMetrics) ? workspace.bodyMetrics : [],
    waterIntake: Number(workspace.waterIntake) || 0,
  };
}

function snapshotWorkspace() {
  return {
    profile: { ...state.profile },
    supplements: clone(state.supplements),
    history: clone(state.history),
    programType: state.programType,
    selectedMeals: { ...state.selectedMeals },
    bodyMetrics: clone(state.bodyMetrics),
    waterIntake: state.waterIntake,
  };
}

function loadLegacyWorkspace() {
  return normalizeWorkspace({
    profile: loadFromStorage(storageKeys.legacyProfile, defaultProfile),
    supplements: loadFromStorage(storageKeys.legacySupplements, []),
    history: loadFromStorage(storageKeys.legacyHistory, []),
    programType: loadFromStorage(storageKeys.legacyProgramType, "pushpulllegs"),
    selectedMeals: loadFromStorage(storageKeys.legacySelectedMeals, {}),
  });
}

function applyWorkspace(workspace) {
  const normalized = normalizeWorkspace(workspace);
  state.profile = normalized.profile;
  state.supplements = normalized.supplements;
  state.history = normalized.history;
  state.programType = normalized.programType;
  state.selectedMeals = normalized.selectedMeals;
  state.bodyMetrics = normalized.bodyMetrics;
  state.waterIntake = normalized.waterIntake;
}

function saveToStorage() {
  if (state.currentUser) {
    state.userData[state.currentUser.id] = snapshotWorkspace();
  }

  localStorage.setItem(storageKeys.currentUser, JSON.stringify(state.currentUser));
  localStorage.setItem(storageKeys.userData, JSON.stringify(state.userData));
}

function loadWorkspaceForCurrentUser() {
  if (!state.currentUser) {
    applyWorkspace(createEmptyWorkspace());
    return;
  }

  const stored = state.userData[state.currentUser.id];
  if (stored) {
    applyWorkspace(stored);
    return;
  }

  const legacyWorkspace = loadLegacyWorkspace();
  const hasLegacyData =
    (Array.isArray(legacyWorkspace.history) && legacyWorkspace.history.length > 0) ||
    (Array.isArray(legacyWorkspace.supplements) && legacyWorkspace.supplements.length > 0);

  const workspace = hasLegacyData ? legacyWorkspace : createEmptyWorkspace();
  state.userData[state.currentUser.id] = workspace;
  applyWorkspace(workspace);
  saveToStorage();
}

function redirectToLogin() {
  location.replace("./login.html");
}

function ensureAuthenticated() {
  if (!state.currentUser) {
    redirectToLogin();
    return false;
  }

  return true;
}

function $(id) {
  return document.getElementById(id);
}

function formatNumber(value) {
  return numberFormatter.format(Math.round(Number(value) * 10) / 10);
}

function formatDate(value) {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "-";
  return parsed.toLocaleDateString("ar-EG", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function todayDateValue() {
  return new Date().toISOString().slice(0, 10);
}

function computeMacros(profile) {
  const age = Number(profile.age) || 0;
  const weight = Number(profile.weight) || 0;
  const height = Number(profile.height) || 0;
  const activity = activityLevels[profile.activity] || activityLevels.moderate;
  const goal = goals[profile.goal] || goals.maintain;
  const bmrBase = 10 * weight + 6.25 * height - 5 * age;
  const bmr = profile.gender === "male" ? bmrBase + 5 : bmrBase - 161;
  const maintenance = bmr * activity.multiplier;
  const calories = Math.round(maintenance + goal.caloriesOffset);
  const protein = Math.round(weight * goal.protein);
  const fat = Math.round(weight * goal.fat);
  const carbs = Math.max(0, Math.round((calories - protein * 4 - fat * 9) / 4));
  return { calories, protein, carbs, fat };
}

function minutesUntil(time) {
  const [hours, minutes] = String(time).split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  let target = hours * 60 + minutes - current;
  if (target < 0) target += 24 * 60;
  return target;
}

function getGoalLabel(goal) {
  return (goals[goal] || goals.maintain).label;
}

function getActivityLabel(activity) {
  return (activityLevels[activity] || activityLevels.moderate).label;
}

function mealPlanFromMacros(macros) {
  const fallback = {
    breakfast: "شوفان + لبن + موز + 3 بيضات",
    snack1: "زبادي يوناني + عسل + مكسرات",
    lunch: "أرز أو بطاطس + صدر دجاج أو لحم + سلطة",
    workout: "موز + Whey Protein أو تونة + توست",
    dinner: "جبنة قريش أو تونة + خبز أو أرز + خضار",
  };

  return [
    { key: "breakfast", meal: "الفطور", foods: state.selectedMeals.breakfast || fallback.breakfast, target: `${formatNumber(macros.calories * 0.25)} سعرة` },
    { key: "snack1", meal: "سناك 1", foods: state.selectedMeals.snack1 || fallback.snack1, target: `${formatNumber(macros.protein * 0.18)} جم بروتين` },
    { key: "lunch", meal: "الغداء", foods: state.selectedMeals.lunch || fallback.lunch, target: `${formatNumber(macros.calories * 0.35)} سعرة` },
    { key: "workout", meal: "قبل/بعد التمرين", foods: state.selectedMeals.workout || fallback.workout, target: `${formatNumber(macros.carbs * 0.25)} جم كارب` },
    { key: "dinner", meal: "العشاء", foods: state.selectedMeals.dinner || fallback.dinner, target: `${formatNumber(macros.fat * 0.28)} جم دهون` },
  ];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function refreshDashboard() {
  hydrateProfileFieldsValues();
  $("currentUserName").textContent = state.currentUser ? `مرحبًا، ${state.currentUser.name}` : "";
  $("programType").value = state.programType;
  renderMacros();
  renderSupplements();
  renderTrainingPlan();
  renderHistory();
  renderBodyMetrics();
  updateWaterUI();
  updateExercisePresets($("exerciseCategory").value);
  updateMealChoices($("mealSlot").value);
}

function handleLogout() {
  saveToStorage();
  state.currentUser = null;
  localStorage.setItem(storageKeys.currentUser, JSON.stringify(null));
  redirectToLogin();
}

function renderMacros() {
  const results = computeMacros(state.profile);
  const goalLabel = getGoalLabel(state.profile.goal);
  const activityLabel = getActivityLabel(state.profile.activity);

  $("caloriesValue").textContent = formatNumber(results.calories);
  $("proteinValue").textContent = formatNumber(results.protein);
  $("carbsValue").textContent = formatNumber(results.carbs);
  $("fatValue").textContent = formatNumber(results.fat);
  $("statCalories").textContent = formatNumber(results.calories);
  $("summaryProtein").textContent = `${formatNumber(results.protein)} جم يوميًا لدعم البناء العضلي والاستشفاء.`;
  $("summaryCarbs").textContent = `${formatNumber(results.carbs)} جم لتغذية الأداء والطاقة أثناء التمرين.`;
  $("summaryFat").textContent = `${formatNumber(results.fat)} جم للتوازن الهرموني والشبع خلال اليوم.`;
  $("summaryGoal").textContent = `هدفك الحالي ${goalLabel} مع ${activityLabel} يحتاج تقريبًا ${formatNumber(results.calories)} سعرة يوميًا.`;

  renderMealPlan(results);
}

function renderSupplements() {
  const list = $("supplementList");
  $("statSupps").textContent = formatNumber(state.supplements.length);

  if (!state.supplements.length) {
    $("summarySuppTime").textContent = "لا توجد مواعيد مكملات مسجلة حتى الآن.";
    list.innerHTML = '<div class="empty">أضف أول مكمل ليظهر هنا مع أقرب موعد قادم.</div>';
    return;
  }

  const sorted = [...state.supplements]
    .map((item) => ({ ...item, diff: minutesUntil(item.time) }))
    .sort((a, b) => (a.diff ?? Infinity) - (b.diff ?? Infinity));

  const nextSupplement = sorted[0];
  $("summarySuppTime").textContent = nextSupplement.diff !== null
    ? `${nextSupplement.name} خلال ${formatNumber(nextSupplement.diff)} دقيقة تقريبًا.`
    : `${nextSupplement.name} في الساعة ${nextSupplement.time}.`;

  list.innerHTML = sorted.map((item) => `
    <div class="supp-item">
      <div>
        <strong>${escapeHtml(item.name)}</strong>
        <div class="supp-meta">${escapeHtml(item.dose)} • ${escapeHtml(item.time)}</div>
      </div>
      <div class="record-actions">
        <div class="pill ${item.diff !== null && item.diff <= 60 ? "pill-soon" : "pill-ok"}">
          ${item.diff !== null && item.diff <= 60 ? `بعد ${formatNumber(item.diff)} د` : "مجدول"}
        </div>
        <button class="icon-btn" type="button" data-delete-supplement="${item.id}">حذف</button>
      </div>
    </div>
  `).join("");
}

function renderHistory() {
  const list = $("historyList");
  const strongest = state.history.length ? Math.max(...state.history.map((item) => Number(item.weight) || 0)) : 0;
  $("statStrongest").textContent = `${formatNumber(strongest)} كجم`;
  $("statSessions").textContent = formatNumber(state.history.length);

  if (!state.history.length) {
    $("summaryWorkout").textContent = "أضف أول جلسة لتبدأ متابعة التقدم والرسم البياني.";
    list.innerHTML = '<div class="empty">لا توجد سجلات تمارين بعد. ابدأ بإضافة أول جلسة لك.</div>';
    drawChart([]);
    return;
  }

  const sortedDesc = [...state.history].sort((a, b) => new Date(b.date) - new Date(a.date));
  const latest = sortedDesc[0];
  $("summaryWorkout").textContent = `آخر تسجيل كان ${latest.exercise} بوزن ${formatNumber(latest.weight)} كجم و${formatNumber(latest.reps)} عدات.`;

  list.innerHTML = sortedDesc.map((item) => `
    <div class="history-item">
      <div>
        <strong>${escapeHtml(item.exercise)}</strong>
        <div class="history-meta">${formatDate(item.date)} • ${formatNumber(item.reps)} عدات</div>
      </div>
      <div class="record-actions">
        <span class="mini-tag">${formatNumber(item.weight)} كجم</span>
        <button class="icon-btn" type="button" data-delete-history="${item.id}">حذف</button>
      </div>
    </div>
  `).join("");

  drawChart([...state.history].sort((a, b) => new Date(a.date) - new Date(b.date)));
}

function renderBodyMetrics() {
  const list = $("metricsList");
  if (!state.bodyMetrics.length) {
    list.innerHTML = '<div class="empty">لا توجد قياسات مسجلة بعد.</div>';
    return;
  }

  const sorted = [...state.bodyMetrics].sort((a, b) => new Date(b.date) - new Date(a.date));
  list.innerHTML = sorted.map((item) => `
    <div class="history-item">
      <div>
        <strong>${formatDate(item.date)}</strong>
        <div class="history-meta">${item.weight} كجم • ${item.bodyFat}% دهون</div>
      </div>
      <div class="record-actions">
        <span class="mini-tag">${item.waist} سم خصر</span>
        <button class="icon-btn" type="button" data-delete-metric="${item.id}">حذف</button>
      </div>
    </div>
  `).join("");
}

function updateWaterUI() {
  const target = 3;
  const current = state.waterIntake / 1000;
  const percentage = Math.min((current / target) * 100, 100);

  $("waterTotal").textContent = current.toFixed(2);
  $("waterProgress").style.width = `${percentage}%`;
}

function translateCategory(value) {
  const labels = {
    chest: "صدر",
    back: "ظهر",
    shoulders: "أكتاف",
    legs: "رجل",
    arms: "ذراع",
    abs: "بطن وكور",
    glutes: "مؤخرة",
    cardio: "كارديو",
    fullbody: "جسم كامل",
  };
  return labels[value] || value;
}

function exerciseHint(name) {
  const hints = {
    "Bench Press": "تمرين أساسي لبناء القوة في الصدر.",
    "Incline Dumbbell Press": "يركز بشكل أكبر على الجزء العلوي من الصدر.",
    "Decline Press": "يفعّل الجزء السفلي من الصدر.",
    "Lat Pulldown": "ممتاز لتوسيع الظهر وتحسين السحب العمودي.",
    "Deadlift": "تمرين شامل لبناء السلسلة الخلفية والقوة العامة.",
    "Shoulder Press": "يبني الكتف الأمامي والجانبي بصورة ممتازة.",
    "Squat": "من أقوى تمارين الرجل والقوة الأساسية.",
    "Hip Thrust": "خيار قوي لتفعيل المؤخرة والعضلات الخلفية.",
  };
  return hints[name] || "يمكنك استخدامه مباشرة في سجل الأداء إذا كان مناسبًا ليومك التدريبي.";
}

function renderExerciseSelectors() {
  const categorySelect = $("exerciseCategory");
  const categories = Object.keys(exerciseOptions);
  categorySelect.innerHTML = categories.map((key) => `<option value="${key}">${translateCategory(key)}</option>`).join("");
  updateExercisePresets(categorySelect.value || categories[0]);
  categorySelect.addEventListener("change", () => updateExercisePresets(categorySelect.value));
}

function updateExercisePresets(category) {
  const presetSelect = $("exercisePreset");
  const exercises = exerciseOptions[category] || [];
  presetSelect.innerHTML = exercises.map((exercise) => `<option value="${escapeHtml(exercise)}">${escapeHtml(exercise)}</option>`).join("");
  renderExerciseLibrary();
}

function renderExerciseLibrary() {
  const category = $("exerciseCategory").value;
  const list = exerciseOptions[category] || [];
  $("exerciseLibrary").innerHTML = list.map((item) => `
    <div class="option-card">
      <strong>${escapeHtml(item)}</strong>
      <p>${exerciseHint(item)}</p>
    </div>
  `).join("");
}

function renderTrainingPlan() {
  const template = programTemplates[state.programType] || programTemplates.pushpulllegs;
  $("trainingPlan").innerHTML = template.map((item) => `
    <div class="option-card">
      <div class="split-line">
        <strong>${item.day}</strong>
        <span class="tag">${escapeHtml(item.focus)}</span>
      </div>
      <p>${escapeHtml(item.details)}</p>
      <small>${escapeHtml(item.exercises)}</small>
    </div>
  `).join("");
}

function renderMealSelectors() {
  const slotSelect = $("mealSlot");
  slotSelect.innerHTML = Object.entries(mealSlotLabels).map(([key, label]) => `<option value="${key}">${label}</option>`).join("");
  updateMealChoices(slotSelect.value || "breakfast");
  slotSelect.addEventListener("change", () => updateMealChoices(slotSelect.value));
}

function updateMealChoices(slot) {
  const choiceSelect = $("mealChoice");
  const choices = mealChoicesData[slot] || [];
  choiceSelect.innerHTML = choices.map((item) => `<option value="${escapeHtml(item)}">${escapeHtml(item)}</option>`).join("");
}

function renderMealPlan(macros) {
  const meals = mealPlanFromMacros(macros);
  $("mealPlan").innerHTML = meals.map((item) => `
    <div class="meal-card">
      <div class="split-line">
        <strong>${item.meal}</strong>
        <span class="tag">${item.target}</span>
      </div>
      <p>${escapeHtml(item.foods)}</p>
    </div>
  `).join("");
}

function drawChart(points) {
  const canvas = $("progressChart");
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const padding = 54;

  ctx.clearRect(0, 0, width, height);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(23, 33, 31, 0.08)";
  ctx.lineWidth = 1;
  for (let index = 0; index < 5; index += 1) {
    const y = padding + ((height - padding * 2) / 4) * index;
    ctx.beginPath();
    ctx.moveTo(padding, y);
    ctx.lineTo(width - padding, y);
    ctx.stroke();
  }

  if (!points.length) {
    ctx.fillStyle = "#73817c";
    ctx.font = "600 18px Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("لا توجد بيانات كافية لعرض الرسم البياني بعد", width / 2, height / 2);
    return;
  }

  const weights = points.map((point) => Number(point.weight));
  const minWeight = Math.min(...weights);
  const maxWeight = Math.max(...weights);
  const range = Math.max(maxWeight - minWeight, 1);
  const stepX = points.length > 1 ? (width - padding * 2) / (points.length - 1) : 0;

  ctx.beginPath();
  points.forEach((point, index) => {
    const x = padding + stepX * index;
    const normalized = (Number(point.weight) - minWeight) / range;
    const y = height - padding - normalized * (height - padding * 2);
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  });
  ctx.strokeStyle = "rgba(15, 139, 109, 0.18)";
  ctx.lineWidth = 10;
  ctx.stroke();

  ctx.strokeStyle = "#0f8b6d";
  ctx.lineWidth = 4;
  ctx.stroke();

  points.forEach((point, index) => {
    const x = padding + stepX * index;
    const normalized = (Number(point.weight) - minWeight) / range;
    const y = height - padding - normalized * (height - padding * 2);

    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#0f8b6d";
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = "#17211f";
    ctx.font = "700 12px Space Grotesk, Cairo, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(formatNumber(point.weight), x, y - 14);
  });
}

function hydrateProfileFieldsValues() {
  profileFields.forEach((field) => {
    $(field).value = state.profile[field];
  });
}

function bindProfileFields() {
  profileFields.forEach((field) => {
    const sync = () => {
      state.profile[field] = $(field).value;
      saveToStorage();
      renderMacros();
    };
    $(field).addEventListener("input", sync);
    $(field).addEventListener("change", sync);
  });
}

function bindSession() {
  $("logoutBtn").addEventListener("click", handleLogout);
}

function bindSupplementDelete() {
  $("supplementList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-supplement]");
    if (!button) return;
    const id = Number(button.dataset.deleteSupplement);
    state.supplements = state.supplements.filter((item) => item.id !== id);
    saveToStorage();
    renderSupplements();
  });
}

function bindHistoryDelete() {
  $("historyList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-history]");
    if (!button) return;
    const id = Number(button.dataset.deleteHistory);
    state.history = state.history.filter((item) => item.id !== id);
    saveToStorage();
    renderHistory();
  });
}

function bindForms() {
  $("supplementForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const name = $("suppName").value.trim();
    const dose = $("suppDose").value.trim();
    const time = $("suppTime").value;

    if (!name || !dose || !time) {
      return;
    }

    state.supplements.push({ id: Date.now(), name, dose, time });
    saveToStorage();
    renderSupplements();
    $("supplementForm").reset();
    $("suppTime").value = "08:00";
  });

  $("workoutForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const date = $("workoutDate").value;
    const exercise = $("workoutExercise").value.trim();
    const weight = Number($("workoutWeight").value);
    const reps = Number($("workoutReps").value);

    if (!date || !exercise || !weight || !reps) {
      return;
    }

    state.history.push({ id: Date.now(), date, exercise, weight, reps });
    saveToStorage();
    renderHistory();
    $("workoutForm").reset();
    $("workoutDate").value = todayDateValue();
  });

  $("restoreDemo").addEventListener("click", () => {
    state.history = clone(demoHistory);
    if (!state.supplements.length) {
      state.supplements = clone(demoSupplements);
    }
    saveToStorage();
    renderSupplements();
    renderHistory();
  });

  $("clearHistory").addEventListener("click", () => {
    state.history = [];
    saveToStorage();
    renderHistory();
  });

  $("programType").addEventListener("change", () => {
    state.programType = $("programType").value;
    saveToStorage();
    renderTrainingPlan();
  });

  $("fillExercise").addEventListener("click", () => {
    $("workoutExercise").value = $("exercisePreset").value;
    $("workoutDate").focus();
  });

  $("applyMealChoice").addEventListener("click", () => {
    const slot = $("mealSlot").value;
    const choice = $("mealChoice").value;
    state.selectedMeals[slot] = choice;
    saveToStorage();
    renderMacros();
  });

  $("resetMeals").addEventListener("click", () => {
    state.selectedMeals = {};
    saveToStorage();
    renderMacros();
  });

  $("metricsForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const weight = $("metricWeight").value;
    const bodyFat = $("metricBodyFat").value;
    const waist = $("metricWaist").value;
    const date = $("metricDate").value || todayDateValue();

    if (!weight) return;

    state.bodyMetrics.push({ id: Date.now(), weight, bodyFat, waist, date });
    saveToStorage();
    renderBodyMetrics();
    $("metricsForm").reset();
    $("metricDate").value = todayDateValue();
  });

  $("metricsList").addEventListener("click", (event) => {
    const button = event.target.closest("[data-delete-metric]");
    if (!button) return;
    const id = Number(button.dataset.deleteMetric);
    state.bodyMetrics = state.bodyMetrics.filter((item) => item.id !== id);
    saveToStorage();
    renderBodyMetrics();
  });

  $("addWaterSmall").addEventListener("click", () => {
    state.waterIntake += 250;
    saveToStorage();
    updateWaterUI();
  });

  $("addWaterLarge").addEventListener("click", () => {
    state.waterIntake += 500;
    saveToStorage();
    updateWaterUI();
  });

  $("resetWater").addEventListener("click", () => {
    state.waterIntake = 0;
    saveToStorage();
    updateWaterUI();
  });
}

function setInitialFormValues() {
  $("workoutDate").value = todayDateValue();
  $("metricDate").value = todayDateValue();
  $("suppTime").value = "08:00";
}

function init() {
  if (!ensureAuthenticated()) {
    return;
  }

  bindSession();
  bindProfileFields();
  bindForms();
  bindSupplementDelete();
  bindHistoryDelete();
  renderExerciseSelectors();
  renderMealSelectors();
  setInitialFormValues();
  loadWorkspaceForCurrentUser();
  refreshDashboard();
}

init();
