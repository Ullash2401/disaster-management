import contacts from "../data/contacts";
import "../styles/contact.css";
import {
  FaPhoneAlt,
  FaFireExtinguisher,
  FaAmbulance,
  FaHandsHelping,
  FaShieldAlt,
} from "react-icons/fa";

const Contact = () => {
  const renderIcon = (type) => {
    switch (type) {
      case "fire":
        return <FaFireExtinguisher className="contact-icon fire" />;
      case "medical":
        return <FaAmbulance className="contact-icon medical" />;
      case "police":
        return <FaShieldAlt className="contact-icon police" />;
      default:
        return <FaHandsHelping className="contact-icon volunteer" />;
    }
  };

  return (
    <div className="contact-root">
      <div className="contact-overlay"></div>

      <div className="contact-container">
        <h1 className="contact-title">Emergency Contact Information</h1>

        {/* Volunteers */}
        <div className="chat-bubble contact-bubble">
          <h2>Volunteer Contacts</h2>

          {contacts.volunteers.map((item, index) => (
            <div key={index} className="contact-item">
              <div className="contact-header">
                {renderIcon(item.type)}
                <h4>{item.name}</h4>
              </div>

              <p className="contact-area">📍 {item.area}</p>

              {item.phone.map((num, i) => (
                <a key={i} href={`tel:${num}`} className="contact-link">
                  <FaPhoneAlt /> {num}
                </a>
              ))}
            </div>
          ))}
        </div>

        {/* Emergency Services */}
        <div className="chat-bubble contact-bubble">
          <h2>Fire & Emergency Services</h2>

          {contacts.emergency.map((item, index) => (
            <div key={index} className="contact-item">
              <div className="contact-header">
                {renderIcon(item.type)}
                <h4>{item.name}</h4>
              </div>

              <p className="contact-area">📍 {item.area}</p>

              {item.phone.map((num, i) => (
                <a key={i} href={`tel:${num}`} className="contact-link">
                  <FaPhoneAlt /> {num}
                </a>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;