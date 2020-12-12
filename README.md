# Queue-Pool

> Pool works as queue or stack.

`Queue-Pool` Is pool of elements, implements major Array methods. With ability to auto-adjust length.

## Why?

If you handle a group of incoming streams of chunks, process them in a pool, there is a need to release them in
<a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)">stack</a> or <a href="https://en.wikipedia.org/wiki/Queue_(abstract_data_type)">queue</a> order.

## Getting Started

```sh
npm install queue-pool
```

## Usage

```js
import QPool from "queue-pool";

const qpool = new QPool(options);
```

`options`

- `init` for custom initialize, instead of empty string as default.
- `maxIn` a number, for max size allowed in pool. `Default` is 2.

`Methods`

- `get`
- `length`
- `elementsSize` an array contains size of each element in the pool.
- `elementsLength` a number of elements in.
- `flush`
- `unshift`
- `push`
- `shift`
- `pop`
- `process` push and adjust the size.

  `process(input, type, cb)`

  - type: stack or queue. `Default` is queue.
  - cb(get): optional.

  > In case you made several `push` calls passing the allowed number set in `maxIn`.
  > It auto `shift` in case of queue/ `pop` in case of stack over elements and then `push` the new one.
  > Using this method you guarantee that you are not passing the number of elements you set.

## Example

```js
const qpool = new QPool();
qpool.push("pigs, "); // pigs,
qpool.push("goats, "); // pigs, goats,
qpool.push("sheep."); // pigs, goats, sheep.
qpool.shift(); // goats, sheep.
qpool.pop(); // goats,
qpool.unshift("sheep, "); // sheep, goats,
qpool.elementsLength(); // 2
qpool.elementsSize(); // [7 , 7]
qpool.length(); // 14
```

### with queue

```js
const qpool = new QPool({ maxIn: 5 });
for (let i = 0; i < 10; i++) qpool.push(`${i} `);
qpool.get(); // 0 1 2 3 4 5 6 7 8 9
qpool.process("last-element");
qpool.get(); // 6 7 8 9 last-element
```

### with stack and callback

```js
const qpool = new QPool({ maxIn: 5 });
for (let i = 0; i < 10; i++) qpool.push(`${i} `);
qpool.get(); // 0 1 2 3 4 5 6 7 8 9
qpool.process("last-element", "stack", (get) => {
  console.log(get); //  0, 1, 2, 3 last-element
});
```

## Tests

```sh
test
```

## License

This project is licensed under the [MIT License](https://github.com/jalal246/queue-pool/blob/master/LICENSE)
