import { STATE } from "./state.js";
import { render } from "./render.js";
import { createRangeSlider } from "./components/range/range.js";

let ageRangeInstance = null;

export function initAgeFilter() {
  const minInput = document.getElementById("ageRangeMin");
  const maxInput = document.getElementById("ageRangeMax");
  const progressElement = document.getElementById("ageRangeProgress");
  const valueMinElement = document.getElementById("ageRangeValueMin");
  const valueMaxElement = document.getElementById("ageRangeValueMax");

  ageRangeInstance = createRangeSlider({
    minInput,
    maxInput,
    progressElement,
    valueMinElement,
    valueMaxElement,
    onInput: ({ min, max }) => {
      STATE.ageMin = min;
      STATE.ageMax = max;
    },
    onChange: ({ min, max }) => {
      STATE.ageMin = min;
      STATE.ageMax = max;
      render();
    },
  });
}

export function setAgeFilterBoundsFromUsers(users) {
  if (!ageRangeInstance || !Array.isArray(users) || users.length === 0) {
    return;
  }

  const ages = users
    .map((u) => Number(u.age))
    .filter((age) => Number.isFinite(age));

  if (ages.length === 0) return;

  const minAge = Math.min(...ages);
  const maxAge = Math.max(...ages);

  ageRangeInstance.setBounds(minAge, maxAge);
  ageRangeInstance.setValues(minAge, maxAge);

  STATE.ageMin = minAge;
  STATE.ageMax = maxAge;
}

