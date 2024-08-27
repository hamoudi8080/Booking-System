import React, { useContext, useState } from 'react'; // Corrected import statement
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import PlacesPage from './PlacesPage';
import AccountNav from '../AccountNav';

export default function AccountPage() {

    const [redirect, setRedirect] = useState(null);
    const {ready, user, setUser } = useContext(UserContext);

    //first when this page render, subpage is undifiend so we need to set it to profile
    let { subpage } = useParams();
    
   
    if (!subpage) {
        subpage = 'profile';
    }

 

    async function logout() {
        await axios.post('/logout');
        setUser(null);
        setRedirect('/');
    }

    if (!ready) {
        return <div>Loading...</div>;
    }
    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>

            <AccountNav />

            {subpage === 'profile' && (
                <div className='text-center'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}

             {subpage === 'places' && (
                <PlacesPage />
               
            )} 
            
        </div>
        
    );
  
}