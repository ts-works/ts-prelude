import Monad from './Monad';

export default class Either<L, R> implements Monad<R, Either<L, R>> {
    private left: L;
    private right: R;

    private constructor(left: L, right: R) {
        this.left = left;
        this.right = right;
    }

    static left<L>(value: L): Either<L, any> {
        return new Either(value, null);
    }

    static right<R>(value: R): Either<any, R> {
        return new Either(null, value);
    }

     map<U>(f: (value: R) => U): Either<L, U> {
        return this.right !== null
            ? Either.right(f(this.right))
            : this as Either<L, any>
    }

    flatMap<U>(f: (value: R) => Either<L, U>): Either<L, U> {
        return this.right !== null
            ? f(this.right)
            : this as Either<L, any> 
    }

    toString() {
        return this.right !== null
            ? `Either.right(${this.right})`
            : `Either.left(${this.left})`;
    }
}
