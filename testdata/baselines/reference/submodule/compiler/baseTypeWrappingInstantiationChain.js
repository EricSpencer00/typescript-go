//// [tests/cases/compiler/baseTypeWrappingInstantiationChain.ts] ////

//// [baseTypeWrappingInstantiationChain.ts]
class CBaseBase<T3> {
    constructor(x: Parameter<T3>) { }
}

class CBase<T2> extends CBaseBase<Wrapper<T2>> {

}

class Parameter<T4> {
    method(t: T4) { }
}

class Wrapper<T5> {
    property: T5;
}

class C<T1> extends CBase<T1> {
    public works() {
        new CBaseBase<Wrapper<T1>>(this);
    }
    public alsoWorks() {
        new CBase<T1>(this); // Should not error, parameter is of type Parameter<Wrapper<T1>>
    }

    public method(t: Wrapper<T1>) { }
}


//// [baseTypeWrappingInstantiationChain.js]
class CBaseBase {
    constructor(x) { }
}
class CBase extends CBaseBase {
}
class Parameter {
    method(t) { }
}
class Wrapper {
    property;
}
class C extends CBase {
    works() {
        new CBaseBase(this);
    }
    alsoWorks() {
        new CBase(this); // Should not error, parameter is of type Parameter<Wrapper<T1>>
    }
    method(t) { }
}
