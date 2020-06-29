/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var isFun = require('is-fn'), isErr = require('is-error');

function typeOf(x) {
  if (x === null) { return 'null'; }
  var t = typeof x;
  if (t === 'object') {
    if (Array.isArray(x)) { return 'array'; }
    if (Buffer.isBuffer(x)) { return 'buffer'; }
    if (isFun(x)) { return 'function'; }
    if (isErr(x)) { return 'error'; }
    return Object.prototype.toString.call(x
      ).replace(/^\[object (\S+)\]$/, '$1');
  }
  return t;
}

module.exports = typeOf;
