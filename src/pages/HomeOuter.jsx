import React, { Component } from "react";
import Header from "../components/Layouts/Header";
import Sidebar from "../components/Layouts/Sidebar";
import Footer from "../components/Layouts/Footer";
import Table from "../components/Table/ListTable"


class HomeOuter extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <Header />
        <Sidebar />
        <div className="page-wrapper">
          <Table />
          <Footer />
        </div>
      </div>
    );
  }
}

export default HomeOuter;


