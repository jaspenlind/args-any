import { indexOfAny } from "../../src/lib/utils/indexOfAny";

describe("indexOfAny", () => {
  it("can handle empty string", () => {
    indexOfAny("", "searchString");
  });

  it("can handle empty search string", () => {
    indexOfAny("value", "");
  });

  it("can handle empty search string array", () => {
    indexOfAny("value", ...[]);
  });

  it("should return matched search string", () => {
    const [, match] = indexOfAny("valuewithmatch", "match", "notmatched");

    expect(match).toBe("match");
  });

  it("should return index matching search string", () => {
    const value = "valuewithmatch";
    const match = "match";
    const indexOfMatch = value.indexOf(match);
    const [index] = indexOfAny(value, match);

    expect(index).toBe(indexOfMatch);
  });

  it("should be null when not found", () => {
    const [, match] = indexOfAny("value", "other");

    expect(match).toBe(null);
  });

  it("should have negative index when not found", () => {
    const [index] = indexOfAny("value", "other");

    expect(index).toBe(-1);
  });
});
