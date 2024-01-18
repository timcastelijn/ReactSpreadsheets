import { useState, useEffect } from 'react';

export function useAsyncEffect(funct, varArray){

    useEffect(() => {
        async function asyncEffect(){
            await funct()
        }
        asyncEffect()
        
    }, varArray)
}