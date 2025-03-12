import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import Footer from "../components/Layouts/Footer";
import RegisterNumnber from "../components/RegisterNumber/registerNumber";


class Register extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <RegisterNumnber />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Register;


