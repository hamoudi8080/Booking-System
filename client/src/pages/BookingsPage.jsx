import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { useEffect, useState } from "react";
import axios from "axios";
export default function BookingsPage() {

    const [bookings, setBookings] = useState([]);


    useEffect(() => {
        axios.get("/bookings").then((response) => {
            setBookings(response.data);
        });
    }, []);
    return (
        <div>
            <AccountNav />
            <div>
                {bookings?.length > 0 && bookings.map(booking => (

                    <div>
                        <div>
                            <PlaceImg place={booking.place} />
                        </div>
                        <h2>{booking.place.title}</h2>
                        <p>{booking.place.address}</p>
                        <p>{booking.checkIn} - {booking.checkOut}</p>
                        <p>{booking.guests} guests</p>
                        <p>${booking.price}</p>
                    </div>


                ))}
            </div>
        </div>
    );
}