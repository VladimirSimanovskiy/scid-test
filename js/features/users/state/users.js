import { STATE } from "./core.js";
import { saveUsersToStorage } from "./storage.js";

export function setUsers(users, { persist = true } = {}) {
  STATE.users = Array.isArray(users) ? users : [];

  if (persist) {
    saveUsersToStorage(STATE.users);
  }
}

export function updateUserPhoto(userId, photoUrl) {
  STATE.users = STATE.users.map((user) =>
    user.id === userId ? { ...user, photoUrl } : user
  );

  saveUsersToStorage(STATE.users);
}


