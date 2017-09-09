/* eslint-env mocha */
import chai from 'chai';

import QPool from '../src/qPool';

const expect = chai.expect;

const q1 = ' Dr. suez  \n';
const q2 = 'Peace cannot be kept by force; it can only be achieved by understanding ― Albert Einstein';
const q3 = 'And O there are days in this life, worth life and worth death. ― Charles Dickens';
const q4 = 'Sometimes it takes a good fall to really know where you stand ― Hayley Williams';

describe('QPool - test prototypes', () => {
  const tq = new QPool();
  it('adds 4 strings using pushg', () => {
    tq.push(`${q1}`);
    tq.push(`${q2}`);
    tq.push(`${q3}`);
    tq.push(`${q4}`);
  });
  it('tests queue prototype', () => {
    expect(tq.elementsSize()).to.have.ordered.members([
      q1.length,
      q2.length,
      q3.length,
      q4.length,
    ]);
  });
  it('shifts 3 string form queue using shift', () => {
    tq.shift();
    tq.shift();
    tq.shift();
  });
  it('tests get prototype', () => {
    expect(tq.get()).to.be.equal(q4);
  });
  it('tests in prototype', () => {
    expect(tq.elementsLength()).to.be.equal(1);
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
