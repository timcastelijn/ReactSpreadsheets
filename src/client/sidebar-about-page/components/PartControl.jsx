import { Button } from "semantic-ui-react"

import { collection, getDocs } from 'firebase/firestore/lite';
import { useFirebase } from "../hooks";

export const PartControl = ()=>{

    const firebase = useFirebase()

    // Get a list of cities from your database
    async function getUsers() {
        const citiesCol = collection(firebase.db, 'users');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        console.log('users', cityList)
        return cityList;
    }

    return <>
        <Button onClick={getUsers}>Insert part</Button>
    </>
}