/* eslint func-names: ["error", "never"] */


const isF = x => typeof x === 'function';

const len = x => x.toString().length;

function QPool(opt) {
  if (!(this instanceof QPool)) {
    return new QPool(opt);
  }
  this.opts = opt || {};
  this.pool = this.opts.init || '';
  // DEFAULT_MAX_IN = 2;
  this.maxIn = this.opts.maxIn || 2;
  this.size = [];
}

// returns pool
QPool.prototype.get = function () {
  return this.pool;
};

// returns pool length
QPool.prototype.length = function () {
  return len(this.pool);
};

// returns string sizes
QPool.prototype.elementsSize = function () {
  return this.size;
};

// returns string sizes
QPool.prototype.elementsLength = function () {
  return this.size.length;
};


QPool.prototype.flush = function () {
  this.pool = '';
  this.size = [];
};

// enqueue, to last.
QPool.prototype.push = function (chunk) {
  // add chunk
  this.pool += chunk;
  // add chunk size
  this.size.push(len(chunk));
};

// enqueue, to first.
QPool.prototype.unshift = function (chunk) {
  // add chunk
  this.pool = chunk + this.pool;
  // add chunk size
  this.size.unshift(len(chunk));
};

// dequeue, first
QPool.prototype.shift = function () {
  // add chunk
  this.pool = this.pool.slice(
    this.size[0],
    this.length(),
  );
  // add chunk size
  this.size.shift();
};

// dequeue, last
QPool.prototype.pop = function () {
  // add chunk
  this.pool = this.pool.slice(
    0,
    this.length() - this.size[this.elementsLength() - 1],
  );
  // add chunk size
  this.size.pop();
};

// clear over size elemets either shift or pop.
QPool.prototype.clr = function (func) {
  while (this.elementsLength() >= this.maxIn) func.apply(this);
};

QPool.prototype.process = function (chunk, type, cb) {
  if (type === 'stack') this.clr(this.pop);
  else this.clr(this.shift);
  this.push(chunk);
  if (isF(cb)) cb(this.get());
  else if (isF(type)) type(this.get());
};

export default QPool;
