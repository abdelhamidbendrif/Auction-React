import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Modal } from 'react-bootstrap'; // Import Modal from react-bootstrap
import axios from "axios";
import Navbar from './Navbar';
import './style.css';

function AddProduct() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem('user-info'));
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');
  const [expirationTime, setExpirationTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false); // State variable for confirmation modal

  async function addProduct() {
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

  const handleConfirmation = () => {
    setShowConfirmation(true); // Show confirmation modal
  };

  const handleConfirmAddProduct = () => {
    addProduct(); // Add the product
    setShowConfirmation(false); // Hide the confirmation modal after adding
  };

  return (
    <div>
      <Navbar />
      <div className="custom-cont">
        <div className="custom-login">
          <h1 className="font-b mb-4">Add Product</h1>
          <Form>
            <input type="text" onChange={(e) => setName(e.target.value)} placeholder="Name" className="form-control mb-2 " /> <br />
            <input type="number" onChange={(e) => setPrice(e.target.value)} placeholder="Price" className="form-control mb-3 " /> <br />
            <textarea onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="form-control mb-3"  rows="4" /><br />
            <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-3 form-control custom-placeholder" /> <br />
            <input type="datetime-local" onChange={(e) => setExpirationTime(e.target.value)} className="mb-3 form-control custom-placeholder" /> <br />
            <Button onClick={handleConfirmation} className="custom-btn"> Done </Button> <br /> <br /> <br />  <br /> <br />
          </Form>
          {/* Confirmation Modal */}
          <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Confirm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to add this product?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleConfirmAddProduct}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
