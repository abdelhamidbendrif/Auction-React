import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from "axios";
import Navbar from './Navbar';
import styles from '../components/EditProfile.module.css'; // Import your styles
import { Button,Modal } from 'react-bootstrap';

function EditProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(null);
  const [oldPasswordError, setOldPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

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
      const response = await axios.put(`http://localhost:8000/api/user/${id}`, { name, email, phone_number, address });

      if (response.status === 200) {
        console.log(response.data.message);
        navigate('/profile');
      } else { console.log('Unexpected status:', response.status); }
    } catch (error) {
      console.error('Error updating data:', error.message);
    }
  }

  async function updatePassword() {
    try {
      // Check if confirm password matches the new password
      if (newPassword !== confirmPassword) {
        alert('New password and confirm password do not match');
        return;
      }

      // Check if old password is the same as in the database
      const responseCheckOldPassword = await axios.post(`http://localhost:8000/api/user/${id}/check-old-password`, {
        old_password: oldPassword
      });

      if (responseCheckOldPassword.status !== 200) {
        setOldPasswordError('Old password is incorrect');
        setShowModal(true);
      
        return;
      } else {
        setOldPasswordError('');
      
      }

      const responseUpdatePassword = await axios.put(`http://localhost:8000/api/user/${id}/update-password`, {
        new_password: newPassword, // Send only the new password to replace the old one
      });

      if (responseUpdatePassword.status === 200) {
        console.log(responseUpdatePassword.data.message);
        setSuccessMessage('Password updated successfully');
        setShowModal(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setError(null);
      } else {
        console.log('Unexpected status:', responseUpdatePassword.status);
        setError(responseUpdatePassword.data.error);
      }
    } catch (error) {
      console.error('Error updating password:', error.message);
    
    }
  }
  function handleCancel() {
    navigate('/profile');
  }
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <div>
      <Navbar />
      <div className={styles.profileContainer}>
        <img src={avatar ? `http://localhost:8000/${avatar}` : '/public/unknown.jpg'} alt="Profile Avatar" className={styles.profileAvatar} />
        <h5 className={styles.userName}>{name}</h5>
        <h6 className={styles.userEmail}>{email}</h6>
        <h2>Profile Editing:</h2>
        <form>
          <div className={styles.inputContainer}>
            <div className={styles.inputGroup}>
              <p>Name:</p>
              <input
                type="text"
                id="name"
                placeholder='Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <p>Email:</p>
              <input
                type="email"
                id="email"
                placeholder='Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <p>Phone Number:</p>
              <input
                type="tel"
                id="phone_number"
                placeholder='Phone Number'
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <p>Address:</p>
              <input
                type="text"
                id="address"
                placeholder='Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <h3>Change Password</h3>
              <p>Your Old Password:</p>
              <input
                type="text"
                id="oldPassword"
                placeholder='Old Password'
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {oldPasswordError && <p className={styles.error}>{oldPasswordError}</p>}
            </div>
            <div className={styles.inputGroup}>
              <p>New Password:</p>
              <input
                type="text"
                id="newPassword"
                placeholder='New Password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <p>Confirm New Password:</p>
              <input
                type="text"
                id="confirmPassword"
                placeholder='Confirm New Password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className={styles.cancelButton} onClick={handleCancel}>Cancel</button>
          <Button className={styles.updateButton} onClick={update}>Update Profile</Button>
          <Button className={styles.updateButton} onClick={updatePassword}>Update Password</Button>
          {error && <p className={styles.error}>{error}</p>}
        </form>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{successMessage ? 'Success' : 'Error'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {successMessage ? successMessage : error}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default EditProfile;
