export const STATE = {
  users: [],
  sort: {
    lastName: "off",
    age: "off",
  },
  ageMin: null,
  ageMax: null,
};

const USERS_STORAGE_KEY = "users-with-photos";

export function loadUsersFromStorage() {
  try {
    const raw = localStorage.getItem(USERS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveUsersToStorage(users) {
  try {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  } catch {
    // Игнорируем ошибки сохранения (например, приватный режим)
  }
}
