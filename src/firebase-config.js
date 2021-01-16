
import firebase from 'firebase/app';
import 'firebase/database'

const config = {
    apiKey: "AIzaSyBpAxHYRQLQDa4mEMIjOBeSmi_8ELPnh38",
    authDomain: "userdataforcovid19.firebaseapp.com",
    projectId: "userdataforcovid19",
    storageBucket: "userdataforcovid19.appspot.com",
    messagingSenderId: "584697706575",
    appId: "1:584697706575:web:05d86e085e0d50ac63123a",
    measurementId: "G-83Y7TZ2TZP"

};
export const firebaseConfig = firebase.initializeApp(config);