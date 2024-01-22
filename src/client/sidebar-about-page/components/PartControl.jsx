import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc  } from 'firebase/firestore';
import { Button, Dropdown } from "semantic-ui-react"

import { useFirebase } from "../hooks";
import SimpleTable from "../modules/SimpleTable";
import { PartTypeSearch } from "../modules/DynamicSearch/PartTypeSearch";
import { serverFunctions } from "../../utils/serverFunctions";

export const PartControl = ()=>{

    const firebase = useFirebase()

    const [categoryTree, setCategoryTree] = useState();
    const [selected, setSelected] = useState();


    // // Get category tree from database
    // async function getCategoryTree() {
    //     const docRef = doc(firebase.db, "application_metadata", "part_type_metadata");
    //     const docSnap = await getDoc(docRef);

    //     if (docSnap.exists()) {
    //         const data = docSnap.data()
    //         console.log("Document data:", data);
    //         setCategoryTree(data.category_tree)
    //     } else {
    //         // docSnap.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }

    // useEffect(()=>{
    //     getCategoryTree()
    // }, [])

    function onChange(e, {value}){
        console.log('selected', value.uuid);
        setSelected(value)
        
        serverFunctions.setCurrentCellValues([value.uuid, value.productName])
    }




    return <>
        <p>type to find and insert part reference</p>
        <PartTypeSearch onChange={onChange}/>
        {/* <Button onClick={insert}>Insert part</Button> */}

        {/* <SimpleTable>
            {categoryTree && Object.entries(categoryTree.children).map(([k,v])=>(
                <SimpleTable.Row key={k}>
                    <>{v.name}</>
                </SimpleTable.Row>
            ))}
        </SimpleTable> */}
    </>
}