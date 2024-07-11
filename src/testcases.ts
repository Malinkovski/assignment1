import { findPathAndLetters } from "./index.js";
import {
  test1,
  test2,
  test3,
  test4,
  test5,
} from "./matrices.js";

const tests = [test1, test2, test3, test4, test5];

//OUTPUT
tests.forEach((testArray, index) => {
  const testResults = findPathAndLetters(testArray);

  console.log(`<==========TEST-${index + 1}==========>`);
  console.log();
  if (testResults.letters || testResults.path) {
    console.log("- Path", testResults.path);
    console.log("- Letters", testResults.letters);
  } else {
    console.log("- Error", testResults.error);
  }
  console.log();
  console.log("<==========================>");
});
