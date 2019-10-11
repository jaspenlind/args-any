import { OptionSegment, ParserSettings } from "../../types";
import { parse as parseSegment } from "./segment";

export const parse = (args: string[], options?: Partial<ParserSettings>): Map<string, string | undefined> => {
  const map = new Map<string, string | undefined>();

  let prevSegment: OptionSegment | undefined;
  args.forEach(arg => {
    const segment = parseSegment(arg, prevSegment, options);

    if (segment) {
      map.set(segment.key, segment.value);
    }

    prevSegment = segment;

    if (segment && (segment.isFlag || (segment.key && segment.value))) {
      prevSegment = undefined;
    }
  });

  return map;
};
