import React from 'react';
import ReactDOM from 'react-dom';

export default function renderComponent(component: React.ComponentElement<unknown, React.Component>) {
  ReactDOM.render(component, document.getElementById('app-root'));
}
