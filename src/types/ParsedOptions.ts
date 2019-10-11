export default interface ParsedOptions extends ReadonlyMap<string, string | undefined> {
  asPartial: <T>() => Partial<T>;
  filter: <T>(...items: T[]) => T[];
  unwrap: () => string[];
}
