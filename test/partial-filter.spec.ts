import { filter } from "../src/lib/partial-filter";
import { createServer, Server } from "./test-data";

describe("partialFilter", () => {
  describe("filter", () => {
    it("should be true when item matches filter", () => {
      const itemFilter: Partial<Server> = {
        name: "name"
      };

      const item = createServer();

      expect(filter(item, itemFilter)).toBe(true);
    });

    it("should be false when some properties matches filter", () => {
      const itemFilter: Partial<Server> = {
        country: "Norway",
        name: "name"
      };

      const item = createServer();

      expect(filter(item, itemFilter)).toBe(false);
    });

    it("should be false when no properties matches filter", () => {
      const itemFilter: Partial<Server> = {
        country: "Norway",
        name: "name"
      };

      const item = createServer({ name: "other name", country: "other country" });

      expect(filter(item, itemFilter)).toBe(false);
    });

    it("should be true when filter is empty", () => {
      const itemFilter: Partial<Server> = {};

      const item = createServer();

      expect(filter(item, itemFilter)).toBe(true);
    });
  });
});
