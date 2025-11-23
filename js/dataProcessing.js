import { STATE } from "./state.js";

export function getPreparedUsers() {
  let result = [...STATE.users];

  if (STATE.filterAdultsOnly) {
    result = result.filter((user) => Number(user.age) > 18);
  }

  switch (STATE.sortBy) {
    case "name":
      result.sort((a, b) =>
        `${a.firstName} ${a.lastName}`.localeCompare(
          `${b.firstName} ${b.lastName}`,
          "ru"
        )
      );
      break;
    case "age-asc":
      result.sort((a, b) => Number(a.age) - Number(b.age));
      break;
    case "age-desc":
      result.sort((a, b) => Number(b.age) - Number(a.age));
      break;
    default:
      break;
  }

  return result;
}
