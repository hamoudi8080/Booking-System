import axios from "axios";
 
import { createContext, useEffect } from "react";
import { useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider(props) {
    const { children } = props;
    const [user, setUser] = useState(null);
    useEffect(  () => {
        if (!user) {
           axios.get('/profile').then(({data}) => {
            setUser(data);
           });
    
        }

    }, []);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}



// this code defines a context for user information and provides a mechanism for components to access and update the user's state.
// By wrapping a part of the application with UserContextProvider,
// any child component in that part of the application tree can access or modify the user's state using the useContext hook with UserContext.