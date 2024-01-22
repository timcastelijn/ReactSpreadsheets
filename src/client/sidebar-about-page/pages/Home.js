import React, {  useState } from 'react';


// This is a wrapper for google.script.run that lets us use promises.
import {  useFirebase } from '../hooks';
import { Container } from 'semantic-ui-react';




const Home = () => {

    const firebase = useFirebase()
    const [user, setUser] = useState(firebase.user)
    const [path, setPath] = useState();    

    return (
        <Container>
            home
        </Container>
    )
};

export default Home;
