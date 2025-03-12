import React, { Component } from "react";
import axios from "axios";
import CreateTable from "../Table/AddTable";
import { Link } from "react-router-dom";

const GET_COMPANIES = `
  query GetExcelReg {
    getExcelWebsite {
      company_name
      registrationNumber
      website
      region
      contact_name
      email
      phone
      status
    }
  }
`;

class DataEnrichment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: null,
      error: null,
      selectAll: false,
      selectedRows: [], // To track selected row indexes 
      sortBy: "sNo",
      sortOrder: "asc",
      statusFilter: "",
      loading: false,
      showSecondButton: false,
    };
  }

  // ComponentDidMount function to fetch the Excel data  
  componentDidMount() {
    this.fetchReges();
  }

  fetchReges = async () => {
    try {
      // Make a POST request to your GraphQL endpoint
      const response = await fetch('http://192.168.133.120:9000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: GET_COMPANIES }),  // Sending the query
      });
      const result = await response.json();  // Parse the JSON response
      if (result.data) {
        this.setState({ excelData: result.data.getExcelWebsite, dataLoaded: true });  // Set the state with the fetched companies
      } else {
        this.setState({ error: 'No data found' });
      }
    } catch (err) {
      this.setState({ error: 'Error fetching reges' });
      console.error('Error fetching reges:', err);
    }
  };

  // Handle select all rows
  handleSelectAll = () => {
    const { selectAll, excelData } = this.state;
    const newSelectAll = !selectAll;
    const newSelectedRows = newSelectAll ? excelData.map((_, index) => index) : [];
    this.setState({ loading: true });

    setTimeout(() => {
      this.setState({
        loading: false,
        showSecondButton: true, // Show the second button after the first action is completed
      });
    }, 2000);

    if (newSelectAll) {
      excelData.forEach((item) => {
        if (!this.state.registrationNumbers[item.company_name]) {
          this.getCompanyRegistrationNumber(item.company_name);
        }
        // Fetch company website if not already fetched
        if (!this.state.websites[item.company_name]) {
          this.getCompanyWebsite(item.company_name, item.region);
        }
      });
    }

    this.setState({
      selectAll: newSelectAll,
      selectedRows: newSelectedRows,
    });
  };

  handleSelectRow = (index) => {
    const { selectedRows } = this.state;
    const updatedSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((row) => row !== index)
      : [...selectedRows, index];

    this.setState({
      selectedRows: updatedSelectedRows,
      selectAll: updatedSelectedRows.length === this.state.excelData.length,
    });
  };

  handleSort = (column) => {
    const { excelData, sortOrder } = this.state;
    const sortedData = [...excelData];
    sortedData.sort((a, b) => {
      if (a[column] < b[column]) return sortOrder === "asc" ? -1 : 1;
      if (a[column] > b[column]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    this.setState({
      excelData: sortedData,
      sortBy: column,
      sortOrder: sortOrder === "asc" ? "desc" : "asc",
    });
  };

  handleStatusFilter = (status) => {
    this.setState({
      statusFilter: status,
    });
  };

  render() {
    const { dataLoaded, excelData, selectAll, selectedRows, statusFilter, sortBy, sortOrder, loading, showSecondButton } = this.state;

    // Filter out rows where both `contact_name` and `phone` are empty or missing
    const filteredData = dataLoaded && excelData
      ? excelData.filter((item) =>
          (!item.contact_name || item.contact_name.trim() === "") && 
          (!item.phone || item.phone.trim() === "")
        )
      : [];

    const sortedData = filteredData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return (
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Utilities</h2>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">Utilities</li>
                <li className="breadcrumb-item">Data_Enrichment</li>
              </ol>
            </nav>
          </div>
          <div className="mb-2 d-flex align-items-center">
            <button onClick={this.exportCsv} className="btn btn-primary me-3 mb-2">
              Export to CSV
            </button>
            <CreateTable />
          </div>
        </div>
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <button className="me-3 btn btn-white">Data Enrichment</button>
            </div>
            <div className="d-flex my-xl-auto right-content align-companys-center flex-wrap row-gap-3">
              <div className="dropdown me-3">
                <a
                  href="#"
                  className="dropdown-toggle btn btn-white d-inline-flex align-companys-center"
                  data-bs-toggle="dropdown"
                >
                  Select Status
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <a
                      href="#"
                      className="dropdown-company rounded-1"
                      onClick={() => this.handleStatusFilter("Active")}
                    >
                      Active
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-company rounded-1"
                      onClick={() => this.handleStatusFilter("Inactive")}
                    >
                      Inactive
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="custom-datatable-filter table-responsive">
              <table className="table datatable">
                <thead className="thead-light">
                  <tr>
                    <th className="no-sort">
                      <div className="form-check form-check-md">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                          checked={selectAll}
                          onChange={this.handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>
                      S.NO
                      <Link onClick={() => this.handleSort('sNo')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      LEI
                      <Link onClick={() => this.handleSort('lei_number')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Reg.NO
                      <Link onClick={() => this.handleSort('reg_no')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      BizCategory
                      <Link onClick={() => this.handleSort('business_category')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      SubCategory
                      <Link onClick={() => this.handleSort('sub_category')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      CompanyName
                      <Link onClick={() => this.handleSort('company_name')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      ContactName
                      <Link onClick={() => this.handleSort('contact_name')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Website
                      <Link onClick={() => this.handleSort('website')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Designation
                      <Link onClick={() => this.handleSort('designation')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Email
                      <Link onClick={() => this.handleSort('email')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Phone
                      <Link onClick={() => this.handleSort('phone')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>
                      Status
                      <Link onClick={() => this.handleSort('status')}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                      </Link>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>
                            <div className="form-check form-check-md">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                checked={selectedRows.includes(index)}
                                onChange={() => this.handleSelectRow(index)}
                              />
                            </div>
                          </td>
                          <td>{item.sNo}</td>
                          <td>{item.lei_number}</td>
                          <td>{item.registrationNumber}</td>
                          <td>{item.business_category}</td>
                          <td>{item.sub_category}</td>
                          <td>{item.company_name}</td>
                          <td>{item.contact_name || "-"}</td>
                          <td>{item.website}</td>
                          <td>{item.designation}</td>
                          <td>{item.email}</td>
                          <td>{item.phone || "-"}</td>
                          <td>{item.status}</td>
                          <td>
                            <div className="action-icon d-inline-flex">
                              <a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal">
                                <i className="ti ti-trash" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="11" className="text-center">
                        No data available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DataEnrichment;
