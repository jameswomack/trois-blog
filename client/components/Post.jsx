'use strict';
var React = require('react');
var PostStore = require('../stores/PostStore');
var StoreMixin = require('fluxible-app').StoreMixin;
var NavLink = require('flux-router-component').NavLink;

var Post = React.createClass({
  mixins: [StoreMixin],
  statics: {
    storeListeners: [PostStore]
  },
  getInitialState: function () {
    return this.getStore(PostStore).getState();
  },
  onChange: function () {
    var state = this.getStore(PostStore).getState();
    this.setState(state);
  },
  render: function () {
    var post = this.state.post,
      date = new Date(post.createdAt),
      navLinkProperties = {
        context: this.props.context,
        routeName: 'post',
        navParams: {post: post.name}
      };

    return (
      <div className='posts'>
        <h1>Post</h1>
        <article className='post'>
          <h2 className='post-title'>{this.state.post.title}</h2>
          <div className='post-information'>
            <NavLink className='post-permalink' {...navLinkProperties}>
              Posted on <time dateTime={date.toISOString()}>{date.toUTCString()}</time>
            </NavLink>
          </div>
          <div className='post-content' dangerouslySetInnerHTML={{__html: this.state.post.body}}/>
          <div className='post-comments'>COMMENTS GO HERE</div>
        </article>
      </div>
    );
  }
});

module.exports = Post;