
currentDirectory::/home/src/workspaces/project
useCaseSensitiveFileNames::true
Input::--noCheck --outFile built
//// [/home/src/workspaces/project/a.ts] new file
export const a = "hello
//// [/home/src/workspaces/project/b.ts] new file
export const b = 10;
//// [/home/src/workspaces/project/tsconfig.json] new file
{
	"compilerOptions": {
		"declaration": true,
	}
}

ExitStatus:: 2

CompilerOptions::{
    "noCheck": true,
    "outFile": "/home/src/workspaces/project/built"
}
Output::
a.ts(1,24): error TS1002: Unterminated string literal.


Found 1 error in a.ts[90m:1[0m

//// [/home/src/workspaces/project/a.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.a = void 0;
exports.a = "hello;

//// [/home/src/workspaces/project/a.ts] no change
//// [/home/src/workspaces/project/b.js] new file
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.b = void 0;
exports.b = 10;

//// [/home/src/workspaces/project/b.ts] no change
//// [/home/src/workspaces/project/tsconfig.json] no change

