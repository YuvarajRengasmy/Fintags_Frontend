import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
    };
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      this.setState({ error: "Passwords do not match" });
      return;
    }

    try {
      const response = await axios.post('http://192.168.133.120:9000/graphql', {
        query: `mutation {
          addUser(name: "${name}", email: "${email}", password: "${password}") {
            token
            user {
              _id
              name
              email
            }
          }
        }`
      });

      const { data } = response;

      if (data.errors) {
        this.setState({ error: "Failed to create user" });
      } else {
        // Assuming token is returned after successful registration
        localStorage.setItem('token', data.data.addUser.token);
        // Use useNavigate to programmatically navigate to the file upload page
        this.props.history.push('/fileUpload');  // This uses history for redirection
      }
    } catch (error) {
      console.error("Error creating user:", error);
      this.setState({ error: "An error occurred while creating the account" });
    }
  };

  render() {
    const { name, email, password, confirmPassword, error } = this.state;

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
                        <h1 className="text-white fs-40">
                          Empowering people <br /> through seamless HR <br /> management.
                        </h1>
                        <div className="my-4 mx-auto authen-overlay-img">
                          <img src="assets/img/bg/authentication-bg-01.png" alt />
                        </div>
                        <div>
                          <p className="text-white fs-20 fw-semibold text-center">
                            Efficiently manage your workforce, streamline <br /> operations effortlessly.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-7 col-md-12 col-sm-12">
                  <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                    <div className="col-md-7 mx-auto p-4">
                      <form onSubmit={this.handleSubmit}>
                        <div>
                          <div className="mx-auto mb-5 text-center">
                            <img
                              src="https://www.fintags.co.uk/images/7-oth/logos/ft-logo-n.png"
                              className="img-fluid"
                              alt="Logo"
                            />
                          </div>
                          <div>
                            <div className="text-center mb-3">
                              <h2 className="mb-2">Sign Up</h2>
                              <p className="mb-0">Please enter your details to sign up</p>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Name</label>
                              <div className="input-group">
                                <input
                                  type="text"
                                  className="form-control border-end-0"
                                  name="name"
                                  value={name}
                                  onChange={this.handleChange}
                                />
                                <span className="input-group-text border-start-0">
                                  <i className="ti ti-user" />
                                </span>
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Email Address</label>
                              <div className="input-group">
                                <input
                                  type="email"
                                  className="form-control border-end-0"
                                  name="email"
                                  value={email}
                                  onChange={this.handleChange}
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
                                  className="pass-input form-control"
                                  name="password"
                                  value={password}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            <div className="mb-3">
                              <label className="form-label">Confirm Password</label>
                              <div className="pass-group">
                                <input
                                  type="password"
                                  className="pass-inputs form-control"
                                  name="confirmPassword"
                                  value={confirmPassword}
                                  onChange={this.handleChange}
                                />
                              </div>
                            </div>
                            {error && <div className="text-danger">{error}</div>}
                            <div className="d-flex align-items-center justify-content-between mb-3">
                              <div className="d-flex align-items-center">
                                <div className="form-check form-check-md mb-0">
                                  <input className="form-check-input" id="remember_me" type="checkbox" />
                                  <label htmlFor="remember_me" className="form-check-label text-dark mt-0">
                                    Agree to <span className="text-primary">Terms &amp; Privacy</span>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="mb-3">
                              <button type="submit" className="btn btn-primary w-100">
                                Sign Up
                              </button>
                            </div>
                            <div className="text-center">
                              <h6 className="fw-normal text-dark mb-0">
                                Already have an account?
                                <Link to="/login" className="hover-a">
                                  Sign In
                                </Link>
                              </h6>
                            </div>
                          </div>
                        </div>
                      </form>
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
}

export default Register;
