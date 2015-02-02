'use strict';
var React = require('react');
var PostListStore = require('../stores/PostListStore');
var StoreMixin = require('fluxible').StoreMixin;
var PostItem = require('./PostItem');

var PostList = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [PostListStore]
  },
  getInitialState: function () {
    return this.getStore(PostListStore).getState();
  },
  onChange: function () {
    var state = this.getStore(PostListStore).getState();
    this.setState(state);
  },
  render: function () {
    var context = this.props.context;
    var posts = this.state.posts.map(function (post) {
      return <PostItem post={post} key={post.id} context={context}/>;
    });
    return (
      <section>
        <h1 className='content-subhead'>Posts</h1>
        <div className='post-list'>{posts}</div>
      </section>
    );
  }
});

module.exports = PostList;
