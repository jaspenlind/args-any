import { option } from "../src/lib/parser";
import argsAny, { OptionMap, parse } from "../src";
import { Server } from "./test-data";
import { Operator, Option } from "../src/types";

const getValue = (opt: Option | undefined) => opt?.value || undefined;
const getOption = (map: OptionMap, key: string) => map.get(key) || option.empty;

describe("argsAny", () => {
  describe("parse", () => {
    it("can parse", () => {
      const options = parse(["-key", "value"]);

      expect(options.has("key")).toBe(true);
    });

    it("can parse key with one dash", () => {
      expect(argsAny.parse(["-key"]).has("key")).toBe(true);
    });

    it("can parse key with double dash", () => {
      expect(argsAny.parse(["--key"]).has("key")).toBe(true);
    });

    it("can parse key values with quotes", () => {
      const options = argsAny.parse(['"-key=value"']);

      expect(options.has("key")).toBe(true);

      const opt = options.get("key");
      expect(opt?.operator).toBe(Operator.Eq);
      expect(opt?.value).toBe("value");
    });

    it("can parse key with prefix", () => {
      const options = { keyPrefix: "filter", flags: [] };

      expect(argsAny.parse(["-filter.key"], options).has("key")).toBe(true);
      expect(argsAny.parse(["--filter.key"], options).has("key")).toBe(true);
      expect(argsAny.parse(["-filter.flag=SE"], options).has("flag")).toBe(true);
      expect(getOption(argsAny.parse(["-filter.flag=SE"], options), "flag").key).toBe("flag");
    });

    it("should not parse key with other prefix", () => {
      const options = { keyPrefix: "filter", flags: [] };

      expect(argsAny.parse(["-other"], options).has("other")).toBe(false);
      expect(argsAny.parse(["-other.key"], options).has("key")).toBe(false);
    });

    it("is empty when args contains no key", () => {
      expect(argsAny.parse(["nokey"]).size).toBe(0);
    });

    it("can handle empty args", () => {
      expect(argsAny.parse([]).size).toBe(0);
    });

    it("can parse single option", () => {
      const map = argsAny.parse(["-o", "option1"]);

      const opt = map.get("o");

      expect(opt?.value).toBe("option1");
    });

    it("can parse multiple options", () => {
      const numberOfOptions = 5;

      const options = ["-a", "1", "-b", "2", "-c", "3", "-d", "4", "-e", "5"];

      const map = argsAny.parse(options);

      expect(map.size).toBe(numberOfOptions);
      expect(getValue(map.get("a"))).toBe("1");
      expect(getValue(map.get("e"))).toBe("5");
    });

    it("can parse option without value", () => {
      const options = ["-option1", "value1", "-option2"];

      const map = argsAny.parse(options);

      const option2 = map.get("option2");

      expect(map.has("option2")).toBe(true);
      expect(option2 && option2.value).toBeUndefined();
    });

    it("can parse operator", () => {
      const options = ["-op1=1", "-op2", "ne", "5", "-op3", "lt", "4"];

      const map = argsAny.parse(options);

      expect(getOption(map, "op1").operator).toBe(Operator.Eq);
      expect(getOption(map, "op2").operator).toBe(Operator.Ne);
      expect(getOption(map, "op3").operator).toBe(Operator.Lt);
    });

    it("can exclude args that isn't an option", () => {
      const validOptionsCount = 3;

      const options = ["arg1", "arg2", "-arg3", "value3", "-arg4", "-arg5", "value5", "value6"];

      const map = argsAny.parse(options);

      expect(map.size).toBe(validOptionsCount);

      expect(getValue(map.get("arg3"))).toBe("value3");
      expect(map.has("arg4")).toBe(true);
      expect(getValue(map.get("arg4"))).toBeUndefined();
      expect(getValue(map.get("arg5"))).toBe("value5");
    });

    it("can parse flags", () => {
      const validOptionsCount = 2;
      const args = ["command", "level2", "-h", "level3", "-arg2", "value2"];

      const options = argsAny.parse(args);

      expect(options.size).toBe(validOptionsCount);
      expect(options.has("h")).toBe(true);
      expect(getValue(options.get("h"))).toBeUndefined();
      expect(getValue(options.get("arg2"))).toBe("value2");
    });

    it("can parse options with separators", () => {
      const args = ["-option1=value1", "-option2=value2", "extra", "-option3=value3"];

      const [option1, option2, option3] = [...argsAny.parse(args).entries()];

      const keyIndex = 0;
      const valueIndex = 1;

      expect(option1[keyIndex]).toBe("option1");
      expect((option1[valueIndex] || option.empty).value).toBe("value1");
      expect(option2[keyIndex]).toBe("option2");
      expect((option2[valueIndex] || option.empty).value).toBe("value2");
      expect(option3[keyIndex]).toBe("option3");
      expect((option3[valueIndex] || option.empty).value).toBe("value3");
    });

    it("can get option with or without dash", () => {
      const value = "value";
      const options = argsAny.parse(["-option1", value]);

      expect(getValue(options.get("option1"))).toBe(value);
      expect(getValue(options.get("-option1"))).toBe(value);
      expect(getValue(options.get("--option1"))).toBe(value);
    });

    it("can get option without prefix", () => {
      const value = "value";
      const options = argsAny.parse(["-filter.option1", value], { keyPrefix: "filter" });

      expect(getValue(options.get("option1"))).toBe(value);
      expect(getValue(options.get("-option1"))).toBe(value);
      expect(getValue(options.get("--option1"))).toBe(value);
      expect(getValue(options.get("-filter.option1"))).toBe(value);
      expect(getValue(options.get("--filter.option1"))).toBe(value);
    });
  });

  describe("asPartial", () => {
    it("can project args using value as key", () => {
      const args = ["-foo=bar", "-output=country", "-bar=baz", "-output=name", "-other=flag"];

      const settings = {
        filter: (opt: Option) => opt.key === "output",
        valueAsKey: true
      };

      const partial = argsAny.parse(args, settings).asPartial<Server>();

      expect(Object.keys(partial)).toHaveLength(2);
      expect(partial.country).toBeDefined();
      expect(partial.name).toBeDefined();
    });
  });

  describe("filter", () => {
    it("can filter items", () => {
      const items: Server[] = [
        {
          country: "Sweden",
          flag: "SE",
          load: 1,
          name: "server1"
        },
        {
          country: "Norway",
          flag: "NO",
          load: 2,
          name: "server2"
        }
      ];

      const expectedFilterCount = 1;
      const result = argsAny.parse(["-flag", "NO"]).filter(...items);
      expect(result).toHaveLength(expectedFilterCount);

      const [first] = result;
      expect(first.name).toBe("server2");
    });

    it("can return items greater or equal to filter", () => {
      const baseServer: Server = {
        country: "county",
        flag: "flag",
        load: 0,
        name: "name"
      };

      const servers: Server[] = [
        { ...baseServer, ...{ load: 20 } },
        { ...baseServer, ...{ load: 50 } },
        { ...baseServer, ...{ load: 70 } },
        { ...baseServer, ...{ load: 10 } }
      ];

      expect(argsAny.parse(["-load", "ge", "40"]).filter(...servers)).toHaveLength(2);
      expect(argsAny.parse(["-load", ">=", "40"]).filter(...servers)).toHaveLength(2);
      expect(argsAny.parse(["-load", "=>", "40"]).filter(...servers)).toHaveLength(2);
      expect(argsAny.parse(["-load=>40"]).filter(...servers)).toHaveLength(2);
    });
  });

  describe("args", () => {
    it("can return args", () => {
      const args = ["-option1", "value1"];

      const options = argsAny.parse(args);

      const [key, value] = options.args.all();

      expect(key).toBe("-option1");
      expect(value).toBe("value1");
    });
  });
});
