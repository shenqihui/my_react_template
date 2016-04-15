'use strict';

var React = require('react');

var FlipMove = require('react-flip-move');

var Title = React.createClass({
  renderTopArticles: function() {
    return <span>Hello world</span>
  },
  render: function() {
    return <p>
      {this.props.name}
      <div className="top-articles">
        <FlipMove easing="cubic-bezier(0, 0.7, 0.8, 0.1)">
          { this.renderTopArticles() }
        </FlipMove>
      </div>
    </p>;
  }
});

module.exports = Title;
