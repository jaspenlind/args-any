import { indexOfAny } from "index-of-any";
import { operator } from ".";

export const expandSeparator = (arg: string): string[] => {
  const [index, matchingString] = indexOfAny(arg, ...operator.inlinesAllowed());

  if (matchingString) {
    const firstPosition = 0;

    return [
      arg.substring(firstPosition, index),
      arg.substring(index, matchingString.length + index),
      arg.substring(matchingString.length + index)
    ];
  }

  return [arg];
};
