export class CaseInsensitiveMap<V> extends Map<string, V> {
  public set(key: string, value: V): this {
    return super.set(key.toLowerCase(), value);
  }
}
