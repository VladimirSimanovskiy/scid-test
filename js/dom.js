import { STATE } from "./state.js";
import { render } from "./render.js";

export function getElements() {
  return {
    tbody: document.getElementById("usersTableBody"),
    emptyState: document.getElementById("emptyState"),
    ageFilter: document.getElementById("ageFilter"),
    sortSelect: document.getElementById("sortSelect"),
  };
}

export function setupControls() {
  const { ageFilter, sortSelect } = getElements();

  if (ageFilter) {
    ageFilter.addEventListener("change", (event) => {
      STATE.filterAdultsOnly = Boolean(event.target.checked);
      render();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (event) => {
      STATE.sortBy = event.target.value;
      render();
    });
  }
}
