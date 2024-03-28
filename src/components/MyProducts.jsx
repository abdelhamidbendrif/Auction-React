import React, { useEffect, useState } from 'react';
import { Button, Table, Modal } from 'react-bootstrap'; // Import Modal component from react-bootstrap
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FaPlus } from "react-icons/fa";
import "./MyProducts.css";
import Navbar from './Navbar';
import Loading from './Loading';

function MyProducts() {

  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation modal
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State to store product id to delete

  useEffect(() => {
    const fetchData = async () => {
      try {
        let user = JSON.parse(localStorage.getItem('user-info'));
        if (!user) {
          return;
        }
        let result = await fetch('http://localhost:8000/api/user/' + user.id + '/products');
        result = await result.json();
        setData(result);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  async function deleteOperation(pid) {
    setProductIdToDelete(pid); // Set the product id to delete
    setShowConfirmation(true); // Show the confirmation modal
  }

  async function confirmDelete() {
    try {
      let result = await fetch('http://localhost:8000/api/delete/' + productIdToDelete, {
        method: 'DELETE'
      });
      result = await result.json();
      getData();
      setShowConfirmation(false); // Hide the confirmation modal after deletion
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  async function getData() {
    try {
      let user = JSON.parse(localStorage.getItem('user-info'));
      if (!user) {
        return;
      }
      let result = await fetch('http://localhost:8000/api/user/' + user.id + '/products');
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

  function handleProductClick(product) {
    setSelectedProduct(product);
    // Remove navigate("/ProductCard/" + product.pid) from here
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className='d-flex flex-column align-items-center font-a'>
          <h1> Product List </h1> <br />
          <div className=' col-sm-8 off-sm-2 '>
            <Button className='custom-add' as={Link} to="/AddProduct"> <FaPlus /> Add Product </Button>

            <Table>
              <thead>
                <tr style={{ height: 50 }}>
                </tr>
              </thead>
              <tbody>
                {data.map((item) =>
                  <tr key={item.pid}>
                    <td>
                      <Link to={"/ProductCard/" + item.pid}>
                        <img style={{ height: 100 }} src={"http://localhost:8000/" + item.file_path} alt={item.name} />
                      </Link>
                    </td>
                    <td>{item.name.length > 35 ? `${item.name.substring(0, 35)}...` : item.name}</td>
                    <td>{item.price} $</td>
                    <td className='ops'>
                      <Button as={Link} to={"/UpdateProduct/" + item.pid} className='custom-update'>
                        <FontAwesomeIcon icon={faEdit} />
                      </Button>
                      <Button onClick={() => deleteOperation(item.pid)} className='custom-delete'>
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>

          </div>
          <br /> <br />
        </div>
      )}
      
      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>Cancel</Button>
          <Button variant="danger" onClick={confirmDelete}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MyProducts;
