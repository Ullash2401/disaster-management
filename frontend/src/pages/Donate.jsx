import { useState } from "react";
import axios from "axios";
import "../styles/donate.css";

export default function Donate() {

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    amount: "",
    disasterType: "",
    paymentMethod: "",
    anonymous: false,
    message: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "http://localhost:5000/api/donations",
        formData
      );

      alert("Donation submitted successfully!");

    } catch (error) {
      console.log(error);
      alert("Error submitting donation");
    }
  };

  return (
    <div className="donation-wrapper">

      <div className="donation-card">

        <div className="donation-form">

          <h2>Be a Donor</h2>

          <form onSubmit={handleSubmit}>

            <div className="row">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                onChange={handleChange}
                required
              />

              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="text"
                placeholder="Country"
                name="country"
                onChange={handleChange}
              />

              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                onChange={handleChange}
              />
            </div>

            <input
              type="number"
              placeholder="Donation Amount ($)"
              name="amount"
              onChange={handleChange}
              required
            />

            <select
              name="disasterType"
              onChange={handleChange}
              required
            >
              <option value="">Select Disaster Type</option>
              <option>Flood Relief</option>
              <option>Earthquake Relief</option>
              <option>Cyclone Relief</option>
              <option>Wildfire Relief</option>
              <option>General Disaster Fund</option>
            </select>

            <select
              name="paymentMethod"
              onChange={handleChange}
              required
            >
              <option value="">Payment Method</option>
              <option>Credit Card</option>
              <option>Debit Card</option>
              <option>Mobile Banking</option>
              <option>Bank Transfer</option>
            </select>

            <textarea
              placeholder="Message (optional)"
              name="message"
              onChange={handleChange}
            />

            <div className="checkbox">
              <input
                type="checkbox"
                name="anonymous"
                onChange={handleChange}
              />
              <label>Donate anonymously</label>
            </div>

            <button type="submit" className="donate-btn">
              Donate
            </button>

          </form>

        </div>

        <div className="donation-image">

          <img
            src="https://cdn-icons-png.flaticon.com/512/1040/1040230.png"
            alt="donation"
          />

        </div>

      </div>

    </div>
  );
}