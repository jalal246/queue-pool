/* eslint-env mocha */
import chai from 'chai';

import QPool from '../src/qPool';

const expect = chai.expect;

const q1 = ' cat ';
const q2 = ' fish ';
const q3 = ' goat ';
const q4 = ' sheep ';

describe('QPool - general prototypes', () => {
  const tq = new QPool();
  it('push 4 inputs', () => {
    tq.push(`${q1}`);
    tq.push(`${q2}`);
    tq.push(`${q3}`);
    tq.push(`${q4}`);
    expect(tq.get()).to.be.equal(q1 + q2 + q3 + q4);
  });
  it('shift 1 input', () => {
    tq.shift();
    expect(tq.get()).to.be.equal(q2 + q3 + q4);
  });
  it('pop 1 input', () => {
    tq.pop();
    expect(tq.get()).to.be.equal(q2 + q3);
  });
  it('unshift 1 input', () => {
    tq.unshift(q1);
    expect(tq.get()).to.be.equal(q1 + q2 + q3);
  });
  it('tests prototype elementsSize', () => {
    expect(tq.elementsSize()).to.have.ordered.members([
      q1.length,
      q2.length,
      q3.length,
    ]);
  });
  it('tests prototype elementsLength', () => {
    expect(tq.elementsLength()).to.be.equal(3);
  });
  it('tests flush prototype', () => {
    tq.flush();
    expect(tq.get()).to.be.equal('');
  });
  it('tests length prototype', () => {
    tq.flush();
    expect(tq.length()).to.be.equal(0);
  });
});
