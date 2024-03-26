import React, { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import { Button, Table } from 'react-bootstrap';
import { FaUpload, FaSignOutAlt, FaTimes, FaSave, FaEdit } from "react-icons/fa";
import axios from "axios";
import Navbar from "./Navbar";
import Loading from "./Loading";
import AvatarEditor from "react-avatar-editor";
import "./Profile.css";

function Profile() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const [avatar, setAvatar] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const [avatarLoaded, setAvatarLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editor, setEditor] = useState(null);
  const [showCropBar, setShowCropBar] = useState(false);
  const [showCancelButton, setShowCancelButton] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    if (localStorage.getItem("user-info")) {
      const fetchData = async () => {
        try {
          let result = await fetch(`http://localhost:8000/api/user/${user.id}`);
          if (!result.ok) {
            throw new Error("Failed to fetch data");
          }
          result = await result.json();
          setAvatar(result.avatar);
          setAvatarLoaded(true);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };
      fetchData();
    }
  }, [user.id]);

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

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/user/${user.id}`);
        setUserInfo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [user.id]);

  async function handleUpload(acceptedFiles) {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setAvatar(file);
      setShowCropBar(true);
      setShowCancelButton(true);
      setShowEditor(true);
    }
  }

  async function handleSave() {
    if (editor) {
      const canvas = editor.getImage();
      const dataURL = canvas.toDataURL();
      const blobBin = atob(dataURL.split(",")[1]);
      const array = [];
      for (let i = 0; i < blobBin.length; i++) {
        array.push(blobBin.charCodeAt(i));
      }
      const file = new Blob([new Uint8Array(array)], { type: "image/png" });
      setAvatar(file);
      handleSubmit(file);
    }
  }

  async function handleSubmit(file) {
    const formData = new FormData();
    formData.append("file", file || avatar);
    try {
      const response = await axios.post(`http://localhost:8000/api/upload-avatar/${user.id}?_method=PUT`, formData);
      if (response.status === 200) {
        console.log(response.data.message);
        navigate("/Home");
      } else {
        console.log("Unexpected status:", response.status);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
    }
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/Home");
  }

  function handleCancel() {
    setAvatar(null);
    setShowCropBar(false);
    setShowCancelButton(false);
  }

  function getProductStatus(expirationTime) {
    const now = new Date().getTime();
    const distance = expirationTime - now;

    if (distance > 0) {
      return "Active";
    } else {
      return "Expired";
    }
  }

  return (
    <>
      <Navbar />
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div className="profile-container">
            <div className="profile-info">
              {showEditor && avatar && (
                <div className="editor-container">
                  <AvatarEditor ref={(editor) => setEditor(editor)} image={avatar} width={200} height={200} border={50} color={[255, 255, 255, 0.6]} borderRadius={100} scale={1} />
                  {showCropBar && (
                    <div className="crop-bar">
                      <Button onClick={handleSave}><FaSave /> Save</Button>
                      <Button onClick={handleCancel}><FaTimes /> Cancel</Button>
                    </div>
                  )}
                </div>
              )}
              {avatarLoaded && (
                <div className="info-avatar" onClick={() => document.getElementById("fileInput").click()}>
                  {avatar ? (
                    <img src={`http://localhost:8000/${avatar}`} alt="User Avatar" className="profile-avatar" />
                  ) : (
                    <img src="/public/unknown.jpg" alt="Unknown Avatar" className="profile-avatar" />
                  )}
                </div>
              )}
              <div className="info-det">
                <h1 className="font-a">{userInfo && userInfo.name}</h1>
                <div className="edit-out-btns">
                <Button as={Link} to={"/EditProfile/" + user.id} className="font-c edit-btn"><FaEdit /> Edit</Button>
                  <Button className="font-c logout-btn" onClick={handleLogout}><FaSignOutAlt /> Log out</Button>
              
              
                </div>
              </div>
            </div>
            <div className="profile-things font-c">
              <div className="profile-controls">
                <input id="fileInput" type="file" style={{ display: "none" }} onChange={(e) => handleUpload(e.target.files)} />
              </div>
              <div className="profile-actions">
                <h2>Your Auctions</h2>
                <Table striped bordered hover>
                  <thead className="thead-dark">
                    <tr color="red">
                      <th scope="col">Image</th>
                      <th scope="col">Name</th>
                      <th scope="col">Price</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item, index) => (
                      <tr key={item.pid}>
                        <th><img style={{ height: 100 }} src={"http://localhost:8000/" + item.file_path} alt={item.name} /></th>
                        <td>{item.name}</td>
                        <td>{item.price} MAD</td>
                        <td>{getProductStatus(new Date(item.expiration_time).getTime())}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;
