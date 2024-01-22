import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, where, query  } from 'firebase/firestore';
import { Button, Dropdown, Loader } from "semantic-ui-react"

import { useFirebase } from "../hooks";
import { PartTypeSearch } from "../modules/DynamicSearch/PartTypeSearch";
import { serverFunctions } from "../../utils/serverFunctions";

export const PartControl = ()=>{

    const firebase = useFirebase()

    const [categoryTree, setCategoryTree] = useState();
    const [selected, setSelected] = useState();
    const [loading, setLoading] = useState();


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

    async function onChange(e, {value}){
        setLoading(true)
        try {
            
            console.log('selected', value.uuid);
            
            setSelected(value)
            
            
            const q = query(collection(firebase.db, 'articles'), where('ref_uuid', '==', value.uuid));
            const snapshot = await getDocs(q);
            const articles = []
            if (snapshot.size > 0) {
                snapshot.forEach(doc => {
                    articles.push(doc.data())
                })
            }
        
            const priceEntries = []
            for (const article of articles) {            
                const q2= query(collection(firebase.db, 'price_entries'), where('article_id', '==', value.uuid));
                const snapshot2 = await getDocs(q2);
                if (snapshot2.size > 0) {
                    snapshot2.forEach(doc => {
                        const entry = doc.data()
                        entry.article_entry = article
                        priceEntries.push(entry)
                    })
                }
            }
            
            console.log('priceEntries', priceEntries);
            const sorted = priceEntries.sort((a,b)=>a.created_at < b.created_at? -1 :1)
            const mostRecent = sorted[sorted.length-1]
            
            await serverFunctions.setCurrentCellValues([value.uuid, value.productName, mostRecent.nett_unit_price])
            await serverFunctions.setCellValidationRange(2, sorted.map(p=>p.nett_unit_price))
        
        } catch (error) {
            
        } finally{
            setLoading()
        }
        
    }
    
    
    
    
    return <>
        <p>type to find and insert part reference</p>
        <PartTypeSearch onChange={onChange}/>
        {loading && <Loader active inline/>}
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