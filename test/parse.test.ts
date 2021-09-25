import { Operator, Option } from "../src/types";
import { parse } from "../src/lib/parse";

describe("parse", () => {
  describe("when valueAsKey is true", () => {
    it("should parse value as key", () => {
      const args = ["-key1=value1"];

      const parsed = parse(args, { valueAsKey: true });

      expect(parsed.has("value1")).toBe(true);
      const option = parsed.get("value1");
      expect(option && option.key).toBe("key1");
      expect(option && option.value).toBe("value1");
      expect(option && option.operator).toBe(Operator.Eq);
    });
  });

  it("can exclude options with filter", () => {
    const args = ["-key1=value1", "-key2=value2", "-excludeme=true"];

    const settings = { filter: (option: Option) => option.key !== "excludeme" };

    const parsed = parse(args, settings);

    expect(parsed.size).toBe(2);
    expect(parsed.has("excludeme")).toBe(false);
  });

  it("can map multiple keys as value", () => {
    const args = ["-foo=bar", "-bar=baz", "-shared=value1", "-shared=value2"];
    const settings = {
      filter: (option: Option) => option.key === "shared",
      valueAsKey: true
    };

    const parsed = parse(args, settings);

    expect(parsed.size).toBe(2);
  });
});
