/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var ersatzEllip = require('ersatz-ellip'),
  typeOf = require('./typeOf.js'),
  univeil = require('univeil');


function describe(x, opt) {
  if (!opt) { opt = false; }
  var t = typeOf(x), maxlen = ((+opt.previewMaxLen || 0) || 72);
  switch (t) {
  case 'null':
  case 'undefined':
    return t;
  case 'error':
    x = (x.message || x);
    break;
  }
  switch (t) {
  case 'function':
    x = String(x).split(/\s*\{/)[0
      ].replace(/^((?: ?\w)+ |)function\s*/, '$1');
    break;
  case 'array':
  case 'object':
  case 'Object':
  case 'string':
    x = univeil.jsonify(x, null, -1);
    break;
  }
  x = String(x);
  if (x.length > maxlen) {
    x = ersatzEllip(x, maxlen);
    t += '…';
  }
  return t + ' ' + x;
}

describe.typeOf = typeOf;







module.exports = describe;
