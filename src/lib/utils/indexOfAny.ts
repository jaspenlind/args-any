export const indexOfAny = (value: string, ...searchStrings: string[]): [number, string | null] => {
  for (let i = 0; i < searchStrings.length; i += 1) {
    const current = searchStrings[i];
    const index = value.indexOf(current);
    if (index >= 0) {
      return [index, current];
    }
  }

  return [-1, null];
};
