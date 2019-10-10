#!/usr/bin/env node
export const any = <T>(array: ArrayLike<T>) => array.length > 0;

export const isEmpty = <T>(array: ArrayLike<T>) => !any(array);

export const last = <T>(array: ArrayLike<T>): T => array[array.length - 1];

export const takeWhile = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  const items: T[] = [];

  for (const item of array) {
    if (!predicate(item)) {
      break;
    }

    items.push(item);
  }

  return items;
};
