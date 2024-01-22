import React, {  useState } from 'react';


// This is a wrapper for google.script.run that lets us use promises.
import {  useFirebase } from '../hooks';




const Home = () => {

    const firebase = useFirebase()
    const [user, setUser] = useState(firebase.user)
    const [path, setPath] = useState();    

    return (
        <>
            home
        </>
    )
};

export default Home;
