/* eslint-env mocha */

import chai from 'chai';

import QPool from '../src/qPool';

const expect = chai.expect;

const q1 = ' cat ';
const q2 = ' fish ';
const q3 = ' goat ';
const q4 = ' sheep ';

describe('QPool - process prototype', () => {
  const tq = QPool({ maxIn: 3 });
  it('maintains the required size', () => {
    tq.process(q1);
    tq.process(q2);
    tq.process(q3);
    tq.process(q4);
    expect(tq.get()).to.be.equal(q2 + q3 + q4);
  });
  describe('queue as default', () => {
    it('shifts all over size elemets form pool', (done) => {
      context('using cb', () => {
        tq.flush();
        // add 4 ones
        tq.push(q1);
        tq.push(q2);
        tq.push(q3);
        tq.push(q4);
        // process with two
        tq.process(q1, (r) => {
          expect(r).to.be.equal(q3 + q4 + q1);
          done();
        });
      });
    });
  });
  describe('using stack', () => {
    it('shifts all over size elemets form pool', (done) => {
      context('using cb', () => {
        tq.flush();
        // add 4 ones
        tq.push(q1);
        tq.push(q2);
        tq.push(q3);
        tq.push(q4);
        // console.log(tq.get());
        // process with two
        tq.process(q3, 'stack', (r) => {
          expect(r).to.be.equal(q1 + q2 + q3);
          done();
        });
      });
    });
    it('tests without cb', () => {
      tq.process(q4, 'stack');
      expect(tq.get()).to.be.equal(q1 + q2 + q4);
    });
  });
});
