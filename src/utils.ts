export const findPosition = (
  matrix: string[][],
  char: string[] | string
): { row: number; col: number } => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (char.includes(matrix[row][col])) {
        return { row: row, col: col };
      }
    }
  }
  return { row: -1, col: -1 };
};


