"use client";

import { useState, useEffect } from "react";
import firebase from "@/config/firebase-config"; // Ensure correct path

export default function Home() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((currentUser) => {
      //@ts-ignore
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLoginWithGoogle = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithPopup(provider);
      // Handle the result or perform actions post-login
      console.log(result);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log("User signed out");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <button onClick={handleLoginWithGoogle}>Login with Google</button>
      )}
    </div>
  );
}
