import Functor from './Functor';

interface Monad<T, M extends Monad<T, M>> extends Functor<T, M> {
    flatMap<U>(f: (value: T) => M): M;
}

export default Monad;
