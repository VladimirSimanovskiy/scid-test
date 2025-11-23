export function createAvatarCell(user, { onPhotoChange, onPhotoRemove }) {
  const td = document.createElement("td");
  const wrapper = document.createElement("div");
  wrapper.className = "avatar";

  const content = document.createElement("div");
  content.className = "avatar__content";

  if (user.photoUrl) {
    const img = document.createElement("img");
    img.className = "avatar__image";
    img.src = user.photoUrl;
    img.alt = `${user.firstName} ${user.lastName}`;
    content.appendChild(img);
  } else {
    const placeholder = createDefaultAvatarContent(user);
    content.appendChild(placeholder);
  }

  const fileInput = createAvatarFileInput(onPhotoChange);
  const overlay = createAvatarActions({
    onUploadClick: () => fileInput.click(),
    onRemoveClick: onPhotoRemove,
  });

  wrapper.appendChild(content);
  wrapper.appendChild(overlay);
  wrapper.appendChild(fileInput);

  td.appendChild(wrapper);
  return td;
}

function createDefaultAvatarContent(user) {
  const placeholder = document.createElement("div");
  placeholder.className = "avatar__placeholder";

  const span = document.createElement("span");
  span.className = "avatar__initials";

  const firstInitial = user.firstName?.[0] || "";
  const lastInitial = user.lastName?.[0] || "";
  span.textContent = `${firstInitial}${lastInitial}`.toUpperCase();

  placeholder.appendChild(span);
  return placeholder;
}

function createAvatarFileInput(onPhotoChange) {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.className = "avatar__file-input";

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result;
      if (typeof result === "string") {
        onPhotoChange(result);
      }
    };
    reader.readAsDataURL(file);
  });

  return fileInput;
}

function createAvatarActions({ onUploadClick, onRemoveClick }) {
  const overlay = document.createElement("div");
  overlay.className = "avatar__overlay";

  const uploadIcon = document.createElement("button");
  uploadIcon.type = "button";
  uploadIcon.className = "avatar__icon avatar__icon--upload";
  uploadIcon.title = "Загрузить фото";

  const removeIcon = document.createElement("button");
  removeIcon.type = "button";
  removeIcon.className = "avatar__icon avatar__icon--remove";
  removeIcon.title = "Удалить фото";

  overlay.appendChild(uploadIcon);
  overlay.appendChild(removeIcon);

  uploadIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    onUploadClick();
  });

  removeIcon.addEventListener("click", (event) => {
    event.stopPropagation();
    onRemoveClick();
  });

  return overlay;
}
