import React, { useState } from "react";
import { useEffect } from "react";
import "../css/login.css";
import { useNavigate } from "react-router-dom";


function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [signinData, setsigninData] = useState({ email: "", password: "", role: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", role: "" });
  const [themeClass, setThemeClass] = useState("");

  const navigate = useNavigate();


  useEffect(() => {
    const role = isSignUp ? signupData.role : signinData.role;
    if (role === "buyer") setThemeClass("buyer-theme");
    else if (role === "seller") setThemeClass("seller-theme");
    else setThemeClass("");
  }, [signinData.role, signupData.role, isSignUp]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signinData),
      });

      const data = await res.json();
      console.log("this is the data " + JSON.stringify(data));
      // Debugging line to check the response
      if (res.ok) {
        console.log(res)
        // localStorage.setItem("userId", res.data.user.id); // ✅ Store user ID
        // Check if role is returned in the response
        if (data.user && data.user.role === "seller") {
          localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Only store user
          navigate("/seller");
        } else if (data.user && data.user.role === "buyer") {
          localStorage.setItem("user", JSON.stringify(data.user)); // ✅ Only store user
          navigate("/buyer");
        }
         else {
          alert("Unknown role or missing role in the response");
        }
      } else {
        alert(data.message || "Login failed");
      }
    } catch (err) {
      alert("Server error");
      console.error(err);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Please log in.");
        setIsSignUp(false);
        setSignupData({ name: "", email: "", password: "", role: "" });
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (err) {
      alert("Server error");
      console.log(err);
    }
  };

  return (
    <div className={`scrap-login-wrapper ${isSignUp ? "scrap-login-right-panel-active" : ""} ${themeClass}`}>
      
      <div className="scrap-login-container">
        
        {/* Sign Up Form */}
        <div className="scrap-login-form-container scrap-login-sign-up-container">
          <form onSubmit={handleSignup}>
            <h1>Create Account</h1>
          
            <input type="text" placeholder="Name" value={signupData.name}
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })} required />
              
              
               
              <input type="email" placeholder="Email" value={signupData.email}
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} required />

              
              
                 
            <input type="password" placeholder="Password" value={signupData.password}
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} required />
              
            <input type="text" placeholder="Phone Number" value={signupData.phone}
              onChange={(e) => setSignupData({ ...signupData, phone: e.target.value })} required />

            <input type="text" placeholder="Address" value={signupData.address}
              onChange={(e) => setSignupData({ ...signupData, address: e.target.value })} required />
  
               
            <select value={signupData.role} onChange={(e) => setSignupData({ ...signupData, role: e.target.value })}
              required name="role">
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            
            <button type="submit">SIGN UP</button>
          </form>
        </div>

        {/* Sign In Form */}
        <div className="scrap-login-form-container scrap-login-sign-in-container">
          <form onSubmit={handleLogin}>
            <h1>Sign In</h1>
            <span> use your email & password</span>
             
            
            <input type="email" placeholder="Email" value={signinData.email}
              onChange={(e) => setsigninData({ ...signinData, email: e.target.value })} required />
              
             
             
            <input type="password" placeholder="Password" value={signinData.password}
              onChange={(e) => setsigninData({ ...signinData, password: e.target.value })} required />
              
              
              
            <select value={signinData.role} onChange={(e) => setsigninData({ ...signinData, role: e.target.value })}
              required name="role">
              <option value="">Select Role</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            
         {/*    <a href="#">Forget Your Password?</a>    */}
            <button type="submit">SIGN IN</button>
          </form>
        </div>

        {/* Overlay */}
        <div className="scrap-login-overlay-container">
          <div className="scrap-login-overlay">
            <div className="scrap-login-overlay-panel scrap-login-overlay-left">
              <h1>Welcome Back!</h1>
              <p>Enter your personal details to use all of site features</p>
              <button className="scrap-login-ghost" onClick={() => setIsSignUp(false)}>SIGN IN</button>
            </div>
            <div className="scrap-login-overlay-panel scrap-login-overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Register with your personal details to use all of site features</p>
              <button className="scrap-login-ghost" onClick={() => setIsSignUp(true)}>SIGN UP</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login;
