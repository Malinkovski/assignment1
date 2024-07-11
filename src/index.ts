import {
  Direction,
  DirectionsProps,
  FindPathAndLettersProps,
  PositionProps,
} from "./interfaces.js";
import { pathMatrixAssignment } from "./matrices.js";
import { findPosition } from "./utils.js";
import {
  availStartChars,
  availFinishChars,
  directions,
  invalidChar,
  regexUppercase,
  horizontalChar,
  verticalChar,
  intersectionChar,
  regexLetters,
} from "./variables.js";

export const findPathAndLetters = (
  matrix: string[][]
): FindPathAndLettersProps => {
  let letters: string = "";
  let path: string = "";

  const startPos: PositionProps = findPosition(matrix, availStartChars);
  const finishPos: PositionProps = findPosition(matrix, availFinishChars);

  if (startPos.row < 0 && startPos.col < 0) {
    return { error: "no starting position found" };
  }
  if (finishPos.row < 0 && finishPos.col < 0) {
    return { error: "no finish position found" };
  }

  path += "@" //!start????
  let row: number = startPos.row;
  let col: number = startPos.col;
  let direction: Direction = directions[matrix[startPos.row][startPos.col]];
  let visitedPositions: string[] = [`${row},${col}`];

  //initial direction
  switch (direction) {
    case "left":
      col--;
      break;
    case "right":
      col++;
      break;
    case "down":
      row++;
      break;
    case "up":
      row--;
      break;
    default:
      return {
        error: "invalid direction",
      };
  }

  while (true) {
    if (row < 0 || col < 0) {
      return {
        error: "out of bounds",
      };
    }

    if (row >= matrix.length || col >= matrix[row].length) {
      return {
        error: "out of bounds, finish point not found",
      };
    }

    const currentPosChar: string = matrix[row][col];
    const currentPos: string = `${row},${col}`;

    if (visitedPositions.includes(currentPos)) {
      return { error: "path loop, cannot continue" };
    }
    visitedPositions.push(currentPos);

    if (currentPosChar === invalidChar) {
      return { error: "path broken, ran out of path" };
    }

    //populate Path and Letters
    path += currentPosChar;
    if (
      currentPosChar.match(regexUppercase) &&
      !availFinishChars.includes(currentPosChar)
    ) {
      letters += currentPosChar;
    }

    //stop loop if finish position reached
    if (availFinishChars.includes(currentPosChar)) {
      break;
    }
    //handle "|" character
    switch (currentPosChar) {
      case horizontalChar:
        if (direction === "left") col--;
        else if (direction === "right") col++;
        else
          return {
            error:
              "path broken, encontered horizontal character during vertical path",
          };
        break;
      //handle "-" characters
      case verticalChar:
        if (direction === "up") row--;
        else if (direction === "down") row++;
        else
          return {
            error:
              "path broken, encontered vertical character during horizontal path",
          };
        break;
      //handle "+" and letter characters
      //clockwise check to move to next character
      case intersectionChar:
      case regexLetters.test(currentPosChar) && currentPosChar:
        if (
          matrix[row - 1]?.[col] &&
          matrix[row - 1][col] !== invalidChar &&
          !visitedPositions.includes(`${row - 1},${col}`)
        ) {
          direction = "up";
          row--;
        } else if (
          matrix[row][col + 1] &&
          matrix[row][col + 1] !== invalidChar &&
          !visitedPositions.includes(`${row},${col + 1}`)
        ) {
          direction = "right";
          col++;
        } else if (
          matrix[row + 1]?.[col] &&
          matrix[row + 1][col] !== invalidChar &&
          !visitedPositions.includes(`${row + 1},${col}`)
        ) {
          direction = "down";
          row++;
        } else if (
          matrix[row][col - 1] &&
          matrix[row][col - 1] !== invalidChar &&
          !visitedPositions.includes(`${row},${col - 1}`)
        ) {
          direction = "left";
          col--;
        } else {
          return { error: "intersection failed" };
        }

        break;
      default:
        if (currentPosChar === invalidChar) {
          return {
            error: "path broken, ran out of path",
          };
        }
        //ignore if its not a letter and continue path direction
        else {
          switch (direction) {
            case "left":
              col--;
              break;
            case "right":
              col++;
              break;
            case "down":
              row++;
              break;
            case "up":
              row--;
              break;
            default:
              return {
                error: "invalid direction",
              };
          }
        }
    }
  }
  return { path, letters };
};

//OUTPUT
const assingmentResults = findPathAndLetters(pathMatrixAssignment);
if (assingmentResults.letters || assingmentResults.path) {
  console.log("- Path", assingmentResults.path);
  console.log("- Letters", assingmentResults.letters);
} else {
  console.log("- Error", assingmentResults.error);
}
