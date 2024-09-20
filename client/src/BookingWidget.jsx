import React, { useEffect, useState } from 'react';
import { differenceInCalendarDays } from 'date-fns';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from './UserContext';
import { Link } from 'react-router-dom';
export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);


    useEffect(() => {
        if (user) {
            setName(user.name);

        }
    }, [user]);


    let numberOfNights = 0;

    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }


    async function bookThisPlace() {
        const response = await axios.post('/bookings', {
            checkIn, checkOut, guests, name, phone,
            place: place._id,
            price: numberOfNights * place.price,
        });
        const bookingId = response.data._id;
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }
    return (
        <div className="bg-white  p-4 shadow rounded-2xl">
            <h2 className="text-2xl text-center">Prise: ${place.price} /per night</h2>

            <div className="border rounded-2xl mt-4">
                <div className="flex flex-col xl:flex-row">
                    <div className="px-4 py-4">
                        <label>Check in </label>
                        <input type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} />
                    </div>

                    <div className="px-4 py-4 border-l">
                        <label>Check out </label>
                        <input type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} />
                    </div>
                </div>
                <div className="py-3 px-4 border-t">
                    <label>Number of guests</label>
                    <input type="number" value={guests} onChange={ev => setGuests(ev.target.value)} />
                </div>

                {numberOfNights > 0 && (
                    <div className="py-3 px-4 border-t">
                        <label>Your full name:</label>
                        <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                        <label>Phone number:</label>
                        <input type="tel" value={phone} onChange={ev => setPhone(ev.target.value)} />
                    </div>
                )}
            </div>
 
            {user === null ? (
                <div className="text-center mt-4">
                    <h2>You must login first in order to book this place</h2>
                    <Link to="/login" className="underline">Login</Link> to book this place
                </div>
            ) : (
                <button onClick={bookThisPlace} className="primary mb-4">
                    Book this place
                    {checkIn && checkOut && <span> for ${numberOfNights * place.price}</span>}
                </button>
            )}
        </div>
    );
}