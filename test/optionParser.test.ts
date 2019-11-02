import optionParser, { ParserSettings, parse, Option, OptionMap } from "../src";
import { empty, Operator } from "../src/lib/parse";
import { Server } from "./testData";

const getValue = (option: Option | undefined) => (option && option.value) || undefined;
const getOption = (map: OptionMap, key: string) => map.get(key) || empty;

describe("optionsParser", () => {
  describe("parse", () => {
    it("can parse", () => {
      const options = parse(["-key", "value"]);

      expect(options.has("key")).toBe(true);
    });

    it("can parse key with one dash", () => {
      expect(optionParser.parse(["-key"]).has("key")).toBe(true);
    });

    it("can parse key with double dash", () => {
      expect(optionParser.parse(["--key"]).has("key")).toBe(true);
    });

    it("can parse key with prefix", () => {
      const options: ParserSettings = { keyPrefix: "filter", flags: [] };

      expect(optionParser.parse(["-filter.key"], options).has("key")).toBe(true);
      expect(optionParser.parse(["--filter.key"], options).has("key")).toBe(true);
    });

    it("is empty when args contains no key", () => {
      expect(optionParser.parse(["nokey"]).size).toBe(0);
    });

    it("can handle empty args", () => {
      expect(optionParser.parse([]).size).toBe(0);
    });

    it("can parse single option", () => {
      const map = optionParser.parse(["-o", "option1"]);

      const option = map.get("o");

      expect(option && option.value).toBe("option1");
    });

    it("can parse multiple options", () => {
      const numberOfOptions = 5;

      const options = ["-a", "1", "-b", "2", "-c", "3", "-d", "4", "-e", "5"];

      const map = optionParser.parse(options);

      expect(map.size).toBe(numberOfOptions);
      expect(getValue(map.get("a"))).toBe("1");
      expect(getValue(map.get("e"))).toBe("5");
    });

    it("can parse option without value", () => {
      const options = ["-option1", "value1", "-option2"];

      const map = optionParser.parse(options);

      const option2 = map.get("option2");

      expect(map.has("option2")).toBe(true);
      expect(option2 && option2.value).toBeUndefined();
    });

    it("can parse operator", () => {
      const options = ["-op1=1", "-op2", "ne", "5", "-op3", "lt", "4"];

      const map = optionParser.parse(options);

      expect(getOption(map, "op1").operator).toBe(Operator.Eq);
      expect(getOption(map, "op2").operator).toBe(Operator.Ne);
      expect(getOption(map, "op3").operator).toBe(Operator.Lt);
    });

    it("can exclude args that isn't an option", () => {
      const validOptionsCount = 3;

      const options = ["arg1", "arg2", "-arg3", "value3", "-arg4", "-arg5", "value5", "value6"];

      const map = optionParser.parse(options);

      expect(map.size).toBe(validOptionsCount);

      expect(getValue(map.get("arg3"))).toBe("value3");
      expect(map.has("arg4")).toBe(true);
      expect(getValue(map.get("arg4"))).toBeUndefined();
      expect(getValue(map.get("arg5"))).toBe("value5");
    });

    it("can parse flags", () => {
      const validOptionsCount = 2;
      const args = ["command", "level2", "-h", "level3", "-arg2", "value2"];

      const options = optionParser.parse(args);

      expect(options.size).toBe(validOptionsCount);
      expect(options.has("h")).toBe(true);
      expect(getValue(options.get("h"))).toBeUndefined();
      expect(getValue(options.get("arg2"))).toBe("value2");
    });

    it("can parse options with separators", () => {
      const args = ["-option1=value1", "-option2=value2", "extra", "-option3=value3"];

      const [option1, option2, option3] = [...optionParser.parse(args).entries()];

      const keyIndex = 0;
      const valueIndex = 1;

      expect(option1[keyIndex]).toBe("option1");
      expect((option1[valueIndex] || empty).value).toBe("value1");
      expect(option2[keyIndex]).toBe("option2");
      expect((option2[valueIndex] || empty).value).toBe("value2");
      expect(option3[keyIndex]).toBe("option3");
      expect((option3[valueIndex] || empty).value).toBe("value3");
    });

    it("can get option with or without dash", () => {
      const value = "value";
      const options = optionParser.parse(["-option1", value]);

      expect(getValue(options.get("option1"))).toBe(value);
      expect(getValue(options.get("-option1"))).toBe(value);
      expect(getValue(options.get("--option1"))).toBe(value);
    });

    it("can get option without prefix", () => {
      const value = "value";
      const options = optionParser.parse(["-filter.option1", value], { keyPrefix: "filter" });

      expect(getValue(options.get("option1"))).toBe(value);
      expect(getValue(options.get("-option1"))).toBe(value);
      expect(getValue(options.get("--option1"))).toBe(value);
      expect(getValue(options.get("-filter.option1"))).toBe(value);
      expect(getValue(options.get("--filter.option1"))).toBe(value);
    });
  });

  describe("filter", () => {
    it("can filter items", () => {
      const items: Server[] = [
        {
          country: "Sweden",
          flag: "SE",
          name: "server1"
        },
        {
          country: "Norway",
          flag: "NO",
          name: "server2"
        }
      ];

      const expectedFilterCount = 1;
      const result = optionParser.parse(["-flag", "NO"]).filter(...items);
      expect(result).toHaveLength(expectedFilterCount);

      const [first] = result;
      expect(first.name).toBe("server2");
    });
  });

  describe("args", () => {
    it("can return args", () => {
      const args = ["-option1", "value1"];

      const options = optionParser.parse(args);

      const [key, value] = options.args.all();

      expect(key).toBe("-option1");
      expect(value).toBe("value1");
    });
  });
});
