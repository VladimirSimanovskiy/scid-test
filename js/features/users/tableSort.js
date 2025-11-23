export function initTableSorting({ getSortDirection, onToggleSort } = {}) {
  const buttons = document.querySelectorAll(".table__sort-button");

  function updateSortUI() {
    buttons.forEach((button) => {
      const key = button.dataset.sortKey;
      const label = button.querySelector(".table__sort-label");
      const icon = button.querySelector(".table__sort-icon");

      if (!key || typeof getSortDirection !== "function") return;

      const direction = getSortDirection(key) ?? null;

      button.classList.remove("table__sort-button--asc", "table__sort-button--desc");

      if (direction === "asc") {
        button.classList.add("table__sort-button--asc");
        button.setAttribute("aria-sort", "ascending");
      } else if (direction === "desc") {
        button.classList.add("table__sort-button--desc");
        button.setAttribute("aria-sort", "descending");
      } else {
        button.removeAttribute("aria-sort");
      }
      if (label) {
        let tooltip = "Без сортировки";
        if (direction === "asc") tooltip = "По возрастанию";
        else if (direction === "desc") tooltip = "По убыванию";

        button.setAttribute("aria-label", `${label.textContent}: ${tooltip}`);
        button.title = tooltip;
      }

      if (icon && window.lucide && typeof window.lucide.createIcons === "function") {
        let iconName = "arrow-up-down";
        if (direction === "asc") iconName = "arrow-down-narrow-wide";
        else if (direction === "desc") iconName = "arrow-down-narrow-wide";

        if (icon.getAttribute("data-lucide") !== iconName) {
          icon.innerHTML = "";
          icon.setAttribute("data-lucide", iconName);
          window.lucide.createIcons();
        }
      }
    });
  }

  buttons.forEach((button) => {
    const key = button.dataset.sortKey;
    if (!key) return;

    button.addEventListener("click", () => {
      if (typeof onToggleSort === "function") {
        onToggleSort(key);
      }
      updateSortUI();
    });
  });

  updateSortUI();
}


