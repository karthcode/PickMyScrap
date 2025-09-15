import '../css/landingpage.css';
import React from 'react';  
import shopingimage from '../images/shopping.png';
import negotiationimage from '../images/negotiation.png';
import digitalimage from '../images/digital.png';
import cardboard from '../images/cardboard.jpg';
import wood from '../images/wood.jpg';
import metal from '../images/metal.jpg';
import plastic from '../images/plastic.jpg';
import video from '../images/video.mp4';
import newspaper from '../images/newspaper.jpg';
import aboutscrap from '../images/image.png';

import { useNavigate } from "react-router-dom";
function Landingpage() {
  const navigate = useNavigate();
    return (
        <div>
  
  <title>PickMyScrap Landing Page</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap" rel="stylesheet" />
  <header>
    <div className="container header-container">
      <div className="logo">PickMyScrap</div>
      <div className="menu-icon" id="menu-icon">☰</div>
      <nav className="navbar">
        <div className="nav-links">
        <a href="#hero">Home</a>  
        <a href="#services">Services</a>
        <a href='#about'>About</a>
        <a href="#images">Items</a>
        <a href="#features">Features</a>
        <a href="#contact">Contact</a>
      {/* <a href="#screenshot">Screenshot</a> 
        <Link to="/">Home</Link>
        <Link to="/services">services</Link>
        <Link to="/About">About</Link>
        <Link to="/Items">Items</Link>
        <Link to="/features">Features</Link>
        <Link to="/contact">Contact</Link>
         
      */}
        <button onClick={() => navigate("/Login")}>Login</button>  
          {/*  <a href="#login" class="login-button">Login</a>     */}
        </div>
      </nav>
    </div>
  </header>
  {/* Mobile Menu */}
  <div id="mobile-menu" className="mobile-menu">
    <div className="mobile-menu-header">
      <div className="logo">PickMyScrap</div>
      <div className="close-icon" id="close-icon">×</div>
    </div>
    <nav className="mobile-nav">
      <a href="#">Home</a>
      <a href="#">Features</a>
      <a href="#">Screenshot</a>
      <a href="#">Pricing</a>
      <a href="#">Team</a>
      <a href="#">Download</a>
      <a href="#">Blog</a>
      <a href="#">Contact</a>
    </nav>
  </div>
  {/* Hero Section */}
  <section id="hero" className='hero'>
    <div className="container hero-container">

      <div className="hero-text">
        <h1 >Sell your scrap<br />At your Doorstep</h1>
        <p>Using Our PickMyScrap !!</p>
        {/* 
<button class="video-btn" aria-label="Watch the video">
   <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg>
    Watch the video  
*/}
      </div>
            <div className="hero-image">
      <video width={600} height={400} autoPlay loop muted>
        <source src={video} type="video/mp4" /> 
        </video>
      </div>
    </div>
  </section>
  {/* Services Section */}
  <section className="services" id='services'>
    <div className="container services-container">
      <div className="service-card">
        <img className="shoppingImage" src={shopingimage} alt="Call Service Icon" />

    
        <h3>Door Step pickup</h3>
        <p> Contactless exchange, saves time for sellers, boosts trust</p>
      </div>
      <div className="service-card">
        <img className="home" src={negotiationimage} alt="support icon" />

        {/* <img src="https://img.icons8.com/ios-filled/100/8A2BE2/error--v1.png" alt="Active Warning Icon" />   */}
        <h3>Instant Scrap Pricing &amp; Negotiation</h3>
        <p>Transparent pricing, win-win deals, fast closure</p>
      </div>
      <div className="service-card">
        <img src={digitalimage} alt="Care Plan Icon" />
        <h3>Digital Scrap Order Management</h3>
        <p>Paperless, organized, and always accessible</p>
      </div>
    </div>
  </section>
  {/* About App Section */}
  <section className="about-app" id='about'>
    <div className="container about-container">
    <div className='forcss'>
        <h2>About this</h2>
      <div className="underline" />
      <p className="subheading">Turn Trash into Cash — Fast, Fair at Your Doorstep!</p>
      <div className="about-content">
        <div className="about-image">
          <img src={aboutscrap} alt="aboutscrap" className="aboutscrap" />
        </div>
        <div className="about-text">
          <p><span>PickMyScrap</span> is a smart scrap management platform where users can sell household scrap like newspapers, metal, and electronics with ease. Sellers upload item details, set their price, and negotiate directly with buyers. Buyers browse listings, make offers, and schedule home pickups. The app streamlines waste selling into a simple, transparent, and eco-conscious process.</p>
        </div>
      </div>
      </div>
    </div>
  </section>
 {/* images Section */}
<section className="images" id='images'>
<div className='forcss'>
  
<h2 className='images-heading'>Items</h2>
      <div className="underline" />
     {/* <p className="subheading">Turn Trash into Cash — Fast, Fair at Your Doorstep!</p>  */}
    <div className="container images-container">
      <div className="images-card">
      <a onClick={() => navigate("/Login")} className="card1">
        <img className="metal" src={metal} alt="metal" />
        <h3>Metal</h3>
        <p>Metal is a solid material that is typically hard, shiny, and malleable, used in construction and manufacturing.</p>

        </a>
      </div>
      <div className="images-card">
      <a onClick={() => navigate("/Login")} className="card1">
      <img src={plastic} alt="Plastic" className="plastic" />
        <h3>Plastic</h3>
        <p>Plastic is a synthetic material made from polymers, widely used in various applications.</p>
          </a>

        {/* <img src="https://img.icons8.com/ios-filled/100/8A2BE2/error--v1.png" alt="Active Warning Icon" />   */}
       
      </div>
      <div className="images-card">
      <img src={wood} alt="Wood" className="wood" />
      <a onClick={() => navigate("/Login")} className="card1">
                <h3>Wood</h3>
        <p>Wood is a natural material derived from trees, known for its strength and versatility.</p>
        </a>
      </div>
      <div className='images-card'>
        <img src={cardboard} alt="cardboard" className='cardboard'/>
        <a onClick={() => navigate("/Login")} className="card1">
        <h3>Cardboard</h3>  
        <p>Cardboard is a lightweight, durable material made from cellulose fibers, used for packaging and crafts.</p>
        </a>
</div>
        <div className="images-card">
        <img src={newspaper} alt="newspaper" className='newspaper'/>
        <a onClick={() => navigate("/Login")} className="card1">
        <h3>Newspaper</h3>
        <p>Newspaper is a printed publication containing news, articles, and advertisements, typically made from recycled paper.</p>
        </a>
        </div>
</div>
      </div>
   
  </section>
  {/* Features Section */}
<section id="features" className="features">
  <div className="container features-container">
    <h2 className='features-heading'>Features</h2>
    <div className="underline" />
    <p className="subheading">Power-Packed Simplicity, One Scrap at a Time</p>
    <div className="features-grid">
      <div className="feature-item">
        <div className="feature-text">
          <h3>Easy Scrap Listing</h3>
          <p>Can quickly upload scrap details, photos, and price estimates in seconds. A guided form ensures accurate and smooth listings.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-text">
          <h3>Fixed Price Model</h3>
          
          All scrap listings display a non-negotiable fixed price set by the seller. Buyers can either accept or contact for bargaing.  
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-text">
          <h3>Role-Based Dashboards</h3>
          <p>Separate dashboards for Sellers and Buyers with tailored views. Track your listings, offers, and orders effortlessly</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-text">
          <h3>Pickup Scheduling</h3>
          <p>Buyers can schedule doorstep pickups after negotiation approval. Everything is tracked from pickup to completion.</p>
        </div> 
      </div>
      <div className="feature-item">
        <div className="feature-text">
          <h3>Secure Sign-up & Login</h3>
          <p>Protects your data and controls platform access smartly.</p>
        </div>
      </div>
      <div className="feature-item">
        <div className="feature-text">
          <h3>Order Tracking System</h3>
          <p>Both sellers and buyers can track status: from “Available” to “Picked.” Every transaction is stored and timestamped.</p>
        </div>
      </div>
    </div>
  </div>
</section>
  {/* Contact Us Section */}
  <section className="contact-us" id='contact'>
    <div className="container contact-container">
      <h2>Contact Us</h2>
      <div className="underline" />
      <p className="subheading">Have questions or ready to connect? We’re just a message away</p>
      <div className="contact-content">
        <form className="contact-form">
          <input type="text" placeholder="Enter Your Name" required />
          <input type="email" placeholder="Enter Your Email" required />
          <textarea placeholder="Your Message" rows={5} required defaultValue={""} />
          <button type="submit">Send</button>
        </form>
        <div className="contact-info">
          <div>
            <svg height={16} width={16} fill="currentColor" viewBox="0 0 576 512" aria-hidden="true"><path d="M288 0C128.94 0 0 128.94 0 288s128.94 288 288 288 288-128.94 288-288S447.06 0 288 0zM92.74 244.38v23.25c0 34 67.33 61.64 150.91 61.64s150.91-27.64 150.91-61.64v-23.25c0-34-67.33-61.64-150.91-61.64S92.74 210.38 92.74 244.38zm389.67 82.25v23.25c0 34-67.33 61.64-150.91 61.64s-150.91-27.64-150.91-61.64v-23.25c0-34 67.33-61.64 150.91-61.64s150.91 27.6 150.91 61.64z" /></svg>
            <p>karimnagar town, karimnagar, telangana<br />TW7 1AB, UK</p>
          </div>
          <div>
            <svg height={16} width={16} fill="currentColor" viewBox="0 0 512 512" aria-hidden="true"><path d="M511.7 387C462.9 418.8 413.5 448 359.9 448c-50 0-91.67-30.36-116.1-64.57-3.1-4.45-4.32-6-4.32-10.53 0-8.8 8-9.2 12.3-9.2h33.14C316 364.7 378.8 393.7 431.6 393.7c23.9 0 51.86-2.92 79.23-13.88 7.39-2.9 11-4.23 9.7-14-.89-7.9-5.76-22.48-24.6-40.6-38.18-38.7-92.9-93.4-130.3-131-23.6-23.6-51.95-35.5-81.5-35.5-31.53 0-61.35 13.6-78 36.5-30 42.8 14 102 88.4 190.5 29.68 35.8 72.9 80 72.9 87.6 0 7.27-17.93 27-17.93 27-19.47 0-53 3.9-81.8-37.2-54-73-77-107-77-144.3 0-52.6 42.2-107.3 92-107.3 23.9 0 52.4 8 82.6 25.8-22 27.2-42.6 51.5-60 71-22 25.1-41 45.8-60.3 60.2-5.9-4.8-8-12.3-5.7-18.8h-6.2c-8-.2-18-2-27.3-2-13.8-.1-27 .8-41 2v25c0 4.2 1.9 7.9 6 10 25.5 15.5 49.8 22.4 74 19.6s57.9-18 78-46c25.7-34 32-80.4 18-126.2z" /></svg>
            <p>+91 9874563210<br />+91 7896541230</p>
          </div>
          <div>
            <svg height={16} width={16} fill="currentColor" viewBox="0 0 512 512" aria-hidden="true"><path d="M502.3 190.8L327.4 365.7a16.06 16.06 0 01-22.6 0l-88.9-88.9a16.06 16.06 0 010-22.6L409.3 40.8c19.5-19.5 51.2-19.5 70.6 0l22.7 22.7c19.5 19.5 19.5 51.2 0 70.6zm-57.1 3.3L284.3 355.9 229.9 301.5 393.1 145l-26 49.1c-2.5 4.8-3.8 10.2-3.8 15.6 0 20.2 16.4 36.6 36.6 36.6 5.4 0 10.8-1.3 15.5-3.8z" /></svg>
            <p>support@domain.com<br />pickmyscrap@gmail.com</p>
          </div>
          <div className="social-icons">
            <a href="#" aria-label="Facebook" className="social-icon facebook">f</a>
            <a href="#" aria-label="Twitter" className="social-icon twitter">x</a>
            <a href="#" aria-label="Dribbble" className="social-icon dribbble">D</a>
          </div>
        </div>
      </div>
    </div>
  </section>




  
</div>
    );
}
export default Landingpage;