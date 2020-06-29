/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX, ersatzEllip = require('ersatz-ellip'),
  typeOf = require('./typeOf.js'),
  quotp = require('./ersatzQuotedPrintable'),
  getOwn = require('getown'),
  univeil = require('univeil');


function describeFunc(f) {
  var a = String(f).split(/\s*(?:\{|(=>))/),
    d = a[0].replace(/^(|(?: ?\w)+ )function\s*(?:(\*)\s*|)/, '$1$2');
  if (a[1]) { d = d.replace(/\(/, a[1] + '('); }
  return d;
}


EX = function describe(x, opt) {
  if (!opt) { opt = false; }
  var t = (opt.cheatForceType || typeOf(x)), o;
  switch (t) {
  case 'null':
  case 'undefined':
    return t;
  case 'error':
    x = (x.message || x);
    break;
  case 'Date':
    x = x.toISOString();
    break;
  }
  switch (t) {
  case 'function':
    x = describeFunc(x);
    break;
  case 'buffer':
    x = '"' + quotp.encode(x) + '"';
    break;
  case 'array':
  case 'object':
  case 'Object':
  case 'string':
    x = univeil.jsonify(x, null, -1);
    break;
  }

  o = opt.renameTypes;
  if (opt.showStdTypes) { o = false; }
  if (o !== false) {
    o = getOwn(o, t, EX.renameTypesDefault[t]);
    if (o !== undefined) { t = o; }
  }

  x = String(x);
  o = ((+opt.previewMaxLen || 0) || 72);
  if (x.length > o) {
    x = ersatzEllip(x, o);
    if (t) { t += '…'; }
  }

  return t + (t && ' ') + x;
};

EX.typeOf = typeOf;
EX.renameTypesDefault = {
  array: '',
  boolean: '',
  number: '',
  object: '',
  string: '',
  function: 'ƒ',
};







module.exports = EX;
