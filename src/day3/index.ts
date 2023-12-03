import { readFileToString } from "../../utils/file-parser";

interface Star {
  neighbors: number[];
  x: number;
  y: number;
}

const parseInput = () => {
  const rows = readFileToString("./input.txt")
    .split("\r")
    .map((str) => str.replace("\n", ""));
  const numberRegex = /\d+/g;

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

  currentRow = 0;

  let starObj = {};
  for (let i = 0; i < characterGrid.length; i++) {
    for (let j = 0; j < characterGrid[0].length; j++) {
      if (characterGrid[i][j] === "*") {
        starObj[`${i},${j}`] = [];
      }
    }
  }

  rows.forEach((row) => {
    const matches = row.matchAll(numberRegex);
    foundNumbers.push(
      ...findNeighborsForStarMatch(starObj, characterGrid, currentRow, matches)
    );
    currentRow++;
  });

  console.log([
    ...Object.values(starObj)
      .filter((obj) => (obj as any[]).length >= 2)
      .map((obj) => obj[0] * obj[1]),
  ]);

  console.log(
    [
      ...Object.values(starObj)
        .filter((obj) => (obj as any[]).length >= 2)
        .map((obj) => obj[0] * obj[1]),
    ]
      .flat()
      .reduce((prev, curr) => (prev as number) + (curr as number), 0)
  );
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
  return foundNumbers;
};

const findNeighborsForStarMatch = (
  starGrid: object,
  characterGrid: string[][],
  currentRow: number,
  matches: IterableIterator<RegExpMatchArray>
) => {
  const foundNumbers = [];
  for (const match of matches) {
    let matchIndex = match.index;
    let currentIndex = 0;
    let foundMatch = false;
    for (const [testedCharacter] of match[0]) {
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            characterGrid[currentRow + i] &&
            characterGrid[currentRow + i][matchIndex + j] &&
            characterGrid[currentRow + i][matchIndex + j] === "*"
          ) {
            if (match[0] === "126") debugger;
            foundMatch = true;
            starGrid[`${currentRow + i},${matchIndex + j}`].push(
              Number(match[0])
            );
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
  return foundNumbers;
};

parseInput();
