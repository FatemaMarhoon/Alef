import { FirebaseApp, initializeApp } from 'firebase/app';
import { getAuth, signOut, signInWithEmailAndPassword, GoogleAuthProvider, signInWithRedirect, getRedirectResult, Auth, signInWithPopup, onAuthStateChanged, User } from "firebase/auth";

export function FirebaseSetup(): FirebaseApp {
  const firebaseConfig = {
    apiKey: "AIzaSyDQcV4yPU_qvxCam1cevzlo5ZNV2cbeXxE",
    authDomain: "alef-229ac.firebaseapp.com",
    projectId: "alef-229ac",
    storageBucket: "alef-229ac.appspot.com",
    messagingSenderId: "514724677269",
    appId: "1:514724677269:web:b0e256f42de936a73afd9c",
    measurementId: "G-9DSXG19HQ5"
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

export async function loginWithEmail(email: string, password: string) {
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

export async function currentToken(): Promise<string | undefined> {
  const user = await currentUser();
  const token = (await user?.getIdToken())?.toString();
  return token;
}

//   export function currentToken(): string | undefined {
//      currentUser().then(async (user) => {
//         await user?.getIdToken().then((token) => {
//             return token;
//         })
//     })
//     return undefined;
//     // const user = await currentUser();
//     // const token = (await user?.getIdToken())?.toString();
//     // return token;
//   }


export async function currentPreschool(): Promise<unknown | undefined> {
  const user = await currentUser();
  const preschool = user?.getIdTokenResult(true).then((idTokenResult) => {
    const customClaims = idTokenResult.claims;
    return customClaims.preschool_id;
  });
  return preschool;
}

