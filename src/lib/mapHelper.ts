#!/usr/bin/env node
import { convert, StringLike } from "./stringConverter";

export const toObject = <T, V extends StringLike | undefined>(
  map: Map<string, V> | ReadonlyMap<string, V>
): Partial<T> => {
  const obj: Partial<T> = {};

  map.forEach((value, key) => {
    const convertedValue = convert(value);

    Reflect.set(obj, key, convertedValue);
  });

  return obj;
};
