import React, { useEffect, useState } from 'react';
import PhotosUploader from '../PhotosUploader';
import Perks from '../Perks';
import axios from 'axios';
import AccountNav from '../AccountNav';
import { Navigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function PlacesFormPage() {

    const { id } = useParams();


    const { action } = useParams();
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');

    const [addedPhotos, setAddedPhotos] = useState([]);

    const [description, setDescription] = useState('');
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState('');
    const [checkInTime, setCheckInTime] = useState('');
    const [checkOutTime, setCheckOutTime] = useState('');
    const [maxGuests, setMaxGuests] = useState(1);

    const [price, setPrice] = useState(100);
    const [redirectToPlacesList, setRedirectToPlacesList] = useState(false);

    useEffect(() => {
        if (!id) return;

        axios.get('/places/' + id).then(response => {
            const { data } = response;
            setTitle(data.title);
            setAddress(data.address);
            setAddedPhotos(data.photos);
            setDescription(data.description);
            setPerks(data.perks);
            setExtraInfo(data.extraInfo);
            setCheckInTime(data.checkInTime);
            setCheckOutTime(data.checkOutTime);
            setMaxGuests(data.maxGuest);
            setPrice(data.price);
        });
    }, [id]);


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

    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkInTime, checkOutTime, maxGuests, price,
        };
        try {
            if (id) {
                // Update
                await axios.put(`/places/${id}`, placeData);
            } else {
                // Create
                await axios.post('/places', placeData);
            }
            setRedirectToPlacesList(true);
        } catch (error) {
            console.error('Error saving place:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
            }
        }
    }

    if (redirectToPlacesList && !action) {
        return <Navigate to={'/account/places'} />;
    }

    return (

        <div>
            <AccountNav />
            <form onSubmit={savePlace}>

                <div>
                    {preInput('Title', 'Title for your place, should be and catchy as in advertisement')}
                    <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder="Title, for example: My lovely apt" />

                    {preInput('Address', 'Address to this place')}
                    <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder="address" />

                    {preInput('Photos', 'more = better')}

                    <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

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
                <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
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
                    <div>
                        <h3 className="mt-2 -mb-1">Price per night</h3>
                        <input
                            value={price}
                            onChange={ev => setPrice(ev.target.value)} type="number" placeholder="Check in time" />
                    </div>
                </div>

                <div >
                    <button className="primary my-4">Save</button>
                </div>
            </form>
        </div>
    );
}