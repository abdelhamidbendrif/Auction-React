import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import "./ProductCard.css";
import Header from "./Header";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

function ProductCard() {
  let user = JSON.parse(localStorage.getItem("user-info"));
  const { pid } = useParams();
  const [data, setData] = useState({});
  const [price, setPrice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedIncrement, setSelectedIncrement] = useState("");
  const [remainingTime, setRemainingTime] = useState("");
  const [expiredMessage, setExpiredMessage] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const [timer, setTimer] = useState("");
  const [lastBidder, setLastBidder] = useState("");
  const [confirmModalOpen, setConfirmModalOpen] = useState(false); // State for confirmation modal
  const [bidPlaced, setBidPlaced] = useState(false);

  useEffect(() => {
    // Fetch product data
    const fetchData = async () => {
      try {
        let result = await fetch(`http://localhost:8000/api/product/${pid}`);
        if (!result.ok) {
          throw new Error("error");
        }
        result = await result.json();
        setData(result);
        setPrice(result.price);

        const expirationTime = new Date(result.expiration_time).getTime();

        // Update remaining time
        const updateRemainingTime = () => {
          const now = new Date().getTime();
          const distance = expirationTime - now;

          if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor(
              (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
            );
            const minutes = Math.floor(
              (distance % (1000 * 60 * 60)) / (1000 * 60)
            );
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            setRemainingTime(`${days}d ${hours}h ${minutes}m ${seconds}s`);
            if (distance < 60000) {
              // If less than a minute left
              document.getElementById("remaining-time").style.color = "red"; // Change color to red
            }
          } else {
            setRemainingTime(null); // Set remaining time to null if auction has ended
            setExpiredMessage(""); // Clear the expired message
            setShowInput(true); // Show input field after auction ends
          }
        };
        updateRemainingTime();
        const timerId = setInterval(updateRemainingTime, 1000);

        return () => clearInterval(timerId); // Cleanup function to clear the interval
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [pid]);

  useEffect(() => {
    // Check if auction has expired
    const isAuctionExpired = localStorage.getItem("auctionExpired");
    if (isAuctionExpired === "true") {
      setExpiredMessage(""); // Clear the expired message
      setShowInput(true); // Show input field if auction has ended
    }
  }, []);

  useEffect(() => {
    // Fetch user details
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/user/${data.user_id}`
        );
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error.message);
      }
    };

    if (data.user_id) {
      fetchUserDetails();
    }
  }, [data.user_id]);
 // Function to handle bid confirmation


// Fetch bidPlaced status from local storage on component mount
useEffect(() => {
  const bidPlacedStatus = localStorage.getItem("bidPlaced");
  if (bidPlacedStatus === "true") {
    setBidPlaced(true);
  }
}, []);

// Modify the auction function to disable bidding if bidPlaced is true
// Function to handle bid confirmation
function confirmBid() {
  const proposedPrice = parseFloat(localStorage.getItem("proposedPrice"));
  if (!isNaN(proposedPrice)) {
    // Close the modal
    setConfirmModalOpen(false);

    // Set bidPlaced to true
    setBidPlaced(true);

    // Save bidPlaced status in local storage
    localStorage.setItem("bidPlaced", "true");

    // Send bid with proposed price
    sendBid(proposedPrice);
  }
}

// Function to send bid with proposed price
async function sendBid(proposedPrice) {
  try {
    // Update price with proposed price
    const response = await axios.put(
      `http://localhost:8000/api/update/${pid}`,
      {
        price: proposedPrice.toString(),
      }
    );

    if (response.status === 200) {
      console.log(response.data.message);
      setPrice(proposedPrice.toString());
      setShowInput(true); // Show input field after auction starts
      startCountdownTimer(); // Start countdown after auction starts
      
      // Reset bidPlaced status to false
      setBidPlaced(false);
      localStorage.setItem("bidPlaced", "false");
    } else {
      console.log("Unexpected status:", response.status);
    }
  } catch (error) {
    console.error("Error updating price:", error.message);
  }
}

// Modify the auction function to disable bidding if bidPlaced is true
async function auction() {
  try {
    if (!user) {
      setErrorMessage("You need to log in first to place a bid.");
      return;
    }

    const increment = parseFloat(selectedIncrement);
    if (isNaN(increment)) {
      console.error("Invalid increment:", selectedIncrement);
      return;
    }
    const currentPrice = parseFloat(price);
    if (isNaN(currentPrice)) {
      console.error("Invalid price:", price);
      return;
    }
    const updatedPrice = currentPrice + increment;

    if (user.id === data.user_id) {
      setErrorMessage("You cannot auction your own product");
      return;
    }

    if (bidPlaced) {
      setErrorMessage("You have already placed a bid.");
      return;
    }

    // Open confirmation modal
    setConfirmModalOpen(true);

    // Set the price in localStorage for confirmation
    localStorage.setItem("proposedPrice", updatedPrice.toString());
  } catch (error) {
    console.error("Error updating price:", error.message);
  }
}



  function handleIncrementChange(event) {
    setSelectedIncrement(event.target.value);
  }

  // Function to handle bid confirmation


  return (
    <div>
      <Header />
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="product-container">
        <div className="product-image">
          <img
            className="img"
            src={`http://localhost:8000/${data.file_path}`}
            alt={data.name}
          />
        </div>
        <div className="product-details">
          <div className="user-info">
            <img
              className="user-avatar"
              style={{ width: 45, height: 45 }}
              src={
                userDetails && userDetails.avatar
                  ? `http://localhost:8000/${userDetails.avatar}`
                  : "/unknown.jpg"
              }
              alt="Avatar"
            />
            <h2 className="font-c user-name">
              {userDetails ? userDetails.name : "..."}
            </h2>
          </div>
          <h1 className="product-title">{data.name}</h1>
          <p className="product-description">{data.description}</p>
          <div className="product-price">
            <span className="product-price-label">Price : </span>
            <span className="product-price-value">${price}</span>
          </div>
          <div className="product-time">
            {!showInput && (
              <>
                <p>Auction will start soon...</p>
                <span className="product-time-label">Time Left : </span>
                <span className="product-time-value" id="remaining-time">
                  {remainingTime}
                </span>
              </>
            )}
            {showInput && (
              <>
                <div className="countdown-container">
                  {/* Display countdown when auction has started */}
                  <p>Auction ends in: {timer}</p>
                </div>
                <input
                  type="number"
                  value={selectedIncrement}
                  onChange={handleIncrementChange}
                  placeholder="Enter increment amount"
                  className="form-control"
                />
                {user && user.id === data.user_id ? (
                  <button className="product-button" disabled>
                    Add Auction
                  </button>
                ) : (
                  <button onClick={auction} className="product-button">
                    Add Auction
                  </button>
                )}
              </>
            )}
          </div>
          {expiredMessage && !showInput && (
            <p className="red-text">{expiredMessage}</p>
          )}
        </div>
      </div>

      <Modal show={confirmModalOpen} onHide={() => setConfirmModalOpen(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Bid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to place a bid for ${localStorage.getItem("proposedPrice")}?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setConfirmModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmBid}>
            Confirm Bid
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ProductCard;
