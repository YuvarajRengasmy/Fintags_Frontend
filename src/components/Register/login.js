import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import * as XLSX from 'xlsx'; // Import the xlsx library for generating Excel files

function Login() {
  // Component state
  const state = {
    email: '',
    password: '',
    error: '',
    loading: false,
  };

  // Update state manually
  function setState(newState) {
    Object.assign(state, newState);
    render(); // Re-render to reflect the changes
  }

  // Handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setState({ [name]: value });
  }

  // Handle form submission
  async function handleSubmit(event) {
    event.preventDefault();
    setState({ loading: true, error: '' });

    const graphqlEndpoint = "http://192.168.133.120:9000/graphql";

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
      email: state.email,
      password: state.password,
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
        console.error(result.errors);
        setState({ error: result.errors[0].message || 'An unknown error occurred.' });
      } else if (result.data && result.data.login) {
        console.log("User Logged In:", result.data.login.user);
        alert('Login Successful!');
        localStorage.setItem('authToken', result.data.login.token);
        window.location.href = '/fileUpload';
      }
    } catch (err) {
      console.error('Error:', err);
      setState({ error: 'Something went wrong. Please try again.' });
    } finally {
      setState({ loading: false });
    }
  }

  // Render function
  function render() {
    return (
      <div>
        <div className="main-wrapper">
          <div className="container-fluid">
            <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
              <div className="row">
                <div className="col-lg-5">
                  <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                    <div className="bg-overlay-img">
                      <img src="assets/img/bg/bg-01.png" className="bg-1" alt="" />
                      <img src="assets/img/bg/bg-02.png" className="bg-2" alt="" />
                      <img src="assets/img/bg/bg-03.png" className="bg-3" alt="" />
                    </div>
                    <div className="authentication-card w-100">
                      <div className="authen-overlay-item border w-100">
                        <h1 className="text-white fs-40">Empowering people through seamless CRM management.</h1>
                        <div className="my-4 mx-auto authen-overlay-img">
                          <img src="assets/img/bg/authentication-bg-01.png" alt="" />
                        </div>
                        <p className="text-white fs-20 fw-semibold text-center">
                          Efficiently manage your workforce, streamline operations effortlessly.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap ">
                    <div className="col-md-7 mx-auto p-4">
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="mx-auto mb-5 text-center">
                            <img src="https://www.fintags.co.uk/images/7-oth/logos/ft-logo-n.png" className="img-fluid" alt="Logo" />
                          </div>
                          <div className="text-center mb-3">
                            <h2 className="mb-2">Sign In</h2>
                            <p className="mb-0">Please enter your details to sign in</p>
                          </div>
                          <div className="mb-3">
                            <label className="form-label">Email Address</label>
                            <div className="input-group">
                              <input
                                type="text"
                                name="email"
                                value={state.email}
                                onChange={handleChange}
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
                                name="password"
                                value={state.password}
                                onChange={handleChange}
                                required
                                placeholder="Enter your password"
                                className="pass-input form-control"
                              />
                              <span className="ti toggle-password ti-eye-off" />
                            </div>
                          </div>
                          <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="form-check form-check-md mb-0">
                              <input className="form-check-input" id="remember_me" type="checkbox" />
                              <label htmlFor="remember_me" className="form-check-label mt-0">Remember Me</label>
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
                      </form>
                      {state.error && <p className="error-message">{state.error}</p>}
                      {state.loading && <p>Loading...</p>}
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

  return render();
}

export default Login;
