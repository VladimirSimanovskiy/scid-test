import { createRangeSlider } from "../../components/range/range.js";
import { DOM_IDS } from "../../config/constants.js";

let ageRangeInstance = null;

export function initAgeFilter({ onFilterInput, onFilterChange } = {}) {
  const minInput = document.getElementById(DOM_IDS.ageRangeMin);
  const maxInput = document.getElementById(DOM_IDS.ageRangeMax);
  const progressElement = document.getElementById(DOM_IDS.ageRangeProgress);
  const valueMinElement = document.getElementById(DOM_IDS.ageRangeValueMin);
  const valueMaxElement = document.getElementById(DOM_IDS.ageRangeValueMax);

  ageRangeInstance = createRangeSlider({
    minInput,
    maxInput,
    progressElement,
    valueMinElement,
    valueMaxElement,
    onInput: ({ min, max }) => {
      if (typeof onFilterInput === "function") {
        onFilterInput({ min, max });
      }
    },
    onChange: ({ min, max }) => {
      if (typeof onFilterChange === "function") {
        onFilterChange({ min, max });
      }
    },
  });
}

export function setAgeFilterBoundsOnUI(minAge, maxAge) {
  if (!ageRangeInstance) {
    return;
  }

  ageRangeInstance.setBounds(minAge, maxAge);
  ageRangeInstance.setValues(minAge, maxAge);
}


