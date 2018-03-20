const debug = require('debug')('AbstractEnvironment');

/* eslint-disable no-unused-vars,class-methods-use-this */

class AbstractEnvironment {
  constructor(options) {
    debug('Initializing...');

    this._errbacks = [];
    this._options = options;
  }

  getOptions() {
    return this._options;
  }

  addErrBack(errback) {
    this._errbacks.push(errback);
  }

  removeErrBack(errback) {
    this._errbacks = this._errbacks.filter(e => e !== errback);
  }

  /**
   * Prepare environment
   * @returns {Promise}
   */
  async prepare() {
    debug('Preparing...');
    return Promise.resolve();
  }

  /**
   * Tear down environment
   * @returns {Promise}
   */
  async tearDown() {
    debug('Tear down...');
    return Promise.resolve();
  }

  /**
   * EvaluateJs in the environment
   * @returns {Promise}
   */
  async evaluateJs() {
    throw new Error('You must redefine evaluateJs method in child environment');
  }

  /**
   * Take a snapshot
   * @returns {Promise}
   */
  async snapshot() {
    throw new Error('Current environment does not support snapshots');
  }

  /**
   * Wait for page load
   * @param {number} timeout
   * @returns {Promise}
   */
  async waitForPage(timeout) {
    throw new Error('You must redefine waitForPage method in child environment');
  }

  async waitForQuery(uri, timeout) {
    throw new Error('You must redefine waitForQuery method in child environment');
  }

  async back() {
    throw new Error('You must redefine back method in child environment');
  }

  async mouseDown() {
    throw new Error('You must redefine mouseDown method in child environment');
  }

  async mouseUp() {
    throw new Error('You must redefine mouseUp method in child environment');
  }

  async mouseClick() {
    throw new Error('You must redefine mouseClick method in child environment');
  }

  async mouseMove() {
    throw new Error('You must redefine mouseMove method in child environment');
  }

  /**
   * Get vendor file paths
   *
   * @return {Array.<String>}
   * @protected
   */
  _getVendors() {
    return [
      require.resolve('../vendor/sizzle.min.js'),
      require.resolve('../vendor/xhr.sniffer.js'),
    ];
  }
}

module.exports = AbstractEnvironment;
