import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import AddressLink from "../AddressLink";
import PlaceGallery from "../PlaceGallery";
import BookingDates from "../BookingDates";


export default function BookingsPage() {
    const { id } = useParams();
    const [bookings, setBookings] = useState(null);
    useEffect(() => {

        if (id) {
            axios.get(`/bookings`).then((response) => {
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBookings(foundBooking);
                }
            });
        }
    }, [id]);
    if (!bookings) {
        return <div>Loading...</div>
    }

    return (
        <div className="my-8">
            <h1 className="text-2xl">{bookings.place.title}</h1>
            <AddressLink place={bookings.place} />
            <div className="bg-gray-200 p-6 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-semibold mb-2 mb-4">
                        Your booking information:
                    </h2>
                    <BookingDates booking={bookings} />
                </div>

                <div className="bg-primary p-6 text-white rounded-2xl">
                    <div >
                        Total price:
                    </div>
                    <div className="text-3xl">
                        ${bookings.price}
                    </div>

                </div>
            </div>

            <PlaceGallery place={bookings.place} />
        </div>
    );
}