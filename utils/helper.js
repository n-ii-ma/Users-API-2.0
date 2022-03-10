// Hide NULL values
const hideNull = (obj) => {
  if (Array.isArray(obj)) {
    return obj
      .map((value) =>
        value && typeof value === "object" ? hideNull(value) : value
      )
      .filter((value) => !(value == null));
  } else {
    return Object.entries(obj)
      .map(([key, value]) => [
        key,
        value && typeof value === "object" ? hideNull(value) : value,
      ])
      .reduce(
        (accumulator, [key, value]) =>
          value == null
            ? accumulator
            : ((accumulator[key] = value), accumulator),
        {}
      );
  }
};

module.exports = hideNull;
