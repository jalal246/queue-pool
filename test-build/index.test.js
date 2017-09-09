/* eslint-env mocha */

import chai from 'chai';

import cjsImport from '../dist/qPool.cjs';
import umdImport from '../dist/qPool.umd';
import esImport from '../dist/qPool.es';

const expect = chai.expect;

const isFn = x => typeof x === 'function';

describe('QPool - test build', () => {
  it('CommonJS', () => {
    expect(isFn(cjsImport)).to.be.equal(true);
  });
  it('umd', () => {
    expect(isFn(umdImport)).to.be.equal(true);
  });
  it('es', () => {
    expect(isFn(esImport)).to.be.equal(true);
  });
});
