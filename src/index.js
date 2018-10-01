import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';


<script src="https://www.gstatic.com/firebasejs/5.5.2/firebase.js"></script>
// Initialize Firebase
var config = {
    apiKey: "AIzaSyDNwmHxHdvzP6oY7bR9w4FmkrL4V2ZGXNU",
    authDomain: "task1-f3b77.firebaseapp.com",
    databaseURL: "https://task1-f3b77.firebaseio.com",
    projectId: "task1-f3b77",
    storageBucket: "task1-f3b77.appspot.com",
    messagingSenderId: "158564126124"
};
firebase.initializeApp(config)

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
