import Monad from './Monad';

export default class Maybe<T> implements Monad<T, Maybe<T>> {
    private static NONE = new Maybe(null);
    private value;

    private constructor(value) {
        this.value = value === undefined ? null : value;
    }

    static of<T>(value: T | undefined | null) {
        let ret;

        if (value === undefined || value === null) {
            ret = Maybe.NONE;
        } else {
            ret = new Maybe(value);
        }

        return ret;
    }

    static get none() {
        return Maybe.NONE;
    }

    static just<U>(value: U) {
        if (value === undefined || value === null) {
            throw new TypeError("Maybe.just: First argumenent 'value' must not be " + value);
        }

        return new this(value);
    }

    map<U>(f: (value: T) => U): Maybe<U> {
        return this.value === null
            ? Maybe.NONE
            : Maybe.of(f(this.value));
    }

    flatMap<U>(f: (value: T) => Maybe<U>): Maybe<U> {
        return Maybe.of(f(this.value).value);
    }

    orElse<T>(value: T) {
        return this.value !== null ? this.value : value;
    }

    toString() {
        return this.value === null ? 'Maybe.none' : `Maybe.just(${this.value})`;
    }
}
