import { setupControls } from "./dom.js";
import { initAgeFilter } from "./ageFilter.js";
import { initTableSorting } from "./tableSort.js";
import { loadUsers } from "./api.js";

async function loadLayout() {
  const toolbarRoot = document.getElementById("usersToolbarRoot");
  const listRoot = document.getElementById("usersListRoot");

  if (!toolbarRoot || !listRoot) {
    return;
  }

  try {
    const [toolbarResponse, listResponse] = await Promise.all([
      fetch("components/users-toolbar.html"),
      fetch("components/users-list.html"),
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

document.addEventListener("DOMContentLoaded", async () => {
  await loadLayout();

  // Инициализируем lucide icons
  if (window.lucide && typeof window.lucide.createIcons === "function") {
    window.lucide.createIcons();
  }

  setupControls();
  initAgeFilter();
  initTableSorting();
  loadUsers();
});
