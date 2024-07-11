import { Link, useParams } from "react-router-dom";


export default function PlacesPage() {
    const { action } = useParams();

    return (
        <div>
            {action !== 'new' && (

                <div className="text-center mt-8">
                    <Link to={'/account/places/new'} className="bg-primary inline-flex gap-1 text-white py-2 px-6 rounded-full" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>

                        Add a new place
                    </Link>
                </div>

            )}

            {action === 'new' && (
                <div>

                    <form>
                        <div>
                            <h2 className="text-2xl mt-4">Title</h2>
                            <p className="text-gray-500 text-sm">Title for your place, should be and catchy as in advertisement</p>
                            <input type="text" placeholder="Title, for example: My lovely apt" />

                            <h2 className="text-2xl mt-4">Address</h2>
                            <p className="text-gray-500 text-sm">Address to this place</p>
                            <input type="text" placeholder="Title, for example: My lovely apt" />

                            <h2 className="text-2xl mt-4">Photos</h2>
                            <p className="text-gray-500 text-sm">more = better</p>

                            <div className="flex gap-2">
                                <input type="text" placeholder={'Add using a link ....jpg'}></input>
                                {/* &nbsp; means no breaking space. just try remove it and see the difference on the text. */}
                                <button className="bg-gray-200 px-4 rounded-2xl">Add&nbsp;photo</button>

                            </div>
                            <div className="mt-2 grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6">

                                <button className="flex justify-center gap-1 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-8">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                                    </svg>


                                    Upload
                                </button>


                            </div>

                        </div>
                    </form>
                </div>

            )}
            my places
        </div>
    );
}