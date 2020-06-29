// -*- coding: utf-8, tab-width: 2 -*-

import assert from 'assert';

import cvp from '.';

const eq = assert.deepStrictEqual;

eq(cvp('Hello\nWorld!'), 'string "Hello\\nWorld!"');
eq(cvp(''), 'string ""');
eq(cvp(3.1415), 'number 3.1415');
eq(cvp(), 'undefined');
eq(cvp(null), 'null');
eq(cvp([]), 'array []');
eq(cvp([1, 2, 3]), 'array [1, 2, 3]');
eq(cvp(cvp), 'function describe(x, opt)');






console.info('+OK usage test passed.');
