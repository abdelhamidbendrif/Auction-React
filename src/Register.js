// Register.jsx
import React from 'react';
import { Button, Form } from 'react-bootstrap';
import './style.css';

function Register() {
    return (
        <div className='custom-cont'>
            <div className="custom-signup">
                <h2>Sign Up</h2>
                <Form>
                    <Form.Group controlId="formBasicName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="I agree to the terms and conditions" />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="custom-btn">
                        Sign Up
                    </Button>
                </Form>
            </div>

            <img src='https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp' className="custom-sideimg" fluid />
        </div>
    );
}

export default Register;
