import { project } from ".";
import { OpenRecord } from "../../types";

export const filter = <T extends OpenRecord>(item: T, predicateFilter: Partial<T>): boolean => {
  const projection = project(item, predicateFilter);

  return Object.keys(projection).reduce<boolean>((acc, curr) => {
    return acc && predicateFilter[curr] === projection[curr];
  }, true);
};
