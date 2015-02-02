'use strict';
var React = require('react');
var FluxibleApp = require('fluxible');
var routrPlugin = require('fluxible-plugin-routr');
var fetcherPlugin = require('./lib/fetcherPlugin');

var fetcher = require('./lib/Fetcher')({
  posts: require('./fetcher/posts')
});

var app = new FluxibleApp({
  appComponent: React.createFactory(require('./components/Application.jsx'))
});

// Plugins
app.plug(fetcherPlugin({
  request: require('superagent'),
  fetcher: fetcher
}));
app.plug(routrPlugin({
  routes: require('./configs/routes')
}));

app.registerStore(require('./stores/ApplicationStore'));
app.registerStore(require('./stores/PostListStore'));
app.registerStore(require('./stores/PostStore'));

module.exports = app;
