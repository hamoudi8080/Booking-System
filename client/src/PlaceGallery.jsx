import React from 'react';
import { useState } from 'react';   

export default function PlaceGallery({ place }) {
    
    const [showMorePhotos, setShowMorePhotos] = useState(false);
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
        <div className="relative">
            <div className="grid  gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidde">
                <div   >
                    {place.photos?.[0] && (

                        <div  >
                            <img  onClick={() => setShowMorePhotos(true)} className="aspect-square  cursor-pointer object-cover rounded-3xl   " src={'http://localhost:4000/uploads/' + place.photos[0]} alt={place.title} />

                        </div>
                    )}
                </div>
                <div className="grid ">
                    {place.photos?.[1] && (
                        <img onClick={() => setShowMorePhotos(true)} className=" aspect-square cursor-pointer  object-cover " src={'http://localhost:4000/uploads/' + place.photos[1]} alt={place.title} />
                    )}
                    <div className="   overflow-hidden">
                        {place.photos?.[2] && (
                            <img onClick={() => setShowMorePhotos(true)} className=" aspect-square cursor-pointer  object-cover relative top-2 " src={'http://localhost:4000/uploads/' + place.photos[2]} alt={place.title} />
                        )}
                    </div>

                </div>



            </div>
            <button onClick={() => setShowMorePhotos(true)} className=" flex gap-1 absolute bottom-2 right-2 px-4 py-2 bg-white rounded-2xl shadow shadow-md shadow-black shadow-gray-500">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 18 18" fill="currentColor" className="size-6">

                    <path fillRule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
                </svg>
                show more photos

            </button>
        </div>
    );
}