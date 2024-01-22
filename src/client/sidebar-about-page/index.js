import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';

import 'semantic-ui-css/semantic.min.css'

// // This is a wrapper for google.script.run that lets us use promises.
// import { serverFunctions } from '../../utils/serverFunctions';

import { FirebaseContext, useAsyncEffect } from './hooks';
import { Firebase } from './components/Firebase';

import Home from './pages/Home';

const container = document.getElementById('index');
const root = createRoot(container);


const App = ()=>{

    const firebase = new Firebase();
    const [authState, setAuthstate] = useState();

    useAsyncEffect(async()=>{
        const user = await firebase.doAuth()
        setAuthstate(user)
    },[])


    return <FirebaseContext.Provider value={firebase}>
        {authState && <Home />}
    </FirebaseContext.Provider>
}

root.render(<App/>);
