import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";
import "../css/admin.css";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("light");
  const [viewMode, setViewMode] = useState("main"); // 'main', 'listings', or 'orders'
  const dashboardRef = useRef(null);
  const toggleBtnRef = useRef(null);

  useEffect(() => {
    // Fetch users
    axios
      .get("http://localhost:5000/api/admin/users", { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch((err) => {
        setError("Failed to fetch users");
        console.error("Users Error:", err.response?.data, err.response?.status);
      });

    // Fetch listings (to filter orders)
    axios
      .get("http://localhost:5000/api/admin/listings", { withCredentials: true })
      .then((res) => setListings(res.data))
      .catch((err) => {
        setError("Failed to fetch listings");
        console.error("Listings Error:", err.response?.data, err.response?.status);
      });

    // Set theme from localStorage
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  // Fetch orders based on listings (similar to buyer.jsx logic)
  useEffect(() => {
    if (listings.length > 0) {
      // Filter orders where buyerEmail is not null and not deleted by admin
      const filteredOrders = listings.filter(
        (item) => item.buyerEmail !== null && !item.deletedByAdmin
      );
      setOrders(filteredOrders);
    }
  }, [listings]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dashboardRef.current &&
        toggleBtnRef.current &&
        !dashboardRef.current.contains(event.target) &&
        !toggleBtnRef.current.contains(event.target)
      ) {
        dashboardRef.current.classList.remove("open");
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, { withCredentials: true });
      setUsers(users.filter((user) => user._id !== id));
    } catch (err) {
      setError("Failed to delete user");
      console.error("Delete User Error:", err.response?.data);
    }
  };

  const deleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/listings/${id}`, { withCredentials: true });
      setOrders(orders.filter((order) => order._id !== id));
      setListings(listings.filter((listing) => listing._id !== id));
    } catch (err) {
      setError("Failed to delete order");
      console.error("Delete Order Error:", err.response?.data);
    }
  };

  const deleteListing = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/listings/${id}`, { withCredentials: true });
      setListings(listings.filter((listing) => listing._id !== id));
      setOrders(orders.filter((order) => order._id !== id));
    } catch (err) {
      setError("Failed to delete listing");
      console.error("Delete Listing Error:", err.response?.data);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const toggleDashboard = () => {
    dashboardRef.current.classList.add("open");
  };

  const closeDashboard = () => {
    dashboardRef.current.classList.remove("open");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const showListings = () => {
    setViewMode("listings");
    closeDashboard();
  };

  const showOrders = () => {
    setViewMode("orders");
    closeDashboard();
  };

  // Filter listings to exclude those deleted by admin
  const activeListings = listings.filter((listing) => !listing.deletedByAdmin);

  return (
    <>
      <header className="navbar5">
        <div className="logo5">PickMyScrap</div>
        <div className="nav-links5">
          <div className="profile-toggle5" onClick={toggleDashboard} ref={toggleBtnRef}>
            <FaUserCircle size={24} />
            <span>Admin</span>
          </div>
        </div>
      </header>

      {viewMode === "listings" ? (
        <section className="listings-section">
          <button onClick={() => setViewMode("main")} className="delete-btn2">
            Back to Dashboard
          </button>
          <h2>All Listings</h2>
          {activeListings.length === 0 ? (
            <p>No listings yet.</p>
          ) : (
            <ul className="products5">
              {activeListings.map((listing) => (
                <li key={listing._id} className="product-card5">
                  <img src={`http://localhost:5000${listing.imageUrl}`} alt={listing.title} />
                  <div>
                    <h3>{listing.title}</h3>
                    <p>Price: ₹ {listing.price}</p>
                    <p>Category: {listing.category}</p>
                    <p>Status: {listing.status}</p>
                    <p>Seller: {listing.sellerEmail}</p>
                    <p>Buyer: {listing.buyerEmail || "None"}</p>
                    <button className="delete-btn5" onClick={() => deleteListing(listing._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : viewMode === "orders" ? (
        <section className="listings-section">
          <button onClick={() => setViewMode("main")} className="delete-btn5">
            Back to Dashboard
          </button>
          <h2>All Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul className="products5">
              {orders.map((order) => (
                <li key={order._id} className="product-card5">
                  <img src={`http://localhost:5000${order.imageUrl}`} alt={order.title} />
                  <div>
                    <h3>{order.title}</h3>
                    <p>Price: ₹ {order.price}</p>
                    <p>Category: {order.category}</p>
                    <p>Status: {order.status}</p>
                    <p>Seller: {order.sellerEmail}</p>
                    <p>Buyer: {order.buyerEmail}</p>
                    <button className="delete-btn5" onClick={() => deleteOrder(order._id)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      ) : (
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          {error && <p className="error">{error}</p>}
          <section>
            <h2>All Users</h2>
            <table className="user-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button className="delete-btn5" onClick={() => deleteUser(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
      )}

      <div className="dashboard-drawer5" ref={dashboardRef}>
        <button className="close-btn5" onClick={closeDashboard}>×</button>
        <h3>Welcome, Admin</h3>
        <ul>
          <li>
            <button onClick={showListings}>📦 All Listings</button>
          </li>
          <li>
            <button onClick={showOrders}>📋 All Orders</button>
          </li>
          <li>
            <button onClick={toggleTheme}>🌓 Toggle Theme</button>
          </li>
          <li>
            <button onClick={handleLogout}>🚪 Logout</button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AdminDashboard;