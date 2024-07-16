import { Link, useParams } from "react-router-dom";
import AccountNav from "../AccountNav";
export default function PlacesPage() {


    return (
        <div>
            <AccountNav /> 
                <div className="text-center mt-8">
                    List of all added PlacesFormPage
                    <br/>
                    <Link to={'/account/places/new'} className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add a new place
                    </Link>
                </div>     
        </div>
    );
}