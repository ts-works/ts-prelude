import Monad from './Monad';

export default class Validation<T, E> implements Monad<T, Validation<T, E>> {
    private success: T;
    private failure: E;

    private constructor(success: T, failure: E) {
        this.success = success;
        this.failure = failure;
    }

    static success<T>(value: T): Validation<T, any> {
        return new Validation(value, null);
    }

    static failure<E>(value: E): Validation<any, E> {
        return new Validation(null, value);
    }

     map<U>(f: (value: T) => U): Validation<U, E> {
         return this.isSuccess()
             ? Validation.success(f(this.success))
             : this as Validation<any, E>;
    }

    flatMap<U>(f: (value: T) => Validation<T, E>): Validation<U, E> {
        return this.isSuccess()
            ? f(this.success)
            : this as Validation<any, E> 
     }

    isSuccess() {
        return this.success !== null;
    }

    isFailure() {
        return !this.isSuccess();
    }

    toString() {
        return this.success !== null
            ? `Validation.success(${this.success})`
            : `Validation.failure(${this.failure})`;
    }    
}
