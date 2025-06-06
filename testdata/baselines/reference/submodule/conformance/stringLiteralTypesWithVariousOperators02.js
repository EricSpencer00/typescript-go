//// [tests/cases/conformance/types/stringLiteral/stringLiteralTypesWithVariousOperators02.ts] ////

//// [stringLiteralTypesWithVariousOperators02.ts]
let abc: "ABC" = "ABC";
let xyz: "XYZ" = "XYZ";
let abcOrXyz: "ABC" | "XYZ" = abc || xyz;
let abcOrXyzOrNumber: "ABC" | "XYZ" | number = abcOrXyz || 100;

let a = abcOrXyzOrNumber + 100;
let b = 100 + abcOrXyzOrNumber;
let c = abcOrXyzOrNumber + abcOrXyzOrNumber;
let d = abcOrXyzOrNumber + true;
let e = false + abcOrXyzOrNumber;
let f = abcOrXyzOrNumber++;
let g = --abcOrXyzOrNumber;
let h = abcOrXyzOrNumber ^ 10;
let i = abcOrXyzOrNumber | 10;
let j = abc < xyz;
let k = abc === xyz;
let l = abc != xyz;

//// [stringLiteralTypesWithVariousOperators02.js]
let abc = "ABC";
let xyz = "XYZ";
let abcOrXyz = abc || xyz;
let abcOrXyzOrNumber = abcOrXyz || 100;
let a = abcOrXyzOrNumber + 100;
let b = 100 + abcOrXyzOrNumber;
let c = abcOrXyzOrNumber + abcOrXyzOrNumber;
let d = abcOrXyzOrNumber + true;
let e = false + abcOrXyzOrNumber;
let f = abcOrXyzOrNumber++;
let g = --abcOrXyzOrNumber;
let h = abcOrXyzOrNumber ^ 10;
let i = abcOrXyzOrNumber | 10;
let j = abc < xyz;
let k = abc === xyz;
let l = abc != xyz;
