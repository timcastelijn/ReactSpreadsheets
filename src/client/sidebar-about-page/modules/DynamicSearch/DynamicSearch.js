import React from 'react'
import { useState } from "react";
import { Dropdown } from "semantic-ui-react";
import { useFirebase } from '../../hooks';

import { query, where, collection, getDocs } from "firebase/firestore";


export const DynamicSearch = ({collectionName, value, onChange, format, ReturnType, image, filters, ...rest}) => {

    const firebase = useFirebase();

    const [options, setOptions] = useState([]);
    const [localValue, setLocalValue] = useState();


    async function onSearchChange(e, { searchQuery }) {
        if (isNaN(searchQuery) && searchQuery.length < 2) { return; }


        // construct query
        let searchArray = searchQuery.toLowerCase().split(' ');

        searchArray = searchArray.filter(entry => entry !== '');
        if (searchArray.length < 1) { return; }

        const where_statements = [
            where(`archived`, '==', false)
        ]


        if(filters && filters.length >0){
            for (const entry of filters) {
                where_statements.push( where(...entry))
            }
        }

        for (const entry of searchArray) {
            where_statements.push( where(`searchIndex.${entry}`, '==', true))

        }

        // get options
        const colRef = collection(firebase.db, collectionName)
        const q = query(colRef, ...where_statements);
        const snapshot = await getDocs(q);

        const newOptions = [];
        if (snapshot.size > 0) {
            snapshot.forEach(doc => {
                const entity = doc.data()
                const entry = { key: doc.id, value: doc.id, text: format(entity), item:entity }
                newOptions.push(entry);
            });
        }
        
        setOptions(newOptions);
    }

    function onLocalChange(e, data){
        if(data.value === 'add_new'){
            return
        }
        setLocalValue(data.value)

        // do this use autcomplete with tab
        if(options.length === 1 && data.value){
            console.log('onLocalChange', data.value);
            onSelect(e, data)
        }
    }

    function onSelect(e, data){

        // do this to escape outcomplete with tab and no value
        if(!data.value){
            return
        }

        // escape if not changed
        if(data.value === value){
            return
        }
        setLocalValue(data.value)

        const outerData = {...data}
        for (const option of options) {
            if(option.value === data.value){
                outerData.value = option.item
                break
            }
        }
        onChange(e, outerData);
    }

    return (
        <>
            <Dropdown
                search={() => options}
                selection
                placeholder='type to search...'
                value={localValue}
                options={options}
                onSearchChange={onSearchChange}
                onChange={onSelect}
                // onClose={onSelect}
                {...rest}
                ></Dropdown>
        </>
    );
};
