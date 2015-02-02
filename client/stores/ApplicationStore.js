'use strict';
var createStore = require('fluxible/utils/createStore');
var routesConfig = require('../configs/routes');
var safeWindow = (function () {
  // return window in browser and fake object in server
  return typeof window === 'object' ? window : {ga: function(){}};
})();

var ApplicationStore = createStore({
  storeName: 'ApplicationStore',
  handlers: {
    'CHANGE_ROUTE_SUCCESS' : 'handleNavigate',
    'UPDATE_PAGE_TITLE' : 'updatePageTitle'
  },
  initialize: function (/*dispatcher*/) {
    this.currentPageName = null;
    this.currentPage = null;
    this.currentRoute = null;
    this.pages = routesConfig;
    this.pageTitle = '';
  },
  handleNavigate: function (route) {
    var pageName = route.config.page;
    var page = this.pages[pageName];

    if (pageName === this.getCurrentPageName()) {
      return;
    }

    this.currentPageName = pageName;
    this.currentPage = page;
    this.currentRoute = route;
    this.emitChange();
    safeWindow.ga("send", "pageview");
  },
  updatePageTitle: function (title) {
    this.pageTitle = title.pageTitle;
    this.emitChange();
  },
  getCurrentPageName: function () {
    return this.currentPageName;
  },
  getPageTitle: function () {
    return this.pageTitle;
  },
  getState: function () {
    return {
      currentPageName: this.currentPageName,
      currentPage: this.currentPage,
      pages: this.pages,
      route: this.currentRoute,
      pageTitle: this.pageTitle
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.currentPageName = state.currentPageName;
    this.currentPage = state.currentPage;
    this.pages = state.pages;
    this.currentRoute = state.route;
    this.pageTitle = state.pageTitle;
  }
});


module.exports = ApplicationStore;
