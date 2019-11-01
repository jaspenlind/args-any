export class CaseInsensitiveMap<K, V> extends Map<K, V> {
  constructor(entries?: ReadonlyArray<readonly [K, V]> | null) {
    super(entries);
  }

  public set(key: K, value: V) {
    if (typeof key === "string") {
      const lowerCasedKey = <K>(<any>key.toLowerCase());
      return super.set(lowerCasedKey, value);
    }
    return super.set(key, value);
  }
}
