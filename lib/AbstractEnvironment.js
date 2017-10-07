const vow = require('vow');
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

  /**
   * Prepare environment
   * @returns {Promise}
   */
  prepare() {
    debug('Preparing...');
    return vow.resolve();
  }

  /**
   * Tear down environment
   * @returns {Promise}
   */
  tearDown() {
    debug('Tear down...');
    return vow.resolve();
  }

  /**
   * EvaluateJs in the environment
   * @returns {Promise}
   */
  evaluateJs() {
    throw new Error('You must redefine evaluateJs method in child environment');
  }

  /**
   * Take a snapshot
   * @returns {Promise}
   */
  snapshot() {
    throw new Error('Current environment does not support snapshots');
  }

  /**
   * Wait for page load
   * @param {number} timeout
   * @returns {Promise}
   */
  waitForPage(timeout) {
    throw new Error('You must redefine waitForPage method in child environment');
  }

  back() {
    throw new Error('You must redefine back method in child environment');
  }

  mousedown() {
    throw new Error('You must redefine back method in child environment');
  }

  mouseup() {
    throw new Error('You must redefine back method in child environment');
  }

  addErrback(errback) {
    this._errbacks.push(errback);
  }

  removeErrback(errback) {
    this._errbacks = this._errbacks.filter(e => e !== errback);
  }

  /**
   * Inject libs which are required for parse process
   *
   * @protected
   */
  _injectVendors() {
    debug('.inject()-ing parser libs');
    const filePaths = [
      require.resolve('../vendor/sizzle.min.js'),
      require.resolve('../vendor/xhr.sniffer.js'),
    ];
    return this._injectFiles(filePaths);
  }

  /**
   * @abstract
   * @param {Array.<string>} filePaths
   * @protected
   */
  _injectFiles(filePaths) {
    throw new Error('You must redefine _injectFiles method in child environment');
  }
}

module.exports = AbstractEnvironment;
