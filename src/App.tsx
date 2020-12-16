import React, { useState } from "react";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import {
  FirebaseAuthProvider,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { config } from "./firebase/config";
import firebase from "firebase/app";
import "firebase/auth";

const App = () => {
  const [loading, setLoading] = useState(false);

  return (
    <FirebaseAuthProvider {...config} firebase={firebase}>
      <IfFirebaseAuthed>
        {() => (
          <div>
            <h2>You're signed in 🎉 </h2>
            <button
              onClick={async () => {
                setLoading(true);
                await firebase.app().auth().signOut();
                setLoading(false);
              }}
            >
              Sign out
            </button>
          </div>
        )}
      </IfFirebaseAuthed>
      <IfFirebaseUnAuthed>
        {({ firebase }) => (
          <div>
            <h2>You're not signed in </h2>
            <button
              onClick={async () => {
                setLoading(true);
                await firebase.app().auth().signInAnonymously();
                setLoading(false);
              }}
            >
              Sign in anonymously
            </button>
            <button
              onClick={() => {
                const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                firebase.auth().signInWithPopup(googleAuthProvider);
              }}
            >
              Sign in with Google
            </button>
          </div>
        )}
      </IfFirebaseUnAuthed>

      <DashboardPage />
    </FirebaseAuthProvider>
  );
};
export default App;
