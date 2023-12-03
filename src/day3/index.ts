import { readFileToString } from "../../utils/file-parser";

interface Coordinate {
  currentNumber: number;
  x: number;
  y: number;
}

const parseInput = () => {
  const rows = readFileToString("./input.txt")
    .split("\r")
    .map((str) => str.replace("\n", ""));
  const numberRegex = /\d+/g;

  let numbersNeighborsArray: Coordinate[] = [];
  let characterGrid: string[][] = [];
  let currentRow = 0;
  rows.forEach((row, index) => {
    characterGrid[index] = [...row];
  });

  const foundNumbers = [];
  rows.forEach((row) => {
    const matches = row.matchAll(numberRegex);
    foundNumbers.push(
      ...findNeighborsForRegexMatch(characterGrid, currentRow, matches)
    );
    currentRow++;
  });
  console.log(foundNumbers.reduce((prev, curr) => prev + curr));
};

const findNeighborsForRegexMatch = (
  characterGrid: string[][],
  currentRow: number,
  matches: IterableIterator<RegExpMatchArray>
): Number[] => {
  const foundNumbers = [];
  for (const match of matches) {
    let matchIndex = match.index;
    let currentIndex = 0;
    let foundMatch = false;
    let valueOfFoundMatch = 0;
    for (const [testedCharacter] of match[0]) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            characterGrid[currentRow + i] &&
            characterGrid[currentRow + i][matchIndex + j] &&
            !/\d/.test(characterGrid[currentRow + i][matchIndex + j]) &&
            characterGrid[currentRow + i][matchIndex + j] !== "."
          ) {
            foundMatch = true;
            foundNumbers.push(Number(match[0]));
            break;
          }
        }
        if (foundMatch) break;
      }
      matchIndex++;
      currentIndex++;
      if (foundMatch) break;
    }
  }
  console.log(foundNumbers);
  return foundNumbers;
};

parseInput();
