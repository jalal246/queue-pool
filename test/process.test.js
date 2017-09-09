/* eslint-env mocha */

import chai from 'chai';

import QPool from '../src/qPool';

const expect = chai.expect;

const q1 = '> 1 - one';
const q2 = '> 22 - two';
const q3 = '> 333 - three';
const q4 = '> 44444 - four';


describe('qPool - test process', () => {
  const tq = QPool({ maxIn: 3 });
  it('maintains the required size', () => {
    tq.process(q1);
    tq.process(q2);
    tq.process(q3);
    tq.process(q4);
    expect(tq.get()).to.be.equal(q2 + q3 + q4);
  });
  it('shifts all over size elemets form pool', () => {
    tq.flush();
    // add 4 ones
    tq.push(q1);
    tq.push(q1);
    tq.push(q1);
    tq.push(q1);
    // process with two
    tq.process(q2, () => {
      expect(tq.get()).to.be.equal(q1 + q1 + q2);
    });
  });
});
