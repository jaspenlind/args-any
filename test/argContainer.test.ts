import "jest-extended";

import { OptionMap } from "../src/lib";

const args = ["-option1", "value1", "something", "else", "-option2"];
const map = new OptionMap(args);
const container = map.args;

describe("argContainer", () => {
  describe("all", () => {
    it("should return all args", () => {
      expect(container.all()).toBe(args);
    });
  });

  describe("options", () => {
    it("should have option args", () => {
      const optionArgs = ["-option1", "value1", "-option2"];
      const argLength = optionArgs.length;

      const result = container.options();

      expect(result).toHaveLength(argLength);
      expect(result).toContainValues(optionArgs);
    });
  });

  describe("other", () => {
    it("should have other args", () => {
      const otherArgs = ["something", "else"];
      const argLength = otherArgs.length;

      const result = container.other();

      expect(result).toHaveLength(argLength);
      expect(result).toContainValues(otherArgs);
    });
  });
});
