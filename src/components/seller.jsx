import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import '../css/seller.css';

const SellerDashboard = () => {
  const [user, setUser] = useState({ name: '', email: '' });
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    condition: '',
    selleremail: '',
    price: '',
    pickupDate: '',
    imageURL: null,
    email: ''
  });
  const [theme, setTheme] = useState('light');
  const dashboardRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [myListings, setMyListings] = useState([]);
  const [viewMode, setViewMode] = useState('main'); // 'main', 'listings', or 'price-details'

  const navigate = useNavigate();

  const fetchMyListings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/scrapget/get-by-seller/${user.email}`);
      setMyListings(res.data);
      setViewMode('listings');
    } catch (err) {
      console.error(err);
      alert('Failed to fetch your listings');
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) setUser(userData);
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dashboardRef.current &&
        toggleBtnRef.current &&
        !dashboardRef.current.contains(event.target) &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        dashboardRef.current.classList.remove('open');
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleDashboard = () => {
    dashboardRef.current.classList.add('open');
  };

  const closeDashboard = () => {
    dashboardRef.current.classList.remove('open');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    formDataToSend.append('sellerEmail', user.email);

    try {
      const response = await axios.post('http://localhost:5000/api/seller/post-scrap', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Item posted successfully!');
      setFormData({
        title: '',
        category: '',
        description: '',
        condition: '',
        price: '',
        pickupDate: '',
        image: null,
        email: ''
      });
    } catch (err) {
      console.error('Error uploading item:', err.response ? err.response.data : err);
      alert('Upload failed.');
    }
  };

  const handleDelete = async (listingId) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      try {
        await axios.delete(`http://localhost:5000/api/scrap/delete/${listingId}`);
        setMyListings(myListings.filter((item) => item._id !== listingId));
        alert('Listing deleted successfully!');
      } catch (err) {
        console.error('Error deleting listing:', err);
        alert('Failed to delete listing.');
      }
    }
  };

  // Price details data
  const priceDetails = [
    { item: 'Cardboard', price: '20-25 per KG' },
    { item: 'Newspaper', price: '15-20 per KG' },
    { item: 'Steel', price: '35-45 per KG' },
    { item: 'Stainless Steel', price: '140-150 per KG' },
    { item: 'Tyres', price: '20-35 per KG' },
    { item: 'Metal', price: '45-55 per KG' },
    { item: 'Books', price: '15-20 per KG' },
    { item: 'Paper', price: '15-25 per KG' },
  ];

  return (
    <>
      <header className="navbar2">
        <div className="logo2">PickmyScrap</div>
        <div className="nav-links2">
          <div className="profile-toggle2" onClick={toggleDashboard} ref={toggleBtnRef}>
            <FaUserCircle size={24} />
            <span>{user.name || 'Seller'}</span>
          </div>
        </div>
      </header>

      {viewMode === 'listings' ? (
        <section className="listings-section">
          <button
            onClick={() => setViewMode('main')}
            className="back-btn3"
          >
            Close
          </button>
          <h2>My Listings</h2>
          {myListings.length === 0 ? (
            <p>No listings yet.</p>
          ) : (
            <ul className='products2'>
              {myListings.map((item) => (
                <li key={item._id} className="product-card2">
                  <strong>{item.title}</strong> — {item.status || 'pending'}
                  {item.imageUrl && (
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.title}
                      className="listing-image"
                    />
                  )}
                  <p>Price: ₹ {item.price}</p>
                  <p><b>Description:</b> {item.description}</p>
                  <p><b>Category:</b> {item.category}</p>
                  <p><b>Condition:</b> {item.condition}</p>
                  <p><b>Pickup Date:</b> {new Date(item.pickupDate).toLocaleDateString()}</p>
                  <p><b>Buyer Email:</b> {item.buyerEmail || 'Pending, no one accepted'}</p>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="delete-btn2"
                  >
                    Delete Listing
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : viewMode === 'price-details' ? (
        <section className="price-details-section">
          <button
            onClick={() => setViewMode('main')}
            className="back-btn3"
          >
            Back
          </button>
          <h2>Price Details</h2>
          <table className="price-details-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {priceDetails.map((detail, index) => (
                <tr key={index}>
                  <td>{detail.item}</td>
                  <td>{detail.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <div className="seller-wrapper">
          <div className="seller-container">
            <div className="seller-form-section">
              <h2>Post Your Scrap</h2>
              <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Item Title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  <option value="newspapers">Newspapers</option>
                  <option value="electronics">Electronics</option>
                  <option value="metals">Metals</option>
                  <option value="plastics">Plastics</option>
                </select>
                <label htmlFor="description">Description</label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="condition">Condition</label>
                <select
                  id="condition"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Condition</option>
                  <option value="good">Good</option>
                  <option value="average">Average</option>
                  <option value="poor">Poor</option>
                </select>
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  placeholder="Estimated Price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="pickupDate">Pickup Date</label>
                <input
                  type="date"
                  id="pickupDate"
                  name="pickupDate"
                  value={formData.pickupDate}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="image">Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleImageChange}
                  required
                />
                <button type="submit">Post Item</button>
              </form>
            </div>

            <div className="seller-upload-section">
              <button
                className="price-details-btn"
                onClick={() => setViewMode('price-details')}
              >
                Price Details
              </button>
              <div
                className="seller-image-preview"
                style={{
                  backgroundImage: formData.image ? `url(${URL.createObjectURL(formData.image)})` : 'none',
                }}
              ></div>
              {formData.image && (
                <button className="seller-remove-btn" onClick={() => setFormData({ ...formData, image: null })}>
                  Remove Image
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="dashboard-drawer2" ref={dashboardRef}>
        <button className="close-btn2" onClick={closeDashboard}>×</button>
        <h3>Welcome, {user.name || 'Seller'}</h3>
        <ul>
          <li>
            <button onClick={fetchMyListings}>📦 View My Listings</button>
          </li>
          <li><button onClick={() => alert('Post New Scrap')}>➕ Post New Scrap</button></li>
          <li><button onClick={() => alert('Earnings Overview')}>💰 Earnings</button></li>
          <li><button onClick={() => alert('Account Settings')}>⚙ Settings</button></li>
          <li><button onClick={toggleTheme}>🌓 Toggle Theme</button></li>
          <li>
            <button onClick={() => {
              localStorage.removeItem('user');
              window.location.href = '/login';
            }}>
              🚪 Logout
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SellerDashboard;

