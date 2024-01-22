import React, { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { PartControl } from '../components/PartControl';

// This is a wrapper for google.script.run that lets us use promises.
import {  useFirebase } from '../hooks';



const Home = () => {

    const firebase = useFirebase()
    const [user, setUser] = useState(firebase.user)

    const [path, setPath] = useState();    


    return (
        <div style={{width:'300px', padding:'1em'}}>

            {!user && <Button >Sign in</Button>}
            {user && <>
                {user.email} <Button>Sign out</Button>
                <PartControl />
            </>}
        </div>
    )
};

export default Home;
