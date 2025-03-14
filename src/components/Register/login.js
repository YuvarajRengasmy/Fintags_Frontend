import React, { useState, useEffect } from "react";
import { useNavigate, Navigate } from 'react-router-dom';
import { isValidEmail, isValidPassword } from '../../Utils/Validation';
import { saveToken, getLoginType } from '../../Utils/storage';

import axios from 'axios';
import { isAuthenticated } from '../../Utils/Auth';
import { toast } from 'react-toastify';
import { loginUser } from '../../api/login';
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: { required: false, valid: false }, password: { required: false, valid: false } });
  const [submitted, setSubmitted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [user, setUser] = useState([]);
  // State for password visibility
  const navigate = useNavigate();

  const handleValidation = (data) => {
    let newErrors = {
      email: {
        required: data.email === "",
        valid: !isValidEmail(data.email)
      },
      password: {
        required: data.password === "",
        valid: !isValidPassword(data.password)
      }
    };
    return newErrors;
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });
    if (submitted) {
      const newErrors = handleValidation({ ...inputs, [name]: value });
      setErrors(newErrors);
    }
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      loginUser(inputs).then(res => {
        let token = res?.data?.result?.token;
        let companyId = res?.data?.result?.companyDetails?._id;
        let loginType = res?.data?.result?.loginType;
       
         
          let data = {
            token: token, companyId: companyId, loginType: loginType
          };
          saveToken(data);
          if (isAuthenticated()) {
            navigate("/fileUpload");
           
          }
        
        toast.success(res?.data?.message);
      })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  }

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
                              onChange={handleInputs}
                              required
                              placeholder="Enter your email"
                              className="form-control border-end-0"
                            />
                            <span className="input-group-text border-start-0">
                              <i className="ti ti-mail" />
                            </span>
                            {errors.email.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : errors.email.valid ? (
                              <div className="text-danger form-text">
                                Enter valid Email Id.
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <div className="mb-3">
                          <label className="form-label">Password</label>
                          <div className="pass-group">
                            <input
                              type="password"
                              name="password"
                              onChange={handleInputs}
                              required
                              placeholder="Enter your password"
                              className="pass-input form-control"
                            />
                            <span className="ti toggle-password ti-eye-off" />
                            {errors.password.required ? (
                              <div className="text-danger form-text">
                                This field is required.
                              </div>
                            ) : errors.password.valid ? (
                              <div className="text-danger form-text">
                                A minimum 8 characters password contains a <br />
                                combination of {''}
                                <strong>uppercase, lowercase, {''}</strong>
                                <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                              </div>
                            ) : null}
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
