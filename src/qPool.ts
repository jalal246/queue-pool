/* eslint func-names: ["error", "never"] */

const isF = (x) => typeof x === "function";

const len = (x) => x.toString().length;

export interface Options {
  init?: string;
  maxIn?: number;
}

export default class QPool<T> {
  opts: Options;
  pool: string;
  maxIn: number;
  size: number[];
  constructor(opt: Options) {
    this.opts = opt || {};
    this.pool = this.opts.init || "";
    this.maxIn = this.opts.maxIn || 2;
    this.size = [];
  }

  // returns pool
  get() {
    return this.pool;
  }

  // returns pool length
  length() {
    return len(this.pool);
  }

  // returns string sizes
  elementsSize() {
    return this.size;
  }

  // returns string sizes
  elementsLength() {
    return this.size.length;
  }

  flush() {
    this.pool = "";
    this.size = [];
  }

  // enqueue, to last.
  push(chunk) {
    // add chunk
    this.pool += chunk;
    // add chunk size
    this.size.push(len(chunk));
  }

  // enqueue, to first.
  unshift(chunk) {
    // add chunk
    this.pool = chunk + this.pool;
    // add chunk size
    this.size.unshift(len(chunk));
  }

  // dequeue, first
  shift() {
    // add chunk
    this.pool = this.pool.slice(this.size[0], this.length());
    // add chunk size
    this.size.shift();
  }

  // dequeue, last
  pop() {
    // add chunk
    this.pool = this.pool.slice(
      0,
      this.length() - this.size[this.elementsLength() - 1]
    );
    // add chunk size
    this.size.pop();
  }

  // clear over size elemets either shift or pop.
  clr(func) {
    while (this.elementsLength() >= this.maxIn) func.apply(this);
  }

  process(chunk, type, cb) {
    if (type === "stack") this.clr(this.pop);
    else this.clr(this.shift);
    this.push(chunk);
    if (isF(cb)) cb(this.get());
    else if (isF(type)) type(this.get());
  }
}
