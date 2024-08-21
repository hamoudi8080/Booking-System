import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import BookingWidget from "../BookingWidget";
export default function PlacePage() {
    const { id } = useParams();

    const [place, setPlace] = useState(null);

    const [showMorePhotos, setShowMorePhotos] = useState(false);

    useEffect(() => {
        if (!id) { return; }

        axios.get(`/places/` + id).then((response) => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return "";
    if (showMorePhotos) {
        return (
            <div className="absolute inset-0 bg-black text-white min-h-screen">
                <div className="bg-black p-8 grid gap-4">
                    <div>
                        <h2 className="text-3xl mr-48">Photos of {place.title}</h2>
                        <button onClick={() => setShowMorePhotos(false)} className="fixed right-12 top-8 flex gap-1 py-2 px-4 rounded-2xl shadow shadow-black bg-white text-black">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                            </svg>
                            Close photos
                        </button>
                    </div>
                    {place?.photos?.length > 0 && place.photos.map(photo => (

                        <div key={photo} className="flex justify-center">
                            <img className="w-120" src={'http://localhost:4000/uploads/' + photo} alt={place.title} />
                        </div>
                    ))}

                </div>

            </div>
        );
    }
    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 ">
            <h1 className="text-2xl">{place.title}</h1>

            <a className="block flex gap-2 my-3 font-semibold underline" target="_black" href={"https://maps.google.com/?q=" + place.address}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="m7.539 14.841.003.003.002.002a.755.755 0 0 0 .912 0l.002-.002.003-.003.012-.009a5.57 5.57 0 0 0 .19-.153 15.588 15.588 0 0 0 2.046-2.082c1.101-1.362 2.291-3.342 2.291-5.597A5 5 0 0 0 3 7c0 2.255 1.19 4.235 2.292 5.597a15.591 15.591 0 0 0 2.046 2.082 8.916 8.916 0 0 0 .189.153l.012.01ZM8 8.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z" clip-rule="evenodd" />
                </svg>
                {place.address}
            </a>

            <div className="relative">
                <div className="grid  gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidde">
                    <div>
                        {place.photos?.[0] && (

                            <div >
                                <img onClick={()=> setShowMorePhotos(true)} className="aspect-square  cursor-pointer object-cover  " src={'http://localhost:4000/uploads/' + place.photos[0]} alt={place.title} />

                            </div>
                        )}
                    </div>
                    <div className="grid ">
                        {place.photos?.[1] && (
                            <img onClick={()=> setShowMorePhotos(true)} className=" aspect-square cursor-pointer  object-cover " src={'http://localhost:4000/uploads/' + place.photos[1]} alt={place.title} />
                        )}
                        <div className="   overflow-hidden">
                            {place.photos?.[2] && (
                                <img onClick={()=> setShowMorePhotos(true)} className=" aspect-square cursor-pointer  object-cover relative top-2 " src={'http://localhost:4000/uploads/' + place.photos[2]} alt={place.title} />
                            )}
                        </div>

                    </div>



                </div>
                <button onClick={() => setShowMorePhotos(true)} className=" flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow shadow-md shadow-black shadow-gray-500">

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 18 18" fill="currentColor" class="size-6">

                        <path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
                    </svg>
                    show more photos

                </button>
            </div>

            <div className=" mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="text-2xl font-semibold">Description</h2>
                        <p>{place.description}</p>
                    </div>
                    Check-in: {place.checkIn} <br />
                    Check-out: {place.checkOut} <br />
                    Max number of guests: {place.maxGuests}

                </div>

                <div>

                    <BookingWidget place={place} />
                </div>
            </div>

            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>

                    <h2 className="text-2xl font-semibold">Extra Info</h2>

                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place.extraInfo}</div>

            </div>

        </div>
    );
}