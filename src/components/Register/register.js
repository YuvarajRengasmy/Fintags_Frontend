import React, { useState } from 'react';
import { isValidEmail, isValidPassword, isValidPhone } from '../../Utils/Validation';
import { toast } from 'react-toastify';
import { saveToken } from '../../Utils/storage';
import { isAuthenticated } from '../../Utils/Auth';
import { RegisterPage } from '../../api/company';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
const Register = () => {
    const initialState = {
        name: "",
        mobileNumber: "",
        email: "",
        password: "",
        confirmPassword: ""
    };
    const initialStateErrors = {
        name: { required: false },
        email: { required: false, valid: false },
        mobileNumber: { required: false, valid: false },
        password: { required: false, valid: false },
        confirmPassword: { required: false, valid: false }
    };
    const [inputs, setInputs] = useState(initialState);
    const [errors, setErrors] = useState(initialStateErrors);
    const [submitted, setSubmitted] = useState(false);
    const [type, setType] = useState('students');

    // Password visibility states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();

    const handleValidation = (data) => {
        let error = initialStateErrors;
        if (data.name === "") {
            error.name.required = true;
        }
        if (data.email === "") {
            error.email.required = true;
        }
        if (data.password === "") {
            error.password.required = true;
        }
        if (data.confirmPassword === "") {
            error.confirmPassword.required = true;
        }
        if (data.mobileNumber === "") {
            error.mobileNumber.required = true;
        }
        if (!isValidPassword(data.password)) {
            error.password.valid = true;
        }
        if (!isValidPassword(data.confirmPassword)) {
            error.confirmPassword.valid = true;
        }
        if (!isValidEmail(data.email)) {
            error.email.valid = true;
        }
        if (!isValidPhone(data.mobileNumber)) {
            error.mobileNumber.valid = true;
        }
        return error;
    };

    const handleInputs = (event) => {
        setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
        if (submitted) {
            const newError = handleValidation({ ...inputs, [event.target.name]: event.target.value });
            setErrors(newError);
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
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const newError = handleValidation(inputs);
        setErrors(newError);
        setSubmitted(true);
        if (handleErrors(newError)) {
            RegisterPage(inputs).then(res => {
                let token = res?.data?.result?.token;
                let studentId = res?.data?.result?.companyDetails?._id;
                let loginType = res?.data?.result?.loginType;
                let data = {
                    token: token, studentId: studentId, loginType: loginType
                };
                saveToken(data);
                if (isAuthenticated()) {
                    navigate("/fileUpload");
                }
                toast.success(res?.data?.message);
            }).catch((err) => {
                toast.error(err?.response?.data?.message);
            });


        }
    };



    // Toggle password visibility
    const handleTogglePassword = () => setShowPassword(!showPassword);
    const handleToggleConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

    return (
        <div>
            <div className="main-wrapper">
                <div className="container-fluid">
                    <div className="w-100 overflow-hidden position-relative flex-wrap d-block vh-100">
                        <div className="row">
                            <div className="col-lg-5">
                                <div className="login-background position-relative d-lg-flex align-items-center justify-content-center d-none flex-wrap vh-100">
                                    <div className="bg-overlay-img">
                                        <img src="assets/img/bg/bg-01.png" className="bg-1" alt="bg-1" />
                                        <img src="assets/img/bg/bg-02.png" className="bg-2" alt="bg-2" />
                                        <img src="assets/img/bg/bg-03.png" className="bg-3" alt="bg-3" />
                                    </div>
                                    <div className="authentication-card w-100">
                                        <div className="authen-overlay-item border w-100">
                                            <h1 className="text-white fs-40">
                                                Empowering people <br /> through seamless HR <br /> management.
                                            </h1>
                                            <div className="my-4 mx-auto authen-overlay-img">
                                                <img src="assets/img/bg/authentication-bg-01.png" alt="authentication" />
                                            </div>
                                            <p className="text-white fs-20 fw-semibold text-center">
                                                Efficiently manage your workforce, streamline <br /> operations effortlessly.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-7 col-md-12 col-sm-12">
                                <div className="row justify-content-center align-items-center vh-100 overflow-auto flex-wrap">
                                    <div className="col-md-7 mx-auto p-4">
                                        <form onSubmit={handleSubmit}>
                                            <div>
                                                <div className="mx-auto mb-5 text-center">
                                                    <img
                                                        src="https://www.fintags.co.uk/images/7-oth/logos/ft-logo-n.png"
                                                        className="img-fluid"
                                                        alt="Logo"
                                                    />
                                                </div>
                                                <div className="text-center mb-3">
                                                    <h2 className="mb-2">Sign Up</h2>
                                                    <p className="mb-0">Please enter your details to sign up</p>
                                                </div>

                                                <div className="mb-3">
                                                    <label className="form-label">Name<spen className="text-danger">*</spen></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="name"
                                                        placeholder="Enter your Name"
                                                        onChange={handleInputs}
                                                    />
                                                    {errors.name.required ? (
                                                        <div className="text-danger form-text">
                                                            This field is required.
                                                        </div>
                                                    ) : null}
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">MobileNumber<spen className="text-danger">*</spen></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="mobileNumber"
                                                        placeholder="Enter your Mobile Number"
                                                        onChange={handleInputs}
                                                    />
                                                    {errors.mobileNumber.required ?
                                                        <span className="text-danger form-text profile_error">
                                                            This field is required.
                                                        </span> : errors.mobileNumber.valid ?
                                                            <span className="text-danger form-text profile_error">
                                                                Enter valid mobile number.
                                                            </span> : null
                                                    }
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Email Address<spen className="text-danger">*</spen></label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        name="email"
                                                        placeholder="Enter your Email"
                                                        onChange={handleInputs}
                                                    />
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

                                                <div className="mb-3">
                                                    <label className="form-label">Password <spen className="text-danger">*</spen></label>
                                                    <div className="pass-group position-relative">
                                                        <input
                                                            type={showPassword ? 'text' : 'password'}
                                                            name="password"
                                                            onChange={handleInputs}
                                                            required
                                                            placeholder="Enter your password"
                                                            className="pass-input form-control"
                                                        />
                                                        <span
                                                            className="position-absolute end-0 top-50 translate-middle-y me-2"
                                                            onClick={handleTogglePassword}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </span>
                                                    </div>
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

                                                <div className="mb-3">
                                                    <label className="form-label">Confirm Password <spen className="text-danger">*</spen></label>
                                                    <div className="pass-group position-relative">
                                                        <input
                                                            type={showConfirmPassword ? 'text' : 'password'}
                                                            name="confirmPassword"
                                                            onChange={handleInputs}
                                                            required
                                                            placeholder="Confirm your password"
                                                            className="pass-input form-control"
                                                        />
                                                        <span
                                                            className="position-absolute end-0 top-50 translate-middle-y me-2"
                                                            onClick={handleToggleConfirmPassword}
                                                            style={{ cursor: "pointer" }}
                                                        >
                                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                                        </span>
                                                    </div>
                                                    {errors.confirmPassword.required ? (
                                                        <div className="text-danger form-text">
                                                            This field is required.
                                                        </div>
                                                    ) : errors.confirmPassword.valid ? (
                                                        <div className="text-danger form-text">
                                                            A minimum 8 characters password contains a <br />
                                                            combination of {''}
                                                            <strong>uppercase, lowercase, {''}</strong>
                                                            <strong>special <br /> character{''}</strong> and <strong>number</strong>.
                                                        </div>
                                                    ) : null}
                                                </div>


                                                <div className="mb-3">
                                                    <button type="submit" className="btn btn-primary w-100">
                                                        Sign Up
                                                    </button>
                                                </div>
                                                <div className="text-center">
                                                    <h6 className="fw-normal text-dark mb-0">
                                                        Already have an account?
                                                        <Link to="/login" className="hover-a"> Sign In </Link>
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
};

export default Register;  