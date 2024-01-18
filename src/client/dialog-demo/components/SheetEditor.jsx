import React, { useState, useEffect } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import FormInput from './FormInput';
import SheetButton from './SheetButton';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import { getAuth, signInWithPopup, GoogleAuthProvider, setPersistence, browserSessionPersistence  } from "firebase/auth";


const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
};




const SheetEditor = () => {
  const [names, setNames] = useState([]);

  useEffect(() => {
    // Call a server global function here and handle the response with .then() and .catch()
    serverFunctions.getSheetsData().then(setNames).catch(alert);
  }, []);

  useEffect(async ()=>{
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

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


    // Get a list of cities from your database
    async function getUsers(db) {
        const citiesCol = collection(db, 'users');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        return cityList;
    }

    const users = await getUsers(db)
    
    console.log('success', users)

  },[])

  const deleteSheet = (sheetIndex) => {
    serverFunctions.deleteSheet(sheetIndex).then(setNames).catch(alert);
  };

  const setActiveSheet = (sheetName) => {
    serverFunctions.setActiveSheet(sheetName).then(setNames).catch(alert);
  };

  // You can also use async/await notation for server calls with our server wrapper.
  // (This does the same thing as .then().catch() in the above handlers.)
  const submitNewSheet = async (newSheetName) => {
    try {
      const response = await serverFunctions.addSheet(newSheetName);
      setNames(response);
    } catch (error) {
      // eslint-disable-next-line no-alert
      alert(error);
    }
  };

  return (
    <div>
      <p>
        <b>☀️ React demo! ☀️</b>
      </p>
      <p>
        This is a sample page that demonstrates a simple React app. Enter a name
        for a new sheet, hit enter and the new sheet will be created. Click the
        red &times; next to the sheet name to delete it.
      </p>
      <FormInput submitNewSheet={submitNewSheet} />
      <TransitionGroup className="sheet-list">
        {names.length > 0 &&
          names.map((name) => (
            <CSSTransition
              classNames="sheetNames"
              timeout={500}
              key={name.name}
            >
              <SheetButton
                sheetDetails={name}
                deleteSheet={deleteSheet}
                setActiveSheet={setActiveSheet}
              />
            </CSSTransition>
          ))}
      </TransitionGroup>
    </div>
  );
};

export default SheetEditor;
