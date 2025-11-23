import { STATE } from "./core.js";

export function setAgeFilter({ min, max }) {
  STATE.ageMin = min ?? null;
  STATE.ageMax = max ?? null;
}

export function setAgeFilterBounds({ min, max }) {
  STATE.ageMin = min ?? null;
  STATE.ageMax = max ?? null;
}

export function ensureSortState() {
  if (!STATE.sort) {
    STATE.sort = { lastName: null, age: null };
  }

  return STATE.sort;
}

export function setSortKey(key, direction) {
  const sort = ensureSortState();
  sort[key] = direction;
}


