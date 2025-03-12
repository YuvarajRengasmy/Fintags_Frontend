import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import Footer from "../components/Layouts/Footer";
import DomainSearch from "../components/DomainSearch/DoaminSearch"


class Domain extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <DomainSearch />
          <Footer />
        </div>
      </div>
    );
  }
}

export default Domain;


