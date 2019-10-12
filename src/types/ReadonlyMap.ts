export class ReadonlyMap<K, V> implements ReadonlyMap<K, V> {
  private map: Map<K, V>;

  constructor(map: Map<K, V>) {
    this.map = map;
  }

  public get(key: K): V | undefined {
    return this.map.get(key);
  }

  forEach(callbackfn: (value: V, key: K, map: Map<K, V>) => void, thisArg?: any): void {
    this.map.forEach(callbackfn, thisArg);
  }

  public has(key: K): boolean {
    return this.map.has(key);
  }

  public get size(): number {
    return this.map.size;
  }

  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map[Symbol.iterator]();
  }

  entries(): IterableIterator<[K, V]> {
    return this.map.entries();
  }

  keys(): IterableIterator<K> {
    return this.map.keys();
  }

  values(): IterableIterator<V> {
    return this.map.values();
  }
}
