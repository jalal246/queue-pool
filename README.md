[![NPM](https://nodei.co/npm/queue-pool.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/queue-pool/)

[![Travis](https://img.shields.io/travis/rust-lang/rust.svg?style=flat-square)](https://travis-ci.org/Jimmy02020/queue-pool)
[![Codecov](https://img.shields.io/codecov/c/github/codecov/example-python.svg?style=flat-square)](https://codecov.io/gh/Jimmy02020/queue-pool)
[![module formats: umd, cjs, es](https://img.shields.io/badge/module%20formats-umd%2C%20cjs%2C%20es-green.svg?style=flat-square)](https://unpkg.com/queue-pool/dist/)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://github.com/Jimmy02020/queue-pool/blob/master/LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/Jimmy02020/queue-pool/pulls)

> Pool works as queue or stack.

`Queue-Pool` Is pool of elements, with implementation of major Array methods. And ability to auto-adjust length.

Why?
---
If you handle a group of incoming streams of chunks, process them in a pool, there is a need to release them in
<a href="https://en.wikipedia.org/wiki/Stack_(abstract_data_type)">stack</a> or <a href="https://en.wikipedia.org/wiki/Queue_(abstract_data_type)">queue</a> order.

Getting Started
---------------

NPM
```sh
npm install queue-pool
```

CDN
```sh
https://unpkg.com/queue-pool/dist/
```

Using
-----

```javascript
import QPool from 'queue-pool';

const qpool = new QPool(options);
```

`options`

* `init` for custom initialize, instead of empty string as default.
* `maxIn` a number, for max size allowed in pool. `Default` is 2.

`Methods`

* `get`
* `length`
* `elementsSize` an array contains size of each element in the pool.
* `elementsLength` a number of elements in.
* `flush`
* `unshift`
* `push`
* `shift`
* `pop`
* `process` push and adjust the size.

  `process(input, type, cb)`
  - type: stack or queue. `Default` is queue.
  - cb(get): optional.


  > In case you made several `push` calls passing the allowed number set in `maxIn`.
    It auto `shift` in case of queue/ `pop` in case of stack over elements and then `push` the new one.
    Using this method you guarantee that you are not passing the number of elements you set.


Example:
-------

###### General using

```javascript
const qpool = new QPool();
qpool.push('pigs, '); // pigs,
qpool.push('goats, '); // pigs, goats,
qpool.push('sheep.'); // pigs, goats, sheep.
qpool.shift(); // goats, sheep.
qpool.pop(); // goats,
qpool.unshift('sheep, '); // sheep, goats,
qpool.elementsLength() // 2
qpool.elementsSize()  // [7 , 7]
qpool.length() // 14
```

###### Using queue:

```javascript
const qpool = new QPool({ maxIn: 5 });
for (let i = 0; i < 10; i++) qpool.push(`${i} `);
qpool.get() // 0 1 2 3 4 5 6 7 8 9
qpool.process("last-element");
qpool.get() // 6 7 8 9 last-element
```
###### Using stack with callback:

```javascript
const qpool = new QPool({ maxIn: 5 });
for (let i = 0; i < 10; i++) qpool.push(`${i} `);
qpool.get() // 0 1 2 3 4 5 6 7 8 9
qpool.process("last-element", 'stack', (get)=>{
  console.log(get); //  0, 1, 2, 3 last-element
});
```

Tests
-----

```sh
npm test
```

License
-------

This project is licensed under the [MIT License](https://github.com/Jimmy02020/queue-pool/blob/master/LICENSE)

Other Solutions
---------------

For border view you can take a look of [`queue`](https://github.com/jessetane/queue) as well.
