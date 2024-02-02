import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function MyProducts() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      getData();
    };

    fetchData();
  }, []);

  async function deleteOperation(pid) {
    let result = await fetch('http://localhost:8000/api/delete/' + pid, {
      method: 'DELETE'
    });

    result = await result.json();
    alert(pid);
    getData();
  }

  async function getData() {
    try {
      let result = await fetch('http://localhost:8000/api/list');
      result = await result.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      navigate("/Home");
    }
  }, []);

  return (
    <div>
      <Header />
      <div className='d-flex flex-column align-items-center'>
        <h1> Product List </h1>  <br />
        <div className=' col-sm-8 off-sm-2 '>
          <Table bordered>
            <tr style={{ height: 50 }} >
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Operations</th>
            </tr>
            {
              data.map((item) =>
                <tr>
                  <td> <img style={{ width: 100, height: 100 }} src={"http://localhost:8000/" + item.file_path} /> </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td> <Button as={Link} to="/UpdateProduct" className='custom-update'>E</Button> 
                   <Button onClick={() => deleteOperation(item.pid)} className='custom-delete'>D</Button></td>
                </tr>
              )
            }
          </Table>
        </div>
        <br /> <br /> <br />
        <Button className='custom-add' as={Link} to="/AddProduct" >Add Product</Button> <br /> <br /> <br />
      </div>
    </div>

  );
}

export default MyProducts;