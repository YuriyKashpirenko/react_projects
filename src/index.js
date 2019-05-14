import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
//import Note from './Note';
import Board from './Board'
//import * as serviceWorker from './serviceWorker'
import registerServiceWorker from './registerServiceWorker'
//export Fa500px from './500px';

//passing count
ReactDOM.render(<Board count={50}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
registerServiceWorker()
