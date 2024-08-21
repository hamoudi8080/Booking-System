import { useParams } from "react-router-dom";

export default function BookingsPage() {
    const { id } = useParams();
    return(
        <div>
single booking {id}
        </div>
    );
}