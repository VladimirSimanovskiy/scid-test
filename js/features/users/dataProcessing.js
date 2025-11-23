export function getPreparedUsers(users, { ageMin, ageMax, sort } = {}) {
  let result = Array.isArray(users) ? [...users] : [];

  if (ageMin != null) {
    result = result.filter((user) => Number(user.age) >= ageMin);
  }

  if (ageMax != null) {
    result = result.filter((user) => Number(user.age) <= ageMax);
  }

  const sortConfig = sort ?? {
    lastName: null,
    age: null,
  };

  const sortOrder = ["lastName", "age"];

  result.sort((a, b) => {
    for (const key of sortOrder) {
      const dir = sortConfig[key];
      if (!dir) {
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


