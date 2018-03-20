// var libFolder = process.env.JSCOV ? '../lib-cov/' : '../lib/';
const AbstractEnvironment = require('../lib/AbstractEnvironment');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');

chai.should();
chai.use(chaiAsPromised);
const expect = chai.expect;
const assert = chai.assert;

process.on('unhandledRejection', () => {
  // Do nothing; we test these all the time.
});
process.on('rejectionHandled', () => {
  // Do nothing; we test these all the time.
});


let env;
const url = 'https://github.com/redco/goose-parser';

describe('AbstractEnvironment', () => {
  before(() => {
    env = new AbstractEnvironment({
      url,
    });
  });
  it('._getVendors()', () => {
    const compareVendors = [
      require.resolve('../vendor/sizzle.min.js'),
      require.resolve('../vendor/xhr.sniffer.js'),
    ];
    const vendors = env._getVendors();
    expect(vendors.length).equal(compareVendors.length);
    expect(vendors[0]).equal(compareVendors[0]);
    expect(vendors[1]).equal(compareVendors[1]);
  });
  it('.evaluateJs', () => {
    return assert.isRejected(env.evaluateJs(), Error, /You must redefine evaluateJs method in child environment/);
  });
  it('.snapshot', () => {
    return assert.isRejected(env.snapshot(), Error, /Current environment does not support snapshots/);
  });
  it('.waitForPage', () => {
    return assert.isRejected(env.waitForPage(), Error, /You must redefine waitForPage method in child environment/);
  });
  it('.waitForQuery', () => {
    return assert.isRejected(env.waitForQuery(), Error, /You must redefine waitForQuery method in child environment/);
  });
  it('.back', () => {
    return assert.isRejected(env.back(), Error, /You must redefine back method in child environment/);
  });
  it('.mouseDown', () => {
    return assert.isRejected(env.mouseDown(), Error, /You must redefine mouseDown method in child environment/);
  });
  it('.mouseUp', () => {
    return assert.isRejected(env.mouseUp(), Error, /You must redefine mouseUp method in child environment/);
  });
  it('.mouseClick', () => {
    return assert.isRejected(env.mouseClick(), Error, /You must redefine mouseClick method in child environment/);
  });
  it('.mouseMove', () => {
    return assert.isRejected(env.mouseMove(), Error, /You must redefine mouseMove method in child environment/);
  });
  it('.prepare', async () => {
    return assert.isFulfilled(env.prepare());
  });
  it('.tearDown', async () => {
    return assert.isFulfilled(env.tearDown());
  });
  it('.getOptions', async () => {
    const options = env.getOptions();
    assert.typeOf(options, 'object');
    assert.equal(options.url, url);
  });
  it('errBacks', async () => {
    const testErrBack = () => {
    };
    env.addErrBack(testErrBack);
    assert.lengthOf(env._errbacks, 1);
    assert.equal(env._errbacks[0], testErrBack);
    env.removeErrBack(testErrBack);
    assert.lengthOf(env._errbacks, 0);
  });
});
