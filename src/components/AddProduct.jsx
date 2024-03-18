import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import axios from "axios";
import Header from './Header';
import './style.css';

function AddProduct() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); 

  async function addProduct() {
  
    if (!showConfirmation) {
      setShowConfirmation(true);
      return; 
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);
    formData.append('user_id', user.id);
    formData.append('expiration_time', expirationTime); 

    await axios.post('http://127.0.0.1:8000/api/addproduct', formData)
      .then(({ data }) => {
        console.log(data.message);
        navigate('/MyProducts');
      }).catch(({ response }) => {
        if (response.status === 442) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  }

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate('/Home');
    }
  }, [navigate]);

  return (
    <div>
      <Header />
      <div className="custom-cont">
        <div className="custom-login">
          <h1 className="font-b mb-4">Add Product</h1>
          <Form>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" className="form-control mb-2 " /> <br />
            <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="form-control mb-3 " /> <br />
            <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="form-control mb-3" /> <br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-3 form-control custom-placeholder" />
            <input type="datetime-local" onChange={(e) => setExpirationTime(e.target.value)} className="mb-3 form-control custom-placeholder" />

            <Button onClick={addProduct} className="custom-btn"> Done </Button>
          </Form>
        </div>
      </div>

      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Confirm Information</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-center">Are you sure you want to confirm the information you entered?</p>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddProduct;
