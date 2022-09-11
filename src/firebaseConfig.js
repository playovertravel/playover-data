import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAdw6v-txAg5x9AdO7fube9irI5RGGClwY",
    authDomain: "playover-travel.firebaseapp.com",
    databaseURL: "https://playover-travel-default-rtdb.firebaseio.com",
    projectId: "playover-travel",
    storageBucket: "playover-travel.appspot.com",
    messagingSenderId: "127828685311",
    appId: "1:127828685311:web:cf72a5a4d8dcc6271837ca",
    measurementId: "G-GDZ0KEMZ0D"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Resources
// https://travis.media/how-to-use-firebase-with-react/
// https://firebase.google.com/docs/firestore/quickstart#web-version-9_2