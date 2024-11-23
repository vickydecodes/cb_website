import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const app = initializeApp({
    apiKey: 'AIzaSyA-s2YKbXhJmWRYAYhtoz5kFL6JtrmOkZA',
    authDomain: 'auth-development-fd258.firebaseapp.com',
    projectId: 'auth-development-fd258',
    storageBucket: 'auth-development-fd258.appspot.com',
    messagingSenderId: '83067565862',
    appId: '1:383067565862:web:d92786180e09e421eb1be7'
});

export const auth = getAuth(app);
export default app