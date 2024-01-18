import { useEffect, createContext, useState, useContext} from "react";

export const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);