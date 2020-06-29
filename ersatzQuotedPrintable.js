/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

function hex2(c) {
  var n = c.charCodeAt(0), h = n.toString(16).toUpperCase();
  if (n > 0xFF) { throw new RangeError('Wide characters not supported!'); }
  if (n > 0xF) { return '=' + h; }
  return '=0' + h;
}

module.exports = {

  encode: function ersatzQuotedPrintable_encode(x) {
    // Because we also want to encode stuff that might mislead the reader
    // about what kind of encoding we use here. Also some of the Q-P modules
    // from npm are buggy as hell so I just gave up.
    x = x.toString('latin1').replace(/[\x00-\x1F=\\"'%#&\x7F-\uFFFF]/g, hex2);
    if (/\s$/.test(x)) { x += '='; }
    return x;
  },

};
