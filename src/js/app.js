var React = require('react');

var Title = require('./components/title');

React.render(
  React.createElement(Title, {
    name: 'Github'
  }),
  document.getElementById('react')
);
