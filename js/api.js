import { loadUsersFromStorage } from "./features/users/state/storage.js";
import { setUsers } from "./features/users/state/users.js";
import { setAgeFilterBounds } from "./features/users/state/filters.js";
import { PATHS } from "./config/constants.js";

function computeAgeBounds(users) {
  if (!Array.isArray(users) || users.length === 0) {
    return { minAge: null, maxAge: null };
  }

  const ages = users
    .map((u) => Number(u.age))
    .filter((age) => Number.isFinite(age));

  if (ages.length === 0) {
    return { minAge: null, maxAge: null };
  }

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  return { minAge, maxAge };
}

export async function loadUsers() {
  const stored = loadUsersFromStorage();
  if (stored) {
    setUsers(stored, { persist: false });
    const { minAge, maxAge } = computeAgeBounds(stored);
    if (minAge != null && maxAge != null) {
      setAgeFilterBounds({ min: minAge, max: maxAge });
    }
    return { bounds: { minAge, maxAge } };
  }

  try {
    const response = await fetch(PATHS.usersJson);
    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    const data = await response.json();
    if (!Array.isArray(data)) {
      throw new Error("users format is invalid");
    }

    setUsers(data);
    const { minAge, maxAge } = computeAgeBounds(data);
    if (minAge != null && maxAge != null) {
      setAgeFilterBounds({ min: minAge, max: maxAge });
    }
    return { bounds: { minAge, maxAge } };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
