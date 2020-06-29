// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert';

import cvp from '..';

const eq = assert.deepStrictEqual;
const buf = Buffer.from;

eq(cvp('Hello!\n¥¤'),   '"Hello!\\n¥¤"');
eq(cvp(''),             '""');
eq(cvp(3.1415),         '3.1415');
eq(cvp(undefined),      'undefined');
eq(cvp(null),           'null');
eq(cvp(true),           'true');
eq(cvp(false),          'false');
eq(cvp([]),             '[]');
eq(cvp([1, 2, 3]),      '[1, 2, 3]');
eq(cvp(new Date(0)),    'Date 1970-01-01T00:00:00.000Z');
eq(cvp(buf('')),        'buffer ""');
eq(cvp(buf('\uFEFF')),  'buffer "=EF=BB=BF"');
eq(cvp(buf('"%?¥=& ')), 'buffer "=22=25?=C2=A5=3D=26 ="');
eq(cvp(/regex/sig),     'RegExp /regex/gis');
// ^-- It seems flags are alphabetically sorted.

// eslint-disable-next-line func-names
eq(cvp(function(ano, nym, ous) { return [ano, nym, ous]; }),
  'ƒ (ano, nym, ous)');
eq(cvp(function named(foo, bar) { return [foo, bar]; }),
  'ƒ named(foo, bar)');
eq(cvp((arrow, func) => [arrow, func]),
  'ƒ =>(arrow, func)');
eq(cvp(function* gen(era, tor) { yield era; return tor; }),
  'ƒ *gen(era, tor)');

// eslint-disable-next-line func-names
eq(cvp(async function(ano, nym, ous) { return [ano, nym, ous]; }),
  'ƒ async (ano, nym, ous)');
eq(cvp(async function named(foo, bar) { return [foo, bar]; }),
  'ƒ async named(foo, bar)');
eq(cvp(async(arrow, func) => [arrow, func]),
  'ƒ async=>(arrow, func)');







console.info('+OK usage tests passed.');
