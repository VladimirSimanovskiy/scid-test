import { STATE } from "./state.js";

export function getPreparedUsers() {
  let result = [...STATE.users];

  if (STATE.ageMin != null) {
    result = result.filter((user) => Number(user.age) >= STATE.ageMin);
  }

  if (STATE.ageMax != null) {
    result = result.filter((user) => Number(user.age) <= STATE.ageMax);
  }

  const sortConfig = STATE.sort ?? {
    lastName: "off",
    age: "off",
  };

  const sortOrder = ["lastName", "age"];

  result.sort((a, b) => {
    for (const key of sortOrder) {
      const dir = sortConfig[key];
      if (!dir || dir === "off") {
        continue;
      }

      const direction = dir === "desc" ? -1 : 1;

      let cmp = 0;

      if (key === "age") {
        const av = Number(a.age);
        const bv = Number(b.age);
        if (Number.isFinite(av) && Number.isFinite(bv)) {
          cmp = av - bv;
        } else if (Number.isFinite(av)) {
          cmp = 1;
        } else if (Number.isFinite(bv)) {
          cmp = -1;
        }
      } else if (key === "lastName") {
        const av = (a[key] ?? "").toString();
        const bv = (b[key] ?? "").toString();
        cmp = av.localeCompare(bv, "ru");
      }

      if (cmp !== 0) {
        return cmp * direction;
      }
    }

    return 0;
  });

  return result;
}
