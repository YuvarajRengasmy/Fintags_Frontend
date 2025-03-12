import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import Footer from "../components/Layouts/Footer";
import EmailChecke from "../components/EmailChecker/emailcheck";


class EmailChecker extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <EmailChecke />
          <Footer />
        </div>
      </div>
    );
  }
}

export default EmailChecker;


