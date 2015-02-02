'use strict';
var React = require('react');
var Layout = require('./Layout.jsx');
var Footer = Layout.Footer;
var Sidebar = Layout.Sidebar;
var Content = Layout.Content;
var Nav = require('./Nav.jsx');
var About = require('./About.jsx');
var PostList = require('./PostList.jsx');
var Post = require('./Post.jsx');
var ApplicationStore = require('../stores/ApplicationStore');
var RouterMixin = require('flux-router-component').RouterMixin;
var StoreMixin = require('fluxible').StoreMixin;

var Application = React.createClass({
  displayName: 'Application',
  mixins: [RouterMixin, StoreMixin],
  statics: {
    storeListeners: [ApplicationStore]
  },

  getInitialState: function () {
    return this.getStore(ApplicationStore).getState();
  },
  onChange: function () {
    var state = this.getStore(ApplicationStore).getState();
    this.setState(state);
  },
  render: function () {
    var navProperties = {
      selected: this.state.currentPageName,
      context: this.props.context,
      links: this.state.pages
    };

    var output = '';
    //choose the right page based on the route
    switch (this.state.currentPageName) {
      case 'home':
      output = <PostList context={this.props.context}/>;
      break;
      case 'post':
      output = <Post context={this.props.context}/>;
      break;
      case 'about':
      output = <About/>;
      break;
    }

    //render content
    return (
      <div className='pure-g'>
        <Sidebar context={this.props.context}>
          <Nav {...navProperties}></Nav>
        </Sidebar>
        <Content>
          <main>{output}</main>
          <Footer></Footer>
        </Content>
      </div>
    );
  },
  componentDidUpdate: function (prevProps, prevState) {
    var newState = this.state;
    if (newState.pageTitle !== prevState.pageTitle) {
      document.title = newState.pageTitle;
    }
  }
});

module.exports = Application;
