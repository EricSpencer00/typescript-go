//// [tests/cases/compiler/nullableFunctionError.ts] ////

//// [nullableFunctionError.ts]
null();
undefined();
let f: null | undefined;
f();


//// [nullableFunctionError.js]
null();
undefined();
let f;
f();
