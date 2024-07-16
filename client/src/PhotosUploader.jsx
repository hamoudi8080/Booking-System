import React, { useState } from 'react';
import axios from 'axios';

export default function PhotosUploader({ addedPhotos, onChange }) {

    const [photoLink, setPhotoLink] = useState('');



    async function addPhotoByLink(ev) {
        ev.preventDefault();
        /*The spread operator ...prev spreads out all elements of the prev array.
        Adding filename at the end creates a new array with all previous elements plus the new filename.
        This new array is returned and used to update the state. */
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        onChange(prev => {
            return [...prev, filename];
        });
        setPhotoLink('');

    }

    function uploadPhoto(ev) {
        const files = ev.target.files;
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            /*data.append('photos', files[i]): Appends each file to the FormData object with the key 'photos'. 
            This key should match the one expected by the server to process the files. */
            data.append('photos', files[i]);
        }
        axios.post('/upload', data,
            {
                headers: {
                    'Content-type': 'multipart/form-data'
                }
            }
        ).then(response => {
            const { data: filenames } = response;
            onChange(prev => {
                return [...prev, ...filenames];
            });
        })
    }
    return (
        <>

            <div className="flex gap-2">
                <input type="text"
                    value={photoLink}
                    onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ....jpg'}></input>
                {/* &nbsp; means no breaking space. just try remove it and see the difference on the text. */}
                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
            </div>

            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                {addedPhotos.length > 0 && addedPhotos.map((link) => (
                    <div className="flex h-32 object-cover " key={link}>
                        <img className="rounded-2xl w-full" src={'http://localhost:4000/uploads/' + link} alt="" />
                    </div>
                ))}
                <label className="h-32 flex items-center justify-center gap-1 cursor-pointer border bg-transparent rounded-2xl p-2 text-2xl text-gray-600">
                    <input type="file" multiple className="hidden" onChange={uploadPhoto} />
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                    </svg>
                    Upload
                </label>
            </div>
        </>


    )
}