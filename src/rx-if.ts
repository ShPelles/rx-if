import { iif, Observable, of, OperatorFunction } from 'rxjs';
import { pipeFromArray } from 'rxjs/internal/util/pipe';
import { switchMap } from 'rxjs/operators';

export function rxIf<T>(predicate: (value: T, index: number) => boolean): RxIf<T> {
  return new RxIf(predicate);
}



class RxIf<T> {
  constructor(
    private predicate: (value: T, index: number) => boolean,
  ) { }

  then(): OperatorFunction<T, T> & RxElse<T, T>;
  then<A>(op1: OperatorFunction<T, A>): OperatorFunction<T, A> & RxElse<T, A>;
  then<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B> & RxElse<T, B>;
  then<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C> & RxElse<T, C>;
  then<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D> & RxElse<T, D>;
  then<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E> & RxElse<T, E>;
  then<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F> & RxElse<T, F>;
  then<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G> & RxElse<T, G>;
  then<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H> & RxElse<T, H>;
  then<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I> & RxElse<T, I>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  then<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<unknown, unknown> & RxElse<unknown, unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  then(...operations: OperatorFunction<any, any>[]): OperatorFunction<T, any> & RxElse<any, any> {
    const operatorFunction = (source: Observable<T>) => source.pipe(
      switchMap((v: T, index: number) => iif(
        () => this.predicate(v, index),
        of(v).pipe(pipeFromArray(operations)),
        of(v),
      )),
    );
    const rxElse = new RxElse(this.predicate, ...operations);
    operatorFunction.else = rxElse.else.bind(rxElse);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return operatorFunction as OperatorFunction<T, any> & RxElse<any, any>;
  }
}



class RxElse<T, R> {
  constructor(
    private predicate: (value: T, index: number) => boolean,
    ...trueOperations: OperatorFunction<unknown, unknown>[]
  ) {
    // A parameter property cannot be declared using a rest parameter. ts(1317)
    this.trueOperations = trueOperations;
  }
  private trueOperations: OperatorFunction<unknown, unknown>[]

  else(): OperatorFunction<T, T | R>;
  else<A>(op1: OperatorFunction<T, A>): OperatorFunction<T, A | R>;
  else<A, B>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>): OperatorFunction<T, B | R>;
  else<A, B, C>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>): OperatorFunction<T, C | R>;
  else<A, B, C, D>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>): OperatorFunction<T, D | R>;
  else<A, B, C, D, E>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>): OperatorFunction<T, E | R>;
  else<A, B, C, D, E, F>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>): OperatorFunction<T, F | R>;
  else<A, B, C, D, E, F, G>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>): OperatorFunction<T, G | R>;
  else<A, B, C, D, E, F, G, H>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>): OperatorFunction<T, H | R>;
  else<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>): OperatorFunction<T, I | R>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  else<A, B, C, D, E, F, G, H, I>(op1: OperatorFunction<T, A>, op2: OperatorFunction<A, B>, op3: OperatorFunction<B, C>, op4: OperatorFunction<C, D>, op5: OperatorFunction<D, E>, op6: OperatorFunction<E, F>, op7: OperatorFunction<F, G>, op8: OperatorFunction<G, H>, op9: OperatorFunction<H, I>, ...operations: OperatorFunction<any, any>[]): OperatorFunction<unknown, unknown>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  else(...falseOperations: OperatorFunction<any, any>[]): OperatorFunction<T, any> {
    return (source: Observable<T>) => source.pipe(
      switchMap((v: T, index: number) => iif(
        () => this.predicate(v, index),
        of(v).pipe(pipeFromArray(this.trueOperations)),
        of(v).pipe(pipeFromArray(falseOperations)),
      )),
    );
  }
}
