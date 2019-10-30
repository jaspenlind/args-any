const missing = -1;

export const indexOfAny = (value: string, ...searchStrings: string[]): [number, string | null] => {
  for (const searchString of searchStrings) {
    const index = value.indexOf(searchString);
    if (index >= 0) {
      return [index, searchString];
    }
  }

  return [missing, null];
};
