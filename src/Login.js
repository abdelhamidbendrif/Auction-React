import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from './Header';
import './style.css';

function Login() {

    
    const navigate = useNavigate();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    
    useEffect(()=>{
        if(localStorage.getItem('user-info')){
            navigate("/Home");
        }
    },[]);

    async function login() {
        console.warn(email, password);
        let Item = {email,password};
        console.warn(Item);

        let result = await fetch('http://localhost:8000/api/login',{
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
            <div className='custom-cont'>
                <div className="custom-login">
                    <h1 className='font-b mb-4'>Login</h1>

                    <input type="email" onChange={(e)=>setEmail(e.target.value)} className="form-control mb-2" placeholder="Email" />  <br />
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}  className="form-control mb-3" placeholder="Password" />  <br />

                    <Button onClick={login} className="custom-btn"> Done </Button> <br />
                </div>
            </div>
        </div>
    );
}

export default Login;