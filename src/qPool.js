/* eslint func-names: ["error", "never"] */

const DEFAULT_MAX_IN = 2;

function QPool(opt) {
  if (!(this instanceof QPool)) {
    return new QPool(opt);
  }
  this.opts = opt || {};
  this.pool = this.opts.init || '';
  this.maxIn = this.opts.maxIn || DEFAULT_MAX_IN;
  this.size = [];
}

// returns pool
QPool.prototype.get = function () {
  return this.pool;
};

// returns pool length
QPool.prototype.length = function () {
  return this.pool.length;
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
  this.size.push(chunk.length);
};

// enqueue, to first.
QPool.prototype.unshift = function (chunk) {
  // add chunk
  this.pool = chunk + this.pool;
  // add chunk size
  this.size.unshift(chunk.length);
};


// dequeue, first
QPool.prototype.shift = function () {
  // add chunk
  this.pool = this.pool.slice(
    this.size[0],
    this.pool.toString().length,
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

QPool.prototype.process = function (chunk, cb) {
  if (this.elementsLength() < this.maxIn) this.push(chunk);
  else if (this.elementsLength() === this.maxIn) {
    this.push(chunk);
    this.shift();
  } else {
    while (this.elementsLength() >= this.maxIn) {
      this.shift();
    }
    this.push(chunk);
  }
  if (typeof cb === 'function') cb();
};

export default QPool;
