export function createRangeSlider({
  minInput,
  maxInput,
  progressElement,
  valueMinElement,
  valueMaxElement,
  onInput,
  onChange,
}) {
  if (!minInput || !maxInput) {
    return null;
  }

  const parseNumber = (value) => {
    const num = Number(value);
    return Number.isFinite(num) ? num : 0;
  };

  const getBounds = () => ({
    min: parseNumber(minInput.min),
    max: parseNumber(minInput.max),
  });

  const updateUI = (eventType) => {
    let currentMin = parseNumber(minInput.value);
    let currentMax = parseNumber(maxInput.value);
    const { min: rangeMin, max: rangeMax } = getBounds();

    if (currentMin > currentMax) {
      const tmp = currentMin;
      currentMin = currentMax;
      currentMax = tmp;
      minInput.value = String(currentMin);
      maxInput.value = String(currentMax);
    }

    if (progressElement && rangeMax > rangeMin) {
      const percentMin = ((currentMin - rangeMin) / (rangeMax - rangeMin)) * 100;
      const percentMax = ((currentMax - rangeMin) / (rangeMax - rangeMin)) * 100;
      progressElement.style.left = `${percentMin}%`;
      progressElement.style.right = `${100 - percentMax}%`;
    }

    if (valueMinElement) {
      valueMinElement.textContent = String(currentMin);
    }

    if (valueMaxElement) {
      valueMaxElement.textContent = String(currentMax);
    }

    const payload = { min: currentMin, max: currentMax };

    if (eventType === "input" && typeof onInput === "function") {
      onInput(payload);
    }

    if (eventType === "change" && typeof onChange === "function") {
      onChange(payload);
    }
  };

  const handleInput = () => updateUI("input");
  const handleChange = () => updateUI("change");

  minInput.addEventListener("input", handleInput);
  maxInput.addEventListener("input", handleInput);
  minInput.addEventListener("change", handleChange);
  maxInput.addEventListener("change", handleChange);

  const setBounds = (minBound, maxBound) => {
    minInput.min = String(minBound);
    minInput.max = String(maxBound);
    maxInput.min = String(minBound);
    maxInput.max = String(maxBound);
  };

  const setValues = (minValue, maxValue) => {
    minInput.value = String(minValue);
    maxInput.value = String(maxValue);
    updateUI();
  };

  const getValues = () => ({
    min: parseNumber(minInput.value),
    max: parseNumber(maxInput.value),
  });

  updateUI();

  const destroy = () => {
    minInput.removeEventListener("input", handleInput);
    maxInput.removeEventListener("input", handleInput);
    minInput.removeEventListener("change", handleChange);
    maxInput.removeEventListener("change", handleChange);
  };

  return {
    setBounds,
    setValues,
    getValues,
    destroy,
  };
}


