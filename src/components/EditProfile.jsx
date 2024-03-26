import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from "axios";
import Navbar from './Navbar';
import "./EditProfile.css";

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${id}`);
        setData(response.data);
        setName(response.data.name);
        setEmail(response.data.email);
        setPhoneNumber(response.data.phone_number);
        setAddress(response.data.address);
        setAvatar(response.data.avatar);

      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, [id]);

  async function update() {
    try {
      const response = await axios.put(`http://localhost:8000/api/user/${id}`, {
        name,
        email,
        phone_number,
        address,
      });

      if (response.status === 200) {
        console.log(response.data.message);
        navigate('/profile');
      } else {
        console.log('Unexpected status:', response.status);
      }
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="row gutters">
          <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="account-settings">
                  <div >
                  <div>
                      {avatar ? (
                        <img src={`http://localhost:8000/${avatar}`} alt=""className="profile-avatar"  />
                      ) : (
                        <img src="/public/unknown.jpg" alt=""  />
                      )}
                    </div>
                    <h5 className="user-name">{name}</h5>
                    <h6 className="user-email">{email}</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h6 className="mb-2 text-primary">Personal Details</h6>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter full name" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email ID" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">   
                      <input type="text" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="Enter phone number" />
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                      <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter address" />
                  </div>
                </div>
                <div className="text-right">
                  <Button variant="secondary" onClick={() => navigate('/profile')}>Cancel</Button>{' '}
                  <Button variant="primary" onClick={update}>Update</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
