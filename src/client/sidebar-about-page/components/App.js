import React, { useEffect, useState } from 'react';
import { Button, Container, Dropdown, DropdownMenu, Menu, MenuMenu } from 'semantic-ui-react';
import { PartControl } from '../components/PartControl';

// This is a wrapper for google.script.run that lets us use promises.
import {  useAsyncEffect, useFirebase } from '../hooks';
import Home from '../pages/Home';

export const ROUTES = {
    HOME:<Home />,
    PART_CONTROL:<PartControl />
}

const Navigation = ({setPath})=>{

    return <Menu>
        <Menu.Item id={ROUTES.HOME} onClick={(e, {id})=>setPath()}>home</Menu.Item>
        <MenuMenu position='right'>
            <Dropdown item icon='bars' simple >
                <DropdownMenu>
                    <Menu.Item id={ROUTES.PART_CONTROL} onClick={(e, {id})=>setPath(id)}>part control</Menu.Item>
                </DropdownMenu>
            </Dropdown>
        </MenuMenu>
    </Menu>
}

const Route = ({path})=>{
    switch (path) {
        case ROUTES.HOME:
            return <Home />
        case ROUTES.PART_CONTROL:
            return <PartControl />
    
        default:
            break;
    }
} 

export const App = () => {

    const firebase = useFirebase()
    const [user, setUser] = useState(firebase.user)
    const [path, setPath] = useState();    

    useAsyncEffect(async()=>{
        const user = await firebase.doAuth()
        setUser(user)
    },[])


    async function doSignIn(){
        const user = await firebase.doAuth()
        setUser(user)
    }

    async function doSignOut(){
        await firebase.doSignOut()
        setUser()
    }


    return (
        <div style={{width:'300px', padding:'1em'}}>

            {!user && <Button onClick={doSignIn}>Sign in</Button>}
            {user && <>
                {user.email} <Button onClick={doSignOut}>Sign out</Button>
                <Navigation setPath={setPath} />
                {!path && <Home />}
                {path && <Route path={path} />}
            </>}
        </div>
    )
};

