'use strict';

// TODO - explore require('node-jsx').install({harmony: true})
require('node-jsx').install({ extension: '.jsx' });

var _ = require('lodash'),
  React = require('react'),
  request = require('supertest'),
  thunkify = require('thunkify'),
  serialize = require('serialize-javascript'),
  log = require('debug')('blog:client:middleware:log'),
  navigateAction = require('flux-router-component').navigateAction;

var HtmlComponent = React.createFactory(require('./components/Html.jsx')),
  routeConfig = require('./configs/routes'),
  app = require('./app');

module.exports = function () {

  return function* reactPageMiddleware () {
    // this should be a middleware, and reactPageMiddleware can be composed with it
    if (!isReactRoute({path: this.path, method: this.method})) {
      return;
    }

    var context = app.createContext({
      request: request(this.app.callback())
    });
    var executeAction = thunkify(context.getActionContext().executeAction);

    log('executing navigate action');
    try {
      yield executeAction(navigateAction, {url: this.url, method: this.method});
    } catch (err) {
      console.log('ERROR navigateAction', err);
      if (err && err.status) {
        this.throw(err.status);
      }
      this.throw(500);
    }

    log('exposing context state');
    var exposed = 'window.App=' + serialize(app.dehydrate(context)) + ';';

    log('rendering application component into html');
    var AppComponent = app.getAppComponent();
    var html = React.renderToStaticMarkup(HtmlComponent({
        state: exposed,
        context: context.getComponentContext(),
        markup: React.renderToString(AppComponent({
            context: context.getComponentContext()
        }))
    }));

    log('sending markup');
    this.type = 'html';
    this.body = html;
  };
};


/**
 * HELPERS
 */

/*
 * Is react route
 *
 * @method isReactRoute
 * @param {Object} _route
 * @return {Boolean}
 */
function isReactRoute (_route) {
  return _.some(routeConfig, function (route) {
    return _route.path.match(new RegExp(route.path)) &&
      route.method.toUpperCase() === _route.method;
  });
}
