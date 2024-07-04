import { Link } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const response = await axios.post('/login', {
                email,
                password
            });
            console.log(response.data);
            alert('Login Successful');
        } catch (error) {
            console.error(error);
            alert('Login Failed. Please try again.');
        }

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