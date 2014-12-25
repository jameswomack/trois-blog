'use strict';

var log = require('debug')('blog:worker:sync'),
  ghdownload = require('github-download'),
  Bluebird = require('bluebird'),
  thunkify = require('thunkify'),
  mkdirp = require('mkdirp'),
  rimraf = require('rimraf'),
  path = require('path'),
  _ = require('lodash');

// Synchronizes repo to local folder
// defaults is cesarandreu/blog#master to trois-blog/public/repo
// expects opts.destination, opts.user, opts.repo, opts.ref
module.exports = function* repoSync (opts) {
  opts = opts || {};
  _.defaults(opts, {
    ref: 'master',
    repo: 'blog',
    user: 'cesarandreu',
    destination: path.resolve(__dirname, '../public/repo')
  });

  log('running rf -rf %s', opts.destination);
  yield thunkify(rimraf)(opts.destination);

  log('running mkdir -p %s', opts.destination);
  yield thunkify(mkdirp)(opts.destination);

  log('downloading repo to %s', opts.destination);
  yield downloadRepo(opts);
};

function downloadRepo (opts) {
  return new Bluebird(function (resolve, reject) {
    ghdownload(opts, opts.destination).on('error', reject).on('end', resolve);
  });
}