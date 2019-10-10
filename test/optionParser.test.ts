import "jest-extended";
import optionParser, { ParseOptions } from "../src";
import { Server } from "./testData";

describe("optionsParser", () => {
  describe("parse", () => {
    it("can parse key with one dash", () => {
      expect(optionParser.parse(["-key"]).has("key")).toBe(true);
    });

    it("can parse key with double dash", () => {
      expect(optionParser.parse(["--key"]).has("key")).toBe(true);
    });

    it("can parse key with prefix", () => {
      const options: ParseOptions = { keyPrefix: "filter" };

      expect(optionParser.parse(["-filter.key"], options).has("key")).toBe(true);
      expect(optionParser.parse(["--filter.key"], options).has("key")).toBe(true);
    });

    it("is empty when args contains no key", () => {
      expect(optionParser.parse(["nokey"])).toBeEmpty();
    });

    it("can handle empty args", () => {
      expect(optionParser.parse([])).toBeEmpty();
    });

    it("can parse single option", () => {
      const map = optionParser.parse(["-o", "option1"]);

      const option = map.get("o");

      expect(option).toBe("option1");
    });

    it("can parse multiple options", () => {
      const options = ["-a", "1", "-b", "2", "-c", "3", "-d", "4", "-e", "5"];

      const map = optionParser.parse(options);

      expect(map.size).toBe(5);
      expect(map.get("a")).toBe("1");
      expect(map.get("e")).toBe("5");
    });

    it("can parse option without value", () => {
      const options = ["-option1", "value1", "-option2"];

      const map = optionParser.parse(options);

      const option2 = map.get("option2");

      expect(map.has("option2")).toBe(true);
      expect(option2).toBeUndefined();
    });

    it("can exclude args that isn't an option", () => {
      const validOptionsCount = 3;

      const options = ["arg1", "arg2", "-arg3", "value3", "-arg4", "-arg5", "value5", "value6"];

      const map = optionParser.parse(options);

      expect(map.size).toBe(validOptionsCount);

      expect(map.get("arg3")).toBe("value3");
      expect(map.has("arg4")).toBe(true);
      expect(map.get("arg4")).toBeUndefined();
      expect(map.get("arg5")).toBe("value5");
    });

    it("can parse flags", () => {
      const validOptionsCount = 2;
      const args = ["command", "level2", "-h", "level3", "-arg2", "value2"];

      const options = optionParser.parse(args);

      expect(options.size).toBe(validOptionsCount);
      expect(options.has("h")).toBe(true);
      expect(options.get("h")).toBeUndefined();
      expect(options.get("arg2")).toBe("value2");
    });

    it("can parse options with separators", () => {
      const args = ["-option1=value1", "-option2=value2", "extra", "-option3=value3"];

      const [option1, option2, option3] = [...optionParser.parse(args).entries()];

      expect(option1[0]).toBe("option1");
      expect(option1[1]).toBe("value1");
      expect(option2[0]).toBe("option2");
      expect(option2[1]).toBe("value2");
      expect(option3[0]).toBe("option3");
      expect(option3[1]).toBe("value3");
    });
  });

  describe("filter", () => {
    it("can filter items", () => {
      const items: Server[] = [
        {
          name: "server1",
          country: "Sweden",
          flag: "SE"
        },
        {
          name: "server2",
          country: "Norway",
          flag: "NO"
        }
      ];

      const expectedFilterCount = 1;
      const result = optionParser.parse(["-flag", "NO"]).filter(...items);
      expect(result).toHaveLength(expectedFilterCount);

      const [first] = result;
      expect(first.name).toBe("server2");
    });
  });

  describe("unwrap", () => {
    it("can unwrap args", () => {
      const args = ["-option1", "value1"];

      const options = optionParser.parse(args);

      const [key, value] = options.unwrap();

      expect(key).toBe("-option1");
      expect(value).toBe("value1");
    });
  });
});
