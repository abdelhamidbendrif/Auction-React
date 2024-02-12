import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './style.css';

function Register() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem('user-info')) {
            navigate("/Home");
        }
    }, []);

    async function signup() {
        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }
        if (!isValidEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!/^\w+$/.test(username)) {
            setError("Username must be a single word without spaces.");
            return;
        }

        let Item = { username, email, password };
        console.warn(Item);

        let result = await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            body: JSON.stringify(Item),
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        });

        result = await result.json();
        console.warn("result", result);

        localStorage.setItem("user-info", JSON.stringify(result));

        navigate("/Home");
    }

    function isValidEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }

    return (
        <div>
            <Header />
            {error && <div className="error-message">{error}</div>}
            <div className='custom-cont'>
                <div className="custom-signup">
                    <h1 className='mb-4 font-b'>Get Started</h1>

                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" placeholder="Username" required />  <br />
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="Email" required />  <br />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" placeholder="Password" required />  <br />
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="form-control mb-3" placeholder="Confirm Password" required />  <br />

                    <Button onClick={signup} className="custom-btn"> Sign Up </Button> <br />
                </div>

                <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' className="custom-sideimg" fluid />
            </div>
        </div>

    );
}

export default Register;
