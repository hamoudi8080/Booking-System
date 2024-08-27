import AccountNav from "../AccountNav";
import PlaceImg from "../PlaceImg";
import { useEffect, useState } from "react";
import axios from "axios";
 
import { differenceInCalendarDays } from 'date-fns';
import { Link } from "react-router-dom";
import BookingDates from "../BookingDates";

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
            <div  >
                {bookings?.length > 0 && bookings.map(booking => (

                    <Link to={`/account/bookings/${booking._id}`} key={booking._id}
                    className="flex mt-4 gap-4 bg-gray-200  rounded-2xl overflow-hidden">
                        <div className="w-48 "> 
                            <PlaceImg place={booking.place} />
                        </div>
                        <div className="py-3 grow pr-3">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <p className="mt-3 border-t border-gray-300">{booking.place.address}</p>
                            
                            <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />

                            <div className="text-xl mt-2">
                                <div className="flex gap-1 text-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -2 24 24" strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                                    </svg>

                                    <span className="text-xl">
                                    {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))} Nights |
                                 </span>
                                    
                                    
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 -2 24 24"  strokeWidth="1.5" stroke="currentColor" class="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                   
                                 </svg>
                                 <span className="text-xl ">
                                 Total price:                               
                                 {booking.price}
                                 </span>
                              
                                </div>


                            </div>


                        </div>

                    </Link>


                ))}
            </div>
        </div>
    );
}