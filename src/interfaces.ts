export interface FindPathAndLettersProps {
  letters?: string;
  path?: string;
  error?: string;
}

export type Direction = "up" | "right" | "down" | "left";

export interface DirectionsProps {
  [key: string]: Direction;
}

export interface PositionProps {
  row: number
  col: number
}
