import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Header from './Header';
import './style.css';

function UpdateProduct() {

  const { pid } = useParams(); 
  const navigate = useNavigate();
  const [data, setData] = useState({}); 
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState('');

  useEffect(() => {
    const fetchData = async () => { // Defining fetchData function
      try {
        const response = await fetch(`http://localhost:8000/api/product/${pid}`);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData(); 
  }, [pid]);

  async function update() {
    console.warn(name, description, price, file);
    const formData = new FormData;
    formData.append('file', file);
    formData.append('name', name);
    formData.append('description', description);
    formData.append('price', price);

    await axios.post('http://127.0.0.1:8000/api/update/' + pid , formData)
      .then(({ data }) => {
        console.log(data.message);
        navigate('/MyProducts')
      }).catch(({ response }) => {
        if (response.status == 442) {
          console.log(response.data.errors);
        } else {
          console.log(response.data.message);
        }
      });
  }

  return (
    <div>
      <Header />
      <div className="custom-cont">
        <div className="custom-login">
          <h1 className="font-b mb-4">Update Product</h1>

          <Form>
            <input type="text" defaultValue={data.name} placeholder="Name" className="form-control mb-2 " /> <br />
            <input type="number" defaultValue={data.price} placeholder="Price" className="form-control mb-3 " /> <br />
            <input type="text" defaultValue={data.description} placeholder="Description" className="form-control mb-3" /> <br />
            <img style={{ width: 100, height: 100 }} src={"http://localhost:8000/" + data.file_path} />
            <input type="file" defaultValue={data.file_path} className="mb-3 form-control custom-placeholder" />

            <Button onClick={update} className="custom-btn"> Done </Button>
          </Form>

        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
