'use strict';
var React = require('react');
var PostStore = require('../stores/PostStore');
var StoreMixin = require('fluxible').StoreMixin;
var NavLink = require('flux-router-component').NavLink;
var DisqusThread = require('./vendor/DisqusThread.jsx');

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
      },
      disqusProperties = {
        shortname: 'cesarandreu-blog',
        identifier: post.name,
        title: post.title
      };

    return (
      <article>
        <h1 className='content-subhead'>Post</h1>
        <h2 className='post-title'>{this.state.post.title}</h2>
        <div className='post-information'>
          <NavLink className='post-permalink' {...navLinkProperties}>
            Posted on <time dateTime={date.toISOString()}>{date.toUTCString()}</time>
          </NavLink>
        </div>
        <div className='post-content' dangerouslySetInnerHTML={{__html: this.state.post.body}}/>
        <div className='post-comments'>
          <DisqusThread {...disqusProperties}/>
        </div>
      </article>
    );
  }
});

module.exports = Post;
