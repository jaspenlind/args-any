#!/usr/bin/env node
import { convert, StringLike } from "./stringConverter";
import { indeces } from "./arrayHelper";

export const any = <K, V>(map: Map<K, V> | ReadonlyMap<K, V>) => map.size > indeces.empty;

export const lastKey = <K, V>(map: Map<K, V> | ReadonlyMap<K, V>) => [...map.keys()].pop();

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
