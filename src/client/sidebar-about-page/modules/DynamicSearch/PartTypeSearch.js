import React from 'react'
import { DynamicSearch } from "./DynamicSearch";


export const PartTypeSearch = (props) => {
    const format = part => `${part.productName}`;


    return (
        <DynamicSearch
            collectionName='part_types'
            format={format}
            {...props}
        ></DynamicSearch>
    );
};
