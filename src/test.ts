import { marbles } from 'rxjs-marbles/jest';
import { map } from 'rxjs/operators';

it('should marble tests works', marbles(m => {
  const inputs = {
    a: 1,
    b: 2,
    c: 3
  };
  const outputs = {
    x: 2,
    y: 3,
    z: 4
  };

  const source = m.hot('  --^-a-b-c-|', inputs);
  const subs = '            ^-------!';
  const expected = m.cold(' --x-y-z-|', outputs);

  const destination = source.pipe(map(value => value + 1));
  m.expect(destination).toBeObservable(expected);
  m.expect(source).toHaveSubscriptions(subs);
}));
