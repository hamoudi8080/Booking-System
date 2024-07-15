import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import Perks from "../Perks";
import axios from "axios";
export default function PlacesPage() {
    const { action } = useParams();

    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [photoLink, setPhotoLink] = useState('');
    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);


    function inputHeader(text) {
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        )
    }
    function inputDescription(text) {
        return (
            <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header, description) {
        return (
            <>
                {inputHeader(header)}
                {inputDescription(description)}
            </>
        )
    }

    async function addPhotoByLink(ev) {
        ev.preventDefault();
        /*The spread operator ...prev spreads out all elements of the prev array.
        Adding filename at the end creates a new array with all previous elements plus the new filename.
        This new array is returned and used to update the state. */
        const { data: filename } = await axios.post('/upload-by-link', { link: photoLink });
        setAddedPhotos(prev => {
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
            setAddedPhotos(prev => {
                return [...prev, ...filenames];
            });
        })
    }

    return (
        <div>
            {action !== 'new' && (
                <div className="text-center mt-8">
                    <Link to={'/account/places/new'} className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add a new place
                    </Link>
                </div>
            )}
            {action === 'new' && (
                <div>
                    <form>

                        <div>
                            {preInput('Title', 'Title for your place, should be and catchy as in advertisement')}
                            <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely apt" />

                            {preInput('Address', 'Address to this place')}
                            <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                            {preInput('Photos', 'more = better')}
                            <div className="flex gap-2">
                                <input type="text"
                                    value={photoLink}
                                    onChange={ev => setPhotoLink(ev.target.value)} placeholder={'Add using a link ....jpg'}></input>
                                {/* &nbsp; means no breaking space. just try remove it and see the difference on the text. */}
                                <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>
                            </div>

                            <div className="mt-2 gap-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                                {addedPhotos.length > 0 && addedPhotos.map((link) => (
                                    <div className="flex h-32 object-cover "  key={link}>
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


                            {preInput('Description', 'Description of the place')}
                            <textarea value={description} onChange={ev => setDescription(ev.target.value)} />

                            {preInput('Perks', 'Select all the perks')}
                            <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-3 mlg:grid-cols-z">
                                <Perks selected={perks} onChange={setPerks} />
                            </div>
                        </div>

                        {preInput('Extra info', 'house rules, etc')}
                        <textarea value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                        {preInput('Check in&out times', 'add check in and out times, remember to have some time window for cleaning the room between guests')}
                        <div className="grid sm:grid-cols-3 gap-2">
                            <div>
                                <h3 className="mt-2 -mb-1">Check in time</h3>
                                <input
                                    value={checkInTime}
                                    onChange={ev => setCheckInTime(ev.target.value)} type="text" placeholder="14" />

                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Check out time</h3>
                                <input
                                    value={checkOutTime}
                                    onChange={ev => setCheckOutTime(ev.target.value)} type="text" placeholder="11" />
                            </div>
                            <div>
                                <h3 className="mt-2 -mb-1">Max number of guests</h3>
                                <input
                                    value={maxGuests}
                                    onChange={ev => setMaxGuests(ev.target.value)} type="number" placeholder="Check in time" />
                            </div>
                        </div>

                        <div >
                            <button className="primary my-4">Save</button>
                        </div>
                    </form>
                </div>
            )}
            my places
        </div>
    );
}