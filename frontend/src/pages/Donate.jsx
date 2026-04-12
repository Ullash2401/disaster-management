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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.amount <= 0) {
      alert("Amount must be greater than 0");
      return;
    }
    try {
      setLoading(true);
      await axios.post("http://localhost:5000/api/donations", formData);
      alert("Donation submitted successfully!");
      setFormData({
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
    } catch (error) {
      console.log(error);
      alert("Error submitting donation");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="donation-wrapper">
      {/* Overlay */}
      <div className="donation-overlay"></div>

      <div className="donation-card">
        <div className="donation-form">
          <h2>Donation Form</h2>

          <form onSubmit={handleSubmit}>
            <div className="row">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <div className="row">
              <input
                type="text"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <input
              type="number"
              placeholder="Donation Amount ($)"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
            />

            <select
              name="disasterType"
              value={formData.disasterType}
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
              value={formData.paymentMethod}
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
              value={formData.message}
              onChange={handleChange}
            />

            {/* Anonymous checkbox with tick on the left */}
            <div className="checkbox">
              <input
                type="checkbox"
                id="anonymous"
                name="anonymous"
                checked={formData.anonymous}
                onChange={handleChange}
              />
              <label htmlFor="anonymous">Donate anonymously</label>
            </div>

            <button type="submit" className="donate-btn" disabled={loading}>
              {loading ? "Processing..." : "Donate"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}