// firebase-config.js
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  sendEmailVerification,
  signInWithPopup,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

    // Get the ID token (JWT) from the signed-in user
    const token = await result.user.getIdToken();

    // Firebase typically handles the refresh token internally, but you can still access it like this:
    // @ts-ignore
    const refreshToken = result.user.stsTokenManager.refreshToken;

    console.log("Access Token:", token);
    console.log("Refresh Token:", refreshToken); // This is usually not necessary to log in production.

    // You can return both tokens if needed:
    return { token, refreshToken };
  } catch (error) {
    console.error("Error during Google sign-in:", error);
    throw new Error("Sign-in failed. Please try again.");
  }
};

export const signUpAndVerifyEmail = async (email: string, password: string) => {
  try {
    // Create user with email and password
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);

    const user = userCredential.user;

    // Send verification email
    await sendEmailVerification(user);
    console.log("Verification email sent to " + email);
    //@ts-ignore
    return userCredential.user.stsTokenManager.refreshToken;
  } catch (error) {
    console.error("Error signing up: ", error);
  }
};

export const isUserVerified = (email: string) => {
  const user = auth.currentUser;
  if (user) {
    return user.emailVerified;
  }
  return false;
};

export default firebase;
