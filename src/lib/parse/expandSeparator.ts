import { indexOfAny } from "index-of-any";
import { operator } from ".";

export const expandSeparator = (arg: string): string[] => {
  const [index, matchingString] = indexOfAny(arg, ...operator.inlinesAllowed());

  if (matchingString) {
    return [
      arg.substring(0, index),
      arg.substring(index, matchingString.length + index),
      arg.substring(matchingString.length + index)
    ];
  }

  return [arg];
};
