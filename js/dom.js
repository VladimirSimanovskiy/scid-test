import { DOM_IDS } from "./config/constants.js";

export function getElements() {
  return {
    tbody: document.getElementById(DOM_IDS.usersTableBody),
    emptyState: document.getElementById(DOM_IDS.emptyState),
  };
}