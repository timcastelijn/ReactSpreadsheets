import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
}

export class Firebase {

    constructor() {
        const app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);

        const auth = getAuth();
        this.user = auth.currentUser;

    }

    async doAuth() {

        console.log('do auth');
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence);

        if (auth.currentUser) {
            console.log('session active');
            this.user = auth.currentUser;
        } else {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log('user', user);
            this.user = user;
        }

        return this.user;
    }

    async doSignOut() {
        console.log('doSignOut');
        const auth = getAuth();

        console.log('auth', auth);

        await auth.signOut();
        this.user = null;
        console.log('user signed out');
    }
}
