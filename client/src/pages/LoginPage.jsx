import { Link, Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import axios from 'axios';
import { UserContext } from "../UserContext";
import Swal from 'sweetalert2';  // Correct import for SweetAlert2

export default function LoginPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    //When you pass UserContext to useContext, it returns the current context value, which can be an object, array, function, etc.
    const { setUser } = useContext(UserContext);
    const { user } = useContext(UserContext);

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('/login', {
                email,
                password
            });
            setUser(response.data);

            loginMsg('success',response );

            setRedirect(true);
        } catch (error) {

            loginMsg('failed');
        }

    }

    function loginMsg(msg, response) {

        if (msg === 'success') {
            return Swal.fire({
                title: 'Successfully Logged In',
                text: `Welcome, ${response.data.name}`,
                icon: 'success',
            });
        }
        else {
            return   Swal.fire({
                title: 'Login Failed',
                text: 'Please try again.',
                icon: 'error',
            });
        }

    }


    if (redirect) {
        return <Navigate to={'/'} />;
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl mb-4 text-center" type="text">Login</h1>
                <form className="max-w-md mx-auto " onSubmit={handleLoginSubmit}>

                    <input type="email" placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />

                    <input type="password" placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />

                    <button className="primary" >Login</button>
                    <div className="text-center py-2 test-gray-500">
                        Don't have an account yet? <Link className="underline text" to={'/register'}>Register Now</Link>
                    </div>
                </form>
            </div>

        </div>
    );
}