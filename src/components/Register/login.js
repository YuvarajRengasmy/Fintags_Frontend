import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import the xlsx library for generating Excel files

const Login = () => {
  // State hooks for the login form and API call
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const graphqlEndpoint = "http://192.168.133.120:9000/graphql"; // Replace with your actual GraphQL endpoint

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const mutation = `
      mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token
          user {
            name
            email
          }
        }
      }
    `;

    const variables = {
      email,
      password,
    };

    try {
      const response = await fetch(graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: mutation,
          variables,
        }),
      });

      const result = await response.json();
      if (result.errors) {
        // Log error if GraphQL returns any errors
        console.error(result.errors);
        setError(result.errors[0].message || 'An unknown error occurred.');
      } else if (result.data && result.data.login) {
        // Successful login
        console.log("User Logged In:", result.data.login.user);
        alert('Login Successful!');
        localStorage.setItem('authToken', result.data.login.token); // Save token in localStorage
        window.location.href = '/fileUpload'; // Redirect to a protected route
      }
    } catch (err) {
      // Log any fetch-related or network-related error
      console.error('Error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="main-wrapper">
        <div className="container-fluid">
          <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
            <div className="row">
              <div className="col-lg-5">
                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                  <div className="bg-overlay-img">
                    <img src="assets/img/bg/bg-01.png" className="bg-1" alt />
                    <img src="assets/img/bg/bg-02.png" className="bg-2" alt />
                    <img src="assets/img/bg/bg-03.png" className="bg-3" alt />
                  </div>
                  <div className="authentication-card w-100">
                    <div className="authen-overlay-item border w-100">
                      <h1 className="text-white fs-40">Empowering people <br /> through seamless CRM <br /> management.</h1>
                      <div className="my-4 mx-auto authen-overlay-img">
                        <img src="assets/img/bg/authentication-bg-01.png" alt />
                      </div>
                      <div>
                        <p className="text-white fs-20 fw-semibold text-center">Efficiently manage your workforce, streamline <br /> operations effortlessly.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-7 col-md-12 col-sm-12">
                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                  <div className="col-md-7 mx-auto p-4">
                    <form onSubmit={handleSubmit}>
                      <div>
                        <div className=" mx-auto mb-5 text-center">
                          <img src="https://www.fintags.co.uk/images/7-oth/logos/ft-logo-n.png" className="img-fluid" alt="Logo" />
                        </div>
                        <div className="">
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Sign In</h2>
                            <p className="mb-0">Please enter your details to sign in</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input 
                                type="text" 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                                placeholder="Enter your email" 
                                className="form-control border-end-0" 
                              />
                              <span className="input-group-text border-start-0">
                                <i className="ti ti-mail" />
                              </span>
                            </div>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Password</label>
                            <div className="pass-group">
                              <input 
                                type="password" 
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                                placeholder="Enter your password"  
                                className="pass-input form-control" 
                              />
                              <span className="ti toggle-password ti-eye-off" />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="d-flex align-items-center">
                              <div className="form-check form-check-md mb-0">
                                <input className="form-check-input" id="remember_me" type="checkbox" />
                                <label htmlFor="remember_me" className="form-check-label mt-0">Remember Me</label>
                              </div>
                            </div>
                            <div className="text-end">
                              <a href="#" className="link-danger">Forgot Password?</a>
                            </div>
                          </div>
                          <div className="mb-3">
                            <button type="submit" className="btn btn-primary w-100">Sign In</button>
                          </div>
                          <div className="text-center">
                            <h6 className="fw-normal text-dark mb-0">Don’t have an account? 
                              <a href="/Register" className="hover-a"> Create Account</a>
                            </h6>
                          </div>
                        </div>
                      </div>
                    </form>
                    {error && <p className="error-message">{error}</p>}
                    {loading && <p>Loading...</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
