import { OpenRecord } from "../types";

export const project = <T extends OpenRecord>(item: T, projector: Partial<T>): Partial<T> => {
  const definedKeys = Object.keys(projector);

  const projection = Object.keys(item).reduce<OpenRecord>((acc, curr) => {
    if (definedKeys.includes(curr)) {
      acc[curr] = item[curr];
    }

    return acc;
  }, {});

  return projection as Partial<T>;
};

export default {
  project
};
