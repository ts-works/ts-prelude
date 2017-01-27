import Monad from './Monad';
import IteratorAggregate from './typedef/IteratorAggregate';

export default class Seq<T> implements Monad<T, Seq<T>> {
    private iterable: IteratorAggregate<T>;

    private constructor(iterable: IteratorAggregate<T>) {
        this.iterable = iterable;
    }

    static of<T>(...items: T[]) {
        return new Seq({ [Symbol.iterator]: () => items[Symbol.iterator]() });
    }

    static from<T>(iterable: IteratorAggregate<T>) {
        return new Seq(iterable);
    }

     static generate<T>(gen: Function): Seq<T> {
        return new Seq<T>({ [Symbol.iterator]: gen })
    }

    map<U>(f: (value: T) => U): Seq<U> {
        const self = this;

        const gen = function* () {
            const iterator = self.iterable[Symbol.iterator]();

            let result = iterator.next();

            while (!result.done) {
                yield f(result.value);
                result = iterator.next();
            }
        }

        return Seq.generate(gen);
    }

    static flatten<T>(seq: Seq<Seq<T>>): Seq<T> {
        return Seq.generate(function* () {
            const gen = seq[Symbol.iterator]();

            let result = gen.next();

            while (!result.done) {
                yield* result.value;

                result = gen.next();
            }    
        });
    }

    flatMap<U>(f: (value: T) => Seq<U>): Seq<U> {
        return Seq.flatten(this.map(f));     
    }

    forEach(effect: (item: T) => void) {
        const iterator = this.iterable[Symbol.iterator]();

        let result = iterator.next();

        while (!result.done) {
            effect(result.value);
            result = iterator.next();
        }
    }

    [Symbol.iterator]() {
        return this.iterable[Symbol.iterator]();
    }
}
