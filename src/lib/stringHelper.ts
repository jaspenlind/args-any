#!/usr/bin/env node
import escaperegexp from "lodash.escaperegexp";
import { firstOrDefault, indeces } from "./arrayHelper";

export const isEmpty = (value: string) => value.trim().length === indeces.empty;

export const trimStart = (value: string, ...trimChars: string[]) => {
  if (isEmpty(value)) {
    return value;
  }

  let result = value;

  const matcher = new RegExp(`^(${trimChars.map(x => escaperegexp(x)).join("|")})`);

  const find = (): string | null => {
    const match = result.match(matcher);

    return firstOrDefault(match);
  };

  for (let match = find(); match !== null; match = find()) {
    result = result.substring(match.length);
  }

  return result;
};
