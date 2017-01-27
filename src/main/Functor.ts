interface Functor<T, F extends Functor<T, F>> {
    map<U>(f: (value: T) => U): F;
}

export default Functor;