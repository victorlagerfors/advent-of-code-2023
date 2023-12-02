import { readFileToString } from "../../utils/file-parser";

interface SetOfCubes {
  id: number;
  blue?: number;
  red?: number;
  green?: number;
}

const parseInput = () => {
  const rows: string[] = readFileToString("./input.txt").split("\n");
  const setRegex = /(\d+ \w+)/g;
  let id = 0;
  const sets = rows
    .flatMap((row) => {
      return row.split(";");
    })
    .map((set) => {
      const gameIdRegex = /(Game \d+)/;
      const tempId = set.match(gameIdRegex)?.[0].match(/\d+/)?.[0];
      if (tempId) {
        id = Number(tempId);
      }

      const sets = [
        set.match(setRegex)?.at(0),
        set.match(setRegex)?.at(1),
        set.match(setRegex)?.at(2),
      ];
      return mapSetColor(id, sets);
    });

  const impossibleSets = sets.map((set) => {
    const exceedsLimit = set.blue > 14 || set.green > 13 || set.red > 12;
    if (exceedsLimit) {
      return set.id;
    }
    return 0;
  });
  const uniqueImpossibleSets = [...new Set(impossibleSets)];
  const possible = [...Array(100).keys()].filter(
    (id) => !uniqueImpossibleSets.find((tempId) => id === tempId)
  );

  console.log(possible.reduce((prev, curr) => prev + curr, 0));
};

const mapSetColor = (id: number, sets: (string | undefined)[]): SetOfCubes => {
  const setObject: SetOfCubes = { id };

  sets.forEach((set) => {
    if (set) {
      switch (true) {
        case set.endsWith("green"):
          setObject.green = Number(set.match(/\d+/)?.[0]) || 0;
          break;
        case set.endsWith("red"):
          setObject.red = Number(set.match(/\d+/)?.[0]) || 0;
          break;
        case set.endsWith("blue"):
          setObject.blue = Number(set.match(/\d+/)?.[0]) || 0;
          break;
      }
    }
  });
  return setObject;
};

parseInput();
