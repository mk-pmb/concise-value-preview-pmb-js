// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert';

import cvp from '..';

function t(input, want) { assert.deepStrictEqual(cvp(input, t.opt), want); }

// Support for async generators started with Node.js 10.3.0,
// but for now I'd like to still support Node.js v8, so to stub it:
t.opt = { cheatForceType: 'function' };
t('async function* gen(era, tor) { yield era; return tor; }',
  'ƒ async *gen(era, tor)');
t.opt = {};




t.opt = { renameTypes: false };
t('Hello\nWorld!',  'string "Hello\\nWorld!"');
t('',               'string ""');
t(3.1415,           'number 3.1415');
t(undefined,        'undefined');
t(null,             'null');
t(true,             'boolean true');
t(false,            'boolean false');
t([],               'array []');
t([1, 2, 3],        'array [1, 2, 3]');











console.info('+OK extra tests passed.');
