import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Header from './Header';
import './style.css';

function Login() {
    return (
        <div>
            <Header />
            <div className='custom-cont'>
                <div className="custom-login">
                    <h1>Login</h1>

                    <input type="email" className="form-control" placeholder="Email" />  <br />
                    <input type="password" className="form-control" placeholder="Password" />  <br />

                    <Button className="custom-btn"> Done </Button> <br />
                </div>
            </div>
        </div>
    );
}

export default Login;