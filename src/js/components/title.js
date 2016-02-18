'use strict';

var React = require('react');

var Title = React.createClass({
  render: function() {
    return <p>
      {this.props.name}
    </p>;
  }
});

module.exports = Title;
