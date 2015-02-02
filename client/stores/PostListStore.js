'use strict';
var createStore = require('fluxible/utils/createStore');

var PostListStore = createStore({
  storeName: 'PostListStore',
  initialize: function () {
    this.posts = [];
    this.count = 0;
    // this.page = 1;
    // this.pages = 1;
    // this.per = 12;
    this.sortBy = 'createdAt';
    this.direction = 'DESC';
  },
  receiveList: function (payload) {
    this.posts = payload.posts;
    this.emitChange();
  },
  handlers: {
    'RECEIVE_POST_LIST_SUCCESS': 'receiveList'
  },
  getState: function () {
    return {
      posts: this.posts,
      count: this.count,
      // page: this.page,
      // pages: this.pages,
      // per: this.per,
      sortBy: this.sortBy,
      direction: this.direction
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.posts = state.posts;
    this.count = state.count;
    // this.page = state.page;
    // this.pages = state.pages;
    // this.per = state.per;
    this.sortBy = state.sortBy;
    this.direction = state.direction;
  }
});

module.exports = PostListStore;
