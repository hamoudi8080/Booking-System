import { Link } from "react-router-dom";

export default function RegisterPage() {
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl mb-4 text-center" type="text">Register</h1>
                <form className="max-w-md mx-auto  ">
                  <input type="text" placeholder="John Doe" />
                    <input type="email" placeholder="your@email.com" />
                    <input type="password" placeholder="Password" />
                    <button className="primary" >Register</button>
                    <div className="text-center py-2 test-gray-500">
                       Already a member <Link className="underline text" to={'/login'}>Register Now</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}