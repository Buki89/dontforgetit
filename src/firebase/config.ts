import fb from "firebase/app"


export const config = {
    apiKey: "AIzaSyCNE-o7ij4hAFz7fIhChKiO2h-59t3lgkc",
    authDomain: "dontforgetit-25e44.firebaseapp.com",
    databaseURL: "https://dontforgetit-25e44-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "dontforgetit-25e44",
    storageBucket: "dontforgetit-25e44.appspot.com",
    messagingSenderId: "221613559150",
    appId: "1:221613559150:web:e93550304aae8065c3057f",
    measurementId: "G-DGSKTK42QN"
  };

  export const firebase = !fb.apps.length ? fb.initializeApp(config) : fb.app()
  