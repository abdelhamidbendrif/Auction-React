import React from 'react';
import { Form, Button } from 'react-bootstrap';
import Header from './Header';
import './style.css';

function UpdateProduct() {
  return (
    <div>
      <Header />
      <div className="custom-cont">
        <div className="custom-login">
          <h1 className="font-b mb-4">Update Product</h1>

          <Form>
            <input type="text"  placeholder="Name" className="form-control mb-2 " /> <br />
            <input type="number"placeholder="Price" className="form-control mb-3 " /> <br />
            <input type="text" placeholder="Description" className="form-control mb-3" /> <br />
            <input type="file" className="mb-3 form-control custom-placeholder" />

            <Button className="custom-btn"> Done </Button>
          </Form>

        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;