import React, { useState } from 'react';
import { Button, CardBody, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import './style.css';

function Register() {

    const [username,setUsername] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate();

    async function signup() {
        let Item = {username,email,password};
        console.warn(Item);

        let result = await fetch('http://localhost:8000/api/register',{
            method:'POST',
            body:JSON.stringify(Item),
            headers:{
                "Content-Type":"application/json",
                "Accept":"application/json"
            }
        });

        result = await result.json();
        console.warn("result",result);
        localStorage.setItem("user-info",JSON.stringify(result));

        navigate("/Home");
    }

    return (
        <div>
            <Header />
            <div className='custom-cont col-sm-11 offset-sm-3'>
            <div className="custom-signup">
                <h1>Sign Up</h1>

                <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="form-control" placeholder="Username" />  <br />
                <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="form-control" placeholder="Email" />  <br />
                <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="Password" />  <br />
                <input type="password" className="form-control" placeholder="Confirm Password" />  <br />

                <Button onClick={signup} className="custom-btn"> Sign Up </Button> <br />
            </div>

            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' className="custom-sideimg" fluid />
        </div>
        </div>
        
    );
}

export default Register;
