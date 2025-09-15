import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/buyer.css";
// this is updated buyer.jsx

const Dashboard = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [activePage, setActivePage] = useState("home-page3");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const dashboardRef = useRef(null);
  const toggleBtnRef = useRef(null);
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const [orders, setOrders] = useState([]);
  const [acceptMessage, setAcceptMessage] = useState("");
 
  const [viewMode, setViewMode] = useState("main"); // 'main' or 'orders'

  const navigate = useNavigate();

  const formatCategoryName = (category) => category.charAt(0).toUpperCase() + category.slice(1);
  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme])
  

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) setUser(userData);
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

   
  }, []);
  

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/buyer/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("❌ Failed to fetch products:", err));
  }, []);

  const buyeremail = JSON.parse(localStorage.getItem("user"))?.email;

  useEffect(() => {
    if (products.length > 0 && buyeremail) {
      const filteredOrders = products.filter((item) => item.buyerEmail === buyeremail);
      setOrders(filteredOrders);
    }
  }, [products, buyeremail]);

  // const showPage = (pageId) => setActivePage(pageId);

  const pages = [
    "home-page3",
    "newspapers-page3",
    "metal-page3",
    "plastic-page3",
    "electronics-page3",
    "books-page3",
    "tyres-page3",
    "furniture-page3",
    
  ];
  const handleAccept = async () => {
    try {
      console.log(localStorage.getItem("user"))
      const buyerId = JSON.parse(localStorage.getItem("user"))._id  // Assuming the user object contains the _id
      const productId = selectedProduct._id;


      // Prepare the data to send in the API request
      const updatedData = {
        buyerId: buyerId,
        buyeremail: JSON.parse(localStorage.getItem("user")).email,
        status: "Accepted", 
      };

      console.log(updatedData)

      // Make API call to update the product with buyerId
      const response = await axios.put(`http://localhost:5000/api/seller/update-buyer/${productId}`, updatedData);
      console.log(response)

      if (response.status === 200) {
        // Successfully updated the product with buyerId
        setAcceptMessage("Accepted! Seller will be notified.");
        

        // Clear selected product and reset states
        setTimeout(() => {
          setAcceptMessage("");
          setActivePage("home-page3");
          setSelectedProduct(null);
          
        }, 2000);
      }
    } catch (err) {
      console.log("Error accepting product:", err);
      setAcceptMessage("Something went wrong.");
    }
  };

 
  

  return (
    <div>
      <header className="navbar3">
        <div className="logo3">PickmyScrap</div>
        <div className="nav-links3">
          <div
            className="profile-toggle3"
            ref={toggleBtnRef}
            onClick={() => setDashboardVisible(!dashboardVisible)}
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
              className="user-icon3"
              alt="User"
            />
            <span>{user.name}</span>
          </div>
        </div>
      </header>
      {viewMode === "orders" ? (
        <section className="orders-section">
           <button onClick={() => setViewMode("main")} className="back-btn3">
            🔙 Back to Browse
          </button>
          <h2>My Orders</h2>
          {orders.length === 0 ? (
            <p>No orders yet.</p>
          ) : (
            <ul>
              {orders.map((item) => (
                <li key={item._id}>
                  <strong>{item.title}</strong> — {item.status || "pending"}
                {/*   {item.imageUrl && (
                    <img
                      src={`http://localhost:5000${item.imageUrl}`}
                      alt={item.title}
                      className="order-image"
                    />
                  )}

                  */}
                  <p>Price: ₹ {item.price}</p>
                  <p>Condition: {item.condition}</p>
                  <p>Pickup Date: {new Date(item.pickupDate).toLocaleDateString()}</p>
                  <p>Category: {item.category}</p>
                  <p>Description: {item.description}</p>
                  <p>Seller Email: {item.sellerEmail}</p>
                  <p>Seller Name: {item.sellername}</p>
                  <p>Seller Phone: {item.sellerPhone}</p>
                  <p>Seller Address: {item.sellerAddress}</p>
                </li>
              ))}
            </ul>
          )}
         
        </section>
      ) : (
        <>
      <nav className="category-menu3">
        {pages.map((page) => (
          <a
            href="#"
            key={page}
            onClick={() => {
              const category = page.replace("-page3", "").toLowerCase();
              setActivePage(page);
            }}
          >
            {formatCategoryName(page.replace("-page3", ""))}
          </a>
        ))}
      </nav>

      {pages.map((page) => {
        const category = page.replace("-page3", "").toLowerCase();
        const filteredProducts = category === "home" ? products : products.filter((product) => product.category.toLowerCase() === category &&
        product.buyerEmail === null);

        return (
          <section
            key={page}
            id={page}
            className={`page3 ${activePage === page ? "active" : ""}`}
              >
          
                <h2>
                  {category === "home"
                    ? "Fresh Recommendations"
                    : `${formatCategoryName(category)} Products`}
                </h2>
                <div className="products3">
                  {filteredProducts
                    .filter((product) => product.buyerEmail === null)
                    .map((product, i) => (
                      <div
                        key={i}
                        className="product-card3"
                        onClick={() => {
                          setSelectedProduct(product);
                          setActivePage("product-page3");
                        }}
                      >
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="product-image3"
                        style={{ width: "100%", height: "200px" }}
                        />
                        <h3>₹ {product.price}</h3>
                        <p>{product.title}</p>
                      {/*  <p>{product.description}</p> */}
                        <p><strong>Condition:</strong> {product.condition}</p>
                      {/*  <p><strong>Pickup Date:</strong> {new Date(product.pickupDate).toLocaleDateString()}</p> */}
                        <p><strong>Category:</strong> {formatCategoryName(product.category)}</p>
                       
                        <p><strong>Seller Name:</strong> {product.sellername}</p>
                        <p><strong>Seller Phone:</strong> {product.sellerPhone}</p>
                        <p><strong>Seller Address:</strong> {product.sellerAddress}</p>
                        
                      </div>
                    ))}
                </div>
              </section>
          
        );
      })}

      {selectedProduct && (
        <section
          id="product-page3"
          className={`page3 ${activePage === "product-page3" ? "active" : ""}`}
        >
          <div className="product-container3">
            < div className="product-details3">
              <h2>{selectedProduct.title}</h2>
              <p className="product-price3">₹ {selectedProduct.price}</p>
              <p className="product-description3">{selectedProduct.description}</p>
              <p><strong>Condition:</strong> {selectedProduct.condition}</p>
              <p><strong>Pickup Date:</strong> {new Date(selectedProduct.pickupDate).toLocaleDateString()}</p>
              <p><strong>Category:</strong> {formatCategoryName(selectedProduct.category)}</p>
              <p><strong>Email:</strong> {selectedProduct.sellerEmail}</p>
              <p><strong>Seller Name:</strong> {selectedProduct.sellername}</p>
              <p><strong>Seller Phone:</strong> {selectedProduct.sellerPhone}</p>
              <p><strong>Seller Address:</strong> {selectedProduct.sellerAddress}</p>
              <p><strong>Status:</strong> {selectedProduct.status || "Pending"}</p>

            
           

              <button className="buy-btn3" onClick={handleAccept}>
                Accept Order
              </button>
              {acceptMessage && <p style={{ color: "green" }}>{acceptMessage}</p>}
            </div>
            <div className="product-image3">
              <img src={selectedProduct.imageUrl} alt="Product" style={{ width: "300px", height: "300px" }}/>
            </div>
          </div>
          
        </section>
      )}
      </>
      )}

      <div className={`dashboard3 ${dashboardVisible ? "active" : ""}`} ref={dashboardRef}>
        <h3>Welcome, <span>{user.name}</span></h3>
        <ul>
          <li><button onClick={() => setDashboardVisible(false)}>👤 Profile</button></li>
          <li><button>⚙ Settings</button></li>
          <li><button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>🌓 Toggle Theme</button></li>
          <li>
            <button
              onClick={() => {
                setViewMode("orders");
                setDashboardVisible(false);
              }}
            >
              📦 My Orders
            </button>
          </li>         
          <li><button className="logout-btn" onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>Logout</button></li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;