import { toObject } from "../src/lib/partial";
import { Server } from "./test-data";

describe("mapHelper", () => {
  describe("toObject", () => {
    it("can convert map to object", () => {
      const map = new Map<string, string>([
        ["name", "server1"],
        ["flag", "SE"]
      ]);

      const server: Partial<Server> = toObject(map);

      expect(server.name).toBe("server1");
      expect(server.flag).toBe("SE");
    });
  });
});
