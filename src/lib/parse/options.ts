import { OptionSegment, ParserSettings } from "../../types";
import { fromSegment, Option } from "../../models/option";
import { parse as parseSegment } from "./segment";

export const parse = (args: string[], options?: Partial<ParserSettings>): Map<string, Option | undefined> => {
  const map = new Map<string, Option | undefined>();

  let prevSegment: OptionSegment | undefined;
  args.forEach(arg => {
    const segment = parseSegment(arg, prevSegment, options);

    if (segment) {
      const value = segment.value ? fromSegment(segment) : undefined;
      map.set(segment.key, value);
    }

    prevSegment = segment;

    if (segment && (segment.isFlag || (segment.key && segment.value))) {
      prevSegment = undefined;
    }
  });

  return map;
};
