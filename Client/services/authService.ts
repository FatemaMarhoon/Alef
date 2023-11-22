import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";

export function FirebaseSetup(): FirebaseApp {
    const firebaseConfig = {
        apiKey: "AIzaSyDgBjLpJBzgq5xPj9hbzW2ikCcduO3ZpHo",
        authDomain: "alef-b9e95.firebaseapp.com",
        projectId: "alef-b9e95",
        storageBucket: "alef-b9e95.appspot.com",
        messagingSenderId: "499681011174",
        appId: "1:499681011174:web:b379c0f1d7665e965d6227"
    };

    const app = initializeApp(firebaseConfig);
    return app;
}

//with pop-up
export async function loginWithGoogle() {
    const auth = getAuth(FirebaseSetup());
    const provider = new GoogleAuthProvider();
  
    try {
      const userCred = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(userCred);
      const userToken = credential?.accessToken;
      const user = userCred.user;
        if (userToken) {
            console.log(userToken)
        }
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error; // Re-throw the error to be handled in the calling function
    }
  }
  

//with redirect (idk it's stopped working)
export async function loginWithGoogle2() {
    const auth = getAuth(FirebaseSetup());
    const provider = new GoogleAuthProvider();

    try {
        // Start the Google sign-in process
        await signInWithRedirect(auth, provider);

        // This will trigger a full page redirect away from your app
        // Handle the redirect result when the user comes back to your app
        const result = await getRedirectResult(auth);

        // You can access the user information from the result
        const user = result?.user;
        console.log(user);

    } catch (error) {
        console.error(error);
        // Handle errors
    }
}

export async function loginWithEmail(email:string, password:string) {
    const auth = getAuth(FirebaseSetup());
    const response = signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
            // Signed in 
            console.log("logged in")
        })
        .catch((error) => {
            console.log(error.message)
            throw error;
        });
}

export async function logout() {
    const auth = getAuth(FirebaseSetup());
    signOut(auth).then(() => {
        // Sign-out successful.
       
        console.log("logged out")
    }).catch((error) => {
        // An error happened.
    });
}

export async function currentUser(): Promise<User | null> {
    const auth = getAuth(FirebaseSetup());
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        console.log(user)
        resolve(user);
        unsubscribe(); // Unsubscribe after resolving to avoid memory leaks
      });
    });
  }

