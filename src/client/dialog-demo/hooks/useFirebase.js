import { useEffect, createContext, useState, useContext} from "react";

export const FirebaseContext = createContext();

export const useFirebase = () => useContext(FirebaseContext);


export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);
