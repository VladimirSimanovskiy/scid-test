import { getElements } from "../../dom.js";
import { getPreparedUsers } from "./dataProcessing.js";
import { STATE } from "./state/core.js";
import { updateUserPhoto } from "./state/users.js";
import { createAvatarCell } from "../../components/avatar/avatar.js";

function handleUserPhotoChange(userId, photoUrl) {
  updateUserPhoto(userId, photoUrl);
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
  const users = getPreparedUsers(STATE.users, {
    ageMin: STATE.ageMin,
    ageMax: STATE.ageMax,
    sort: STATE.sort,
  });

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

    // Фамилия
    tr.appendChild(createTextCell(user.lastName));

    // Имя
    tr.appendChild(createTextCell(user.firstName));

    // Возраст
    tr.appendChild(createTextCell(user.age != null ? String(user.age) : ""));

    // Email
    tr.appendChild(createTextCell(user.email));

    tr.setAttribute("data-user-id", String(user.id));

    tbody.appendChild(tr);
  });
}


