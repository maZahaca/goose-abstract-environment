const debug = require('debug')('AbstractEnvironment');

/* eslint-disable no-unused-vars,class-methods-use-this */

class AbstractEnvironment {
  constructor(options) {
    debug('Initializing...');

    this._options = options;
    this._callbacks = {};
  }

  getOptions() {
    return this._options;
  }

  /**
   * @param {string} type one of "navigation", "request", "error"
   * @param {Object} callback
   * @param {Function} callback.fn
   * @param {?string} callback.urlPattern
   */
  addCallback(type, callback) {
    debug('Added %s callback', type);
    if (!this._callbacks[type]) {
      this._callbacks[type] = [];
    }
    this._callbacks[type].push(callback);
  }

  /**
   * @param {string} type
   * @param {Object} callback
   * @param {Function} callback.fn
   * @param {?string} callback.urlPattern
   */
  removeCallback(type, callback) {
    debug('Removed %s callback', type);
    const typedCallbacks = this._callbacks[type] || [];
    const foundIndex = typedCallbacks.findIndex(clbk => clbk === callback);
    if (foundIndex !== -1 && this._callbacks[type] && this._callbacks[type][foundIndex]) {
      this._callbacks[type].splice(foundIndex, 1);
    }
  }

  evaluateCallbacks(type, url, args = {}) {
    if (!this._callbacks[type]) {
      return;
    }
    let fired = 0;
    let index;
    // eslint-disable-next-line no-cond-assign
    while (
      (index = this._callbacks[type].findIndex(callback =>
        !callback.urlPattern || !url || url.match(callback.urlPattern))) !== -1) {
      const callback = this._callbacks[type][index];
      this._callbacks[type].splice(index, 1);
      callback.fn(args);
      fired += 1;
    }
    debug('fired %s callbacks', fired);
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
   * @param url
   * @return {Promise<void>}
   */
  async goto(url) {
    throw new Error('You must redefine goto method in child environment');
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
