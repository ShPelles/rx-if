# Rx-if

## Installation

```bash
npm install rx-if
```

## Usage

```js
interval(1000).pipe(
  map(n => n + 1),
  rxIf(n => n % 3 === 0).pipe(
    mapTo('Fizz'),
  ),
  take(7),
).subscribe(console.log);
// output: 1, 2, Fizz, 4, 5, Fizz, 7
```

```js
interval(1000).pipe(
  rxIf(n => n % 2 === 0).pipe(
    map(n => n / 2),
  ).else(
    map(n => n * 2)
  ),
  take(10),
).subscribe(console.log);
// output: 0, 2, 1, 6, 2, 10, 3, 14, 4, 18
```

```js
const messages$ = userService.currentUser().pipe(
  rxIf(user => user === null).pipe(
    switchMap(() => userService.createUser()),
    switchMap(user => messagesService.createWelcomeMessage(user)),
  ).else(
    switchMap(user => messagesService.getMessages(user)),
  ),
  map(messages => orderByDate(messages)),
  rxIf(messages => messages.length > 5).pipe(
    map(messages => messages.slice(-5)),
  )
);
```
