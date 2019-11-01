import { Option, OptionMap } from "../src/lib/OptionMap";

const getValue = (option: Option | undefined) => option && option.value;

describe("OptionMap", () => {
  describe("has", () => {
    it("should be true when key exists", () => {
      const map = new OptionMap(["-h"]);

      expect(map.has("h")).toBe(true);
      expect(map.has("-h")).toBe(true);
      expect(map.has("--h")).toBe(true);
    });

    it("should be false when key exists", () => {
      const map = new OptionMap(["-other"]);

      expect(map.has("h")).toBe(false);
      expect(map.has("-h")).toBe(false);
      expect(map.has("--h")).toBe(false);
    });
  });

  describe("get", () => {
    it("should be defined when key exists with value", () => {
      const map = new OptionMap(["-key", "value"]);

      expect(getValue(map.get("key"))).toBeDefined();
      expect(getValue(map.get("-key"))).toBeDefined();
      expect(getValue(map.get("--key"))).toBeDefined();
    });

    it("should be undefined when key exists without value", () => {
      const map = new OptionMap(["-key"]);

      expect(getValue(map.get("key"))).toBeUndefined();
      expect(getValue(map.get("-key"))).toBeUndefined();
      expect(getValue(map.get("--key"))).toBeUndefined();
    });

    it("should be undefined when key does not exist", () => {
      const map = new OptionMap(["-other"]);

      expect(map.get("key")).toBeUndefined();
      expect(map.get("-key")).toBeUndefined();
      expect(map.get("--key")).toBeUndefined();
    });
  });
});
