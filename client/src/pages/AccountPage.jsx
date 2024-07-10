import React, { useContext, useState } from 'react'; // Corrected import statement
import { UserContext } from '../UserContext';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function AccountPage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
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
    if (ready && !user) {
        return <Navigate to={'/login'} />;
    }

    function linkClasses(type = null) {
        let classes = 'py-2 px-6';
        if (type === subpage) {
            classes += ' bg-primary rounded-full text-white';
        }
        return classes;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    return (
        <div>
            <nav className='w-full flex mt-8 gap-4 justify-center'>
                <Link className={linkClasses('profile')} to={'/account'}>My Profile</Link>
                <Link className={linkClasses('bookings')} to={'/account/bookings'}>My bookings</Link>
                <Link className={linkClasses('places')} to={'/account/places'}>My accommodations</Link>
            </nav>

            {subpage === 'profile' && (
                <div className='text-center'>
                    Logged in as {user.name} ({user.email})<br />
                    <button onClick={logout} className='primary max-w-sm mt-2'>Logout</button>
                </div>
            )}
        </div>
    );
}