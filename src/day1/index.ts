import { readFileToString } from "../../utils/file-parser";

const parseInput = () => {
  const rows: string[] = readFileToString("./input.txt").split("\n");
  const numberRegex =
    /(?=(one)|(two)|(three)|(four)|(five)|(six)|(seven)|(eight)|(nine))|\d/g;
  return rows
    .map((row) => row.matchAll(numberRegex))
    .map((stringArrayRegex) => {
      try {
        const stringArray = [...stringArrayRegex].flatMap((item) => {
          return item.filter((listItem) => listItem);
        });
        const firstNumber = textToNumber(stringArray.at(0)?.toString());
        const secondNumber = textToNumber(stringArray.at(-1)?.toString());
        return Number(firstNumber + secondNumber);
      } catch {
        return 0;
      }
    })
    .reduce((prev, curr) => prev + curr, 0);
};

function textToNumber(numberAsString: string | undefined): string {
  if (!numberAsString) throw new Error("missing number " + numberAsString);
  switch (numberAsString) {
    case "one":
      return "1";
    case "two":
      return "2";
    case "three":
      return "3";
    case "four":
      return "4";
    case "five":
      return "5";
    case "six":
      return "6";
    case "seven":
      return "7";
    case "eight":
      return "8";
    case "nine":
      return "9";
    default:
      return numberAsString;
  }
}
console.log(parseInput());
