//// [tests/cases/compiler/unusedSetterInClass2.ts] ////

//// [unusedSetterInClass2.ts]
// Unlike everything else, a setter without a getter is used by a write access.
class Employee {
    private set p(_: number) {}

    m() {
        this.p = 0;
    }
}

//// [unusedSetterInClass2.js]
// Unlike everything else, a setter without a getter is used by a write access.
class Employee {
    set p(_) { }
    m() {
        this.p = 0;
    }
}
