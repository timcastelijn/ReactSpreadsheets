import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence  } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};

export class Firebase{

    constructor(){
        this.app = initializeApp(firebaseConfig);
        this.db = getFirestore(app);
    }

    async doAuth(){
        const auth = getAuth();
        await setPersistence(auth, browserSessionPersistence)
        
        if(!auth.currentUser){
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider)
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            console.log('user', user);
        }
    }
}