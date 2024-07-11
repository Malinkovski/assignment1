import { DirectionsProps } from "./interfaces";

// prettier-ignore
export const directions: DirectionsProps = {
    ">": "right",
    "<": "left",
    "^": "up",
    "v": "down",
  };
export const availStartChars: string[] | string = [">", "<", "^", "v"];
export const availFinishChars: string[] | string = "s";
export const horizontalChar: string = "-";
export const invalidChar: string = " ";
export const verticalChar: string = "|";
export const intersectionChar: string = "+";
export const regexLetters: RegExp = /[a-zA-Z]/;
export const regexUppercase: RegExp = /[A-Z]/;
