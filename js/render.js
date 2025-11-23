import { getElements } from "./dom.js";
import { getPreparedUsers } from "./dataProcessing.js";
import { STATE, saveUsersToStorage } from "./state.js";
import { createAvatarCell } from "./components/avatar.js";

function handleUserPhotoChange(userId, photoUrl) {
  STATE.users = STATE.users.map((user) =>
    user.id === userId ? { ...user, photoUrl } : user
  );
  saveUsersToStorage(STATE.users);
  render();
}

function createTextCell(value) {
  const td = document.createElement("td");
  td.textContent = value ?? "";
  return td;
}

export function render() {
  const { tbody, emptyState } = getElements();
  if (!tbody || !emptyState) return;

  tbody.innerHTML = "";
  const users = getPreparedUsers();

  if (users.length === 0) {
    emptyState.hidden = false;
    return;
  }

  emptyState.hidden = true;

  users.forEach((user) => {
    const tr = document.createElement("tr");

    // Фото
    tr.appendChild(
      createAvatarCell(user, {
        onPhotoChange: (photoUrl) => handleUserPhotoChange(user.id, photoUrl),
        onPhotoRemove: () => handleUserPhotoChange(user.id, null),
      })
    );

    // Имя
    tr.appendChild(createTextCell(user.firstName));

    // Фамилия
    tr.appendChild(createTextCell(user.lastName));

    // Возраст
    tr.appendChild(createTextCell(user.age != null ? String(user.age) : ""));

    // Email
    tr.appendChild(createTextCell(user.email));

    tbody.appendChild(tr);
  });
}
