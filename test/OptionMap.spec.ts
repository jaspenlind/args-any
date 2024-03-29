import { Option } from "../src/types";
import { OptionMap } from "../src/lib/maps";

const getValue = (option: Option | undefined) => option && option.value;

interface Server {
  location: string;
  size: number;
}

describe("OptionMap", () => {
  describe("args", () => {
    const allArgs = ["-option1", "value1", "something", "else", "-option2"];
    const argMap = new OptionMap(allArgs);

    it("should have all args", () => {
      expect(argMap.args.all()).toBe(allArgs);
    });

    it("should have options", () => {
      const optionArgs = ["-option1", "value1", "-option2"];
      const [first, second, third] = optionArgs;
      const argLength = optionArgs.length;

      const result = argMap.args.options();

      expect(result).toHaveLength(argLength);
      expect(result.includes(first)).toBe(true);
      expect(result.includes(second)).toBe(true);
      expect(result.includes(third)).toBe(true);
    });

    it("should have other args", () => {
      const otherArgs = ["something", "else"];
      const [first, second] = otherArgs;
      const argLength = otherArgs.length;

      const result = argMap.args.other();

      expect(result).toHaveLength(argLength);
      expect(result.includes(first)).toBe(true);
      expect(result.includes(second)).toBe(true);
    });
  });

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

  describe("filter", () => {
    it("can filter items", () => {
      const items: Server[] = [
        {
          location: "SE",
          size: 1
        },
        {
          location: "SE",
          size: 5
        },
        {
          location: "NO",
          size: 7
        }
      ];
      const map = new OptionMap(["-location=SE", "-size>4"]);

      const result = map.filter(...items);
      const [first] = result;

      expect(result).toHaveLength(1);
      expect(first.location).toBe("SE");
      expect(first.size).toBe(5);
    });
  });
});
