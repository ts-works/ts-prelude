import Monad from './Monad';

export default class Identity<T> implements Monad<T, Identity<T>> {
    private value: T;

    private constructor(value: T) {
        this.value = value;
    }

    static of<T>(value: T) {
        return new this(value);
    }

    map<U>(f: (value: T) => U): Identity<U> {
        return Identity.of(f(this.value));
    }

    flatMap<U>(f: (value: T) => Identity<U>): Identity<U> {
        return Identity.of(f(this.value).value);
    }

    toString() {
        return `Identity(${this.value})`;
    }
}
