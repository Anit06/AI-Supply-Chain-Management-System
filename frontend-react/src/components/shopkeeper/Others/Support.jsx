import { useState } from "react";
import {
  FaShippingFast,
  FaUndoAlt,
  FaComments,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaChevronDown
} from "react-icons/fa";
import "../../../assets/css/support.css"; // Adjust path to match your project folder structure

function Support() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderId: "",
    subject: "General Inquiry",
    message: ""
  });

  const [activeFaq, setActiveFaq] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      id: 1,
      question: "How can I track my order status?",
      answer: "You can track your order in real-time by navigating to 'Order History' in your account or using the Quick Track feature above with your Order ID."
    },
    {
      id: 2,
      question: "What is your return and refund policy?",
      answer: "We offer a 7-day hassle-free return policy for unused items in original packaging. Refunds are processed within 3-5 business days after inspection."
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer: "We accept Cash on Delivery (COD), UPI (GPay, PhonePe, Paytm), Credit/Debit Cards, and Net Banking across major banks."
    },
    {
      id: 4,
      question: "How do I modify or cancel my order?",
      answer: "Orders can be cancelled or modified within 1 hour of placing them via the Order History page or by contacting our live support team."
    }
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", orderId: "", subject: "General Inquiry", message: "" });
    }, 4000);
  };

  const toggleFaq = (id) => {
    setActiveFaq(activeFaq === id ? null : id);
  };

  return (
    <div className="support-container">
      {/* Hero Banner */}
      <section className="support-hero">
        <div className="hero-content">
          <p className="hero-eyebrow">Customer Service</p>
          <h1>How can we help you today?</h1>
          <p className="hero-subtext">
            Have a question about an order, delivery, or return? We are here to support you 24/7.
          </p>
        </div>
      </section>

      {/* Quick Action Support Cards */}
      <section className="quick-actions-grid">
        <div className="action-card">
          <div className="action-icon">
            <FaShippingFast />
          </div>
          <h3>Track Order</h3>
          <p>Check real-time delivery status of your shipment.</p>
          <button className="action-btn" type="button">Track Package</button>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <FaUndoAlt />
          </div>
          <h3>Returns & Exchanges</h3>
          <p>Initiate a quick return or check refund status.</p>
          <button className="action-btn" type="button">Start Return</button>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <FaComments />
          </div>
          <h3>Live Chat</h3>
          <p>Chat directly with our customer support team.</p>
          <button className="action-btn primary-action" type="button">Start Chat</button>
        </div>

        <div className="action-card">
          <div className="action-icon">
            <FaPhoneAlt />
          </div>
          <h3>Call Us</h3>
          <p>Speak to our representative line directly.</p>
          <a href="tel:18001234567" className="action-btn-link">1800-123-4567</a>
        </div>
      </section>

      {/* Main Form & Info Section */}
      <div className="support-main-grid">
        {/* Contact Form */}
        <section className="support-card form-card">
          <div className="card-header">
            <h2>Send us a Message</h2>
            <p>Fill out the form below and our team will get back to you within 24 hours.</p>
          </div>

          {submitted && (
            <div className="success-banner">
              ✅ Thank you! Your message has been sent successfully. We will reply shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="support-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="e.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="e.g. john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="orderId">Order ID (Optional)</label>
                <input
                  type="text"
                  id="orderId"
                  name="orderId"
                  placeholder="e.g. ORD-98234"
                  value={formData.orderId}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject *</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Order Status">Order Status</option>
                  <option value="Return / Refund">Return / Refund</option>
                  <option value="Payment Issue">Payment Issue</option>
                  <option value="Feedback">Feedback</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Message *</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Describe your issue or question in detail..."
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Submit Request
            </button>
          </form>
        </section>

        {/* Contact Info Sidebar */}
        <aside className="support-sidebar">
          <div className="support-card info-card">
            <h2>Direct Contact Info</h2>
            <p className="info-desc">Reach out directly via email, phone, or visit our headquarters.</p>

            <div className="contact-item">
              <div className="info-icon"><FaPhoneAlt /></div>
              <div>
                <h4>Toll-Free Support</h4>
                <p>+91 1800-123-4567</p>
                <span className="timing">Mon - Sat (9:00 AM - 8:00 PM)</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="info-icon"><FaEnvelope /></div>
              <div>
                <h4>Email Us</h4>
                <p>support@ecommerce.com</p>
                <span className="timing">Response within 24 hours</span>
              </div>
            </div>

            <div className="contact-item">
              <div className="info-icon"><FaMapMarkerAlt /></div>
              <div>
                <h4>Corporate Office</h4>
                <p>Baner–Aundh Link Road, Baner, Pune, Maharashtra, India, 411045</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Frequently Asked Questions */}
      <section className="faq-section">
        <div className="section-header">
          <h2>Frequently Asked Questions</h2>
          <p>Quick answers to common questions our customers ask.</p>
        </div>

        <div className="faq-list">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`faq-item ${activeFaq === faq.id ? "active" : ""}`}
              onClick={() => toggleFaq(faq.id)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <FaChevronDown className={`chevron-icon ${activeFaq === faq.id ? "rotate" : ""}`} />
              </div>
              {activeFaq === faq.id && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Support;