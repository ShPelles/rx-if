# Rx-if

## Installation

```bash
npm install rx-if
```

## Usage

```js
interval(1000).pipe(
  map(n => n+1),
  rxIf(n => n%3===0).pipe(
    mapTo('Fizz'),
  ),
);
// output: 1, 2, Fizz, 4, 5, Fizz, 7...
```

```js
interval(1000).pipe(
  rxIf(n => n%2===0).pipe(
    map(n => n/2),
  ).else(
    map(n => n*2)
  ),
);
// output: 0, 2, 1, 6, 2, 10, 3....
```
