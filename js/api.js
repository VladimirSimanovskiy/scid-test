import { STATE, loadUsersFromStorage, saveUsersToStorage } from "./state.js";
import { render } from "./render.js";
import { setAgeFilterBoundsFromUsers } from "./ageFilter.js";

export async function loadUsers() {
  const stored = loadUsersFromStorage();
  if (stored) {
    STATE.users = stored;
    setAgeFilterBoundsFromUsers(STATE.users);
    render();
    return;
  }

  try {
    const response = await fetch("users.json");
    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("users format is invalid");
    }

    STATE.users = data;
    saveUsersToStorage(STATE.users);
    setAgeFilterBoundsFromUsers(STATE.users);
    render();
  } catch (error) {
    console.error(error);
    const emptyState = document.getElementById("emptyState");
    if (emptyState) {
      emptyState.hidden = false;
      emptyState.textContent = "Не удалось загрузить список пользователей.";
    }
  }
}
