/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

var path = require('path');
var os = require('os');
var fs = require('fs');

var test = require('tape');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

var css = require('../lib/css');

var tmpdir = os.tmpdir();
var outDir = path.join(tmpdir, 'famous-dist-generator', 'css-' + Date.now());

var famousSRC = path.join(__dirname, '..', 'node_modules', 'famous', 'src');

test('css: setup temp directory', function (t) {
  t.plan(1);
  mkdirp(outDir, function (err) {
    t.error(err, 'the output folder should be made without an error');
  });
});

test('css: build', function (t) {
  t.plan(2);
  css(famousSRC, outDir, function (err) {
    t.error(err, 'the process should complete without an error');
    t.ok(fs.existsSync(path.join(outDir, 'famous.css')), 'famous.css should exist');
  });
});

test('css: teardown', function (t) {
  t.plan(1);
  rimraf(outDir, function (err) {
    t.error(err, 'the folder should be removed without an error');
  });
});
