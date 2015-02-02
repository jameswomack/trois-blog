'use strict';
var createStore = require('fluxible/utils/createStore');

var PostStore = createStore({
  storeName: 'PostStore',
  initialize: function () {
    this.post = {};
  },
  receivePost: function (payload) {
    this.post = payload;
    this.emitChange();
  },
  handlers: {
    'RECEIVE_POST_SUCCESS': 'receivePost'
  },
  getState: function () {
    return {
      post: this.post
    };
  },
  dehydrate: function () {
    return this.getState();
  },
  rehydrate: function (state) {
    this.post = state.post;
  }
});

module.exports = PostStore;
