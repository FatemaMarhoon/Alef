import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
// import { getAuth } from "firebase/auth";
import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, Auth, signInWithPopup } from "firebase/auth";
import { UserSingleton } from './singleton';

export var auth: Auth | null = null;
export var token: string | undefined = undefined;

export function FirebaseSetup(): Auth {
    const firebaseConfig = {
        apiKey: "AIzaSyDgBjLpJBzgq5xPj9hbzW2ikCcduO3ZpHo",
        authDomain: "alef-b9e95.firebaseapp.com",
        projectId: "alef-b9e95",
        storageBucket: "alef-b9e95.appspot.com",
        messagingSenderId: "499681011174",
        appId: "1:499681011174:web:b379c0f1d7665e965d6227"
    };

    const app = initializeApp(firebaseConfig);
    //app check initialization 
    const appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider('6LdvCBIpAAAAAJhgQ_29767z_qBZxnG4dyA_EE6U'),
        isTokenAutoRefreshEnabled: true // Set to true to allow auto-refresh.
      });
    const auth = getAuth(app);
    return auth;
}

//with pop-up
export async function loginWithGoogle() {
    const auth = FirebaseSetup();
    const provider = new GoogleAuthProvider();
  
    try {
      const userCred = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(userCred);
      const userToken = credential?.accessToken;
      const user = userCred.user;
        if (userToken) {
            console.log(userToken)
            UserSingleton.getInstance().setUser(user)
            UserSingleton.getInstance().setToken(userToken)
            console.log("stored")
        }
    } catch (error) {
      console.error('Error during Google login:', error);
      throw error; // Re-throw the error to be handled in the calling function
    }
  }
  

//with redirect (idk it's stopped working)
export async function loginWithGoogle2() {
    const auth = FirebaseSetup();
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

export async function loginWithEmail() {
    const auth = FirebaseSetup()
    signInWithEmailAndPassword(auth, "test@gmail.com", "123456")
        .then(async (userCredential) => {
            // Signed in 
            console.log("logged in")
            const user = userCredential.user;
            const userToken = await user.getIdToken();
            console.log(userToken);
            token = userToken;
            if (userToken) {
                console.log("storing in singleton ...")
                UserSingleton.getInstance().setUser(user)
                UserSingleton.getInstance().setToken(userToken)
            }
        })
        .catch((error) => {
            console.log(error.message)
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

export function logout() {
    const auth = FirebaseSetup();
    signOut(auth).then(() => {
        // Sign-out successful.
        UserSingleton.getInstance().setUser(undefined)
        UserSingleton.getInstance().setToken("")
        console.log("logged out")
    }).catch((error) => {
        // An error happened.
    });
}

