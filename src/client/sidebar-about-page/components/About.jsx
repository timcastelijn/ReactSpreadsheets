import React, { useEffect, useState } from 'react';
import { Button, Container } from 'semantic-ui-react';
import { PartControl } from './PartControl';

// This is a wrapper for google.script.run that lets us use promises.
import { serverFunctions } from '../../utils/serverFunctions';
import { collection, getDocs } from 'firebase/firestore/lite';
import { useAsyncEffect, useFirebase } from '../hooks';


const About = () => {

    const firebase = useFirebase()
    const [user, setUser] = useState(firebase.user)

    return (
        <div style={{width:'300px', padding:'1em'}}>
            {!user && <Button >Sign in</Button>}
            {user && <>
                signed in as {user.email} <Button>Sign out</Button>
                <p></p>
                <PartControl />
            </>}
        </div>
    )
};

export default About;
