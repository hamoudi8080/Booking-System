import axios from "axios";
import { useEffect, useState } from "react";

export default function IndexPage() {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    axios.get("/places").then((response) => {
      setPlaces([...response.data,...response.data,...response.data,...response.data,...response.data,...response.data]);
    });
  }, []);
  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
      {places.length > 0 && places.map(place => (
        <div>
          <div className="bg-gray-500 rounded-2xl flex mb-2" key={place.id}>
            {place.photos?.[0] && (
              <img className="rounded-2xl object-cover aspect-square  "src={'http://localhost:4000/uploads/' + place.photos?.[0]} alt="" />
            )}
            
          </div>
         
         
          <h3 className="font-bold">{place.address}</h3>
          <h2 className="text-sm truncate  text-gray-500"> {place.title}</h2>
          <div className="mt-1">
            <span className="font-bold">
            ${place.price} 
            </span>
            / night
          </div>
        
        </div>
       
      ))}
    </div>
  );
}