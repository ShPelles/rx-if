import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';

import { rxIf } from './rx-if';

it('should rxIf.then works', marbles(m => {
  const source = m.hot('  --^-a-b-c-d-|', { a: 1, b: 2, c: 3, d: 4 });
  const subs = '            ^---------!';
  const expected = m.cold(' --w-x-y-z-|', { w: 2, x: 2, y: 6, z: 4 });

  const destination = source.pipe(
    rxIf<number>(v => v % 2 !== 0).then(
      map(v => v * 2),
    ),
  );

  m.expect(destination).toBeObservable(expected);
  m.expect(source).toHaveSubscriptions(subs);
}));

it('should rxIf.then.else works', marbles(m => {
  const source = m.hot('  --^-a-b-c-d-|', { a: 1, b: 2, c: 3, d: 4 });
  const subs = '            ^---------!';
  const expected = m.cold(' --w-x-y-z-|', { w: 2, x: 1, y: 6, z: 2 });

  const destination = source.pipe(
    rxIf<number>(v => v % 2 !== 0).then(
      map(v => v * 2),
    ).else(
      map(v => v / 2),
    ),
  );

  m.expect(destination).toBeObservable(expected);
  m.expect(source).toHaveSubscriptions(subs);
}));
