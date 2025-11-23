import { initAgeFilter, setAgeFilterBoundsOnUI } from "./features/users/ageFilter.js";
import { initTableSorting } from "./features/users/tableSort.js";
import { setAgeFilter, ensureSortState, setSortKey } from "./features/users/state/filters.js";
import { render } from "./features/users/render.js";
import { DOM_IDS, PATHS } from "./config/constants.js";
import { loadUsers } from "./api.js";

async function loadLayout() {
  const toolbarRoot = document.getElementById(DOM_IDS.usersToolbarRoot);
  const listRoot = document.getElementById(DOM_IDS.usersListRoot);

  if (!toolbarRoot || !listRoot) {
    return;
  }

  try {
    const [toolbarResponse, listResponse] = await Promise.all([
      fetch(PATHS.usersToolbarLayout),
      fetch(PATHS.usersListLayout),
    ]);

    const [toolbarHtml, listHtml] = await Promise.all([
      toolbarResponse.text(),
      listResponse.text(),
    ]);

    toolbarRoot.innerHTML = toolbarHtml;
    listRoot.innerHTML = listHtml;
  } catch (error) {
    console.error("Не удалось загрузить layout компонентов:", error);
  }
}

function getSortDirection(key) {
  const sort = ensureSortState();
  return sort[key] ?? null;
}

function toggleSort(key) {
  const current = getSortDirection(key);
  let next;
  if (current === null) next = "asc";
  else if (current === "asc") next = "desc";
  else next = null;

  setSortKey(key, next);
}

function showLoadError() {
  const emptyState = document.getElementById(DOM_IDS.emptyState);
  if (emptyState) {
    emptyState.hidden = false;
    emptyState.textContent = "Не удалось загрузить список пользователей.";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();

  // Инициализируем lucide icons
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  initAgeFilter({
    onFilterInput: ({ min, max }) => {
      setAgeFilter({ min, max });
    },
    onFilterChange: ({ min, max }) => {
      setAgeFilter({ min, max });
      render();
    },
  });
  initTableSorting({
    getSortDirection,
    onToggleSort: (key) => {
      toggleSort(key);
      render();
    },
  });

  try {
    const result = await loadUsers();
    const bounds = result?.bounds;
    if (bounds && bounds.minAge != null && bounds.maxAge != null) {
      setAgeFilterBoundsOnUI(bounds.minAge, bounds.maxAge);
    }
    render();
  } catch {
    showLoadError();
  }
});
