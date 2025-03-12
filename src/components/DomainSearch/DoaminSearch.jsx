import React, { Component } from "react";
import axios from "axios";
import CreateTable from "../Table/AddTable";
import { Link } from "react-router-dom";
import { fetchGraphQLData } from "../../Utils/graphqlHelper"; // Importing the helper function

// GraphQL query to fetch all companies
const GET_COMPANIES = `
  query GetExcelReg {
    getExcelReg {
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

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: [],
      error: null,
      selectAll: false,
      selectedRows: [], // To track selected row indexes
      websites: {}, // Store websites by company name
      loading: false,
      sortBy: "sNo",
      sortOrder: "asc",
      statusFilter: "",
      loading: false,
      showSecondButton: false,
    };
  }

  // api_key = 'AIzaSyCkpi-cus69KbEKC-glI6WM4DNSXHFY99k';
   api_key = "AIzaSyCVXwuprAMl_DnEvHwnRvkbsNaqhlBDcSs"
  cse_id = 'a7c047cfed9c84666';

  componentDidMount() {
    this.fetchReges();
  }

  fetchReges = async () => {
    try {
      const result = await fetchGraphQLData(GET_COMPANIES); // Using fetchGraphQLData
      if (result.data) {
        this.setState({ excelData: result.data.getExcelReg, dataLoaded: true });
      } else {
        this.setState({ error: 'No data found' });
      }
    } catch (err) {
      this.setState({ error: 'Error fetching reges' });
      console.error('Error fetching reges:', err);
    }
  };

  getCompanyWebsite = async (companyName, region) => {
    const query = `${companyName} ${region}`;
    const url = "https://www.googleapis.com/customsearch/v1";
    const params = {
      key: this.api_key,
      cx: this.cse_id,
      q: query,
    };
    try {
      const response = await axios.get(url, { params });
      const firstResult = response.data.companys && response.data.companys[0];
      const website = firstResult ? firstResult.link : "Website Not Found";
      this.setState((prevState) => ({
        websites: {
          ...prevState.websites,
          [companyName]: website,
        },
      }));
    } catch (error) {
      console.error("Error fetching website:", error);
    }
  };

  handleSort = (column) => {
    const { sortBy, sortOrder } = this.state;
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    this.setState({ sortBy: column, sortOrder: newSortOrder });
  };

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
      excelData.forEach((company) => {
        if (!this.state.websites[company.company_name]) {
          this.getCompanyWebsite(company.company_name, company.region);
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

  saveSelectedWebsite = async () => {
    const { selectedRows, excelData } = this.state;
    const selectedReges = selectedRows.map((index) => {
      const company = excelData[index];
      return {
        sNo:company.sNo,
        company_name: company.company_name,
        registrationNumber: company.registrationNumber,
        website: this.state.websites[company.company_name],
        region: company.region,
        business_category: company.business_category,
        sub_category: company.sub_category,
        contact_name: company.contact_name,
        designation: company.designation,
        email: company.email,
        phone: company.phone,
        filling_month: company.filling_month,
        file_count: company.file_count,
        status: company.status,
      };
    });
    try {
      const response = await axios.post("http://192.168.133.120:9000/graphql", {
        query: `
          mutation($websites: [WebsiteInput]) {
            saveWebsites(websites: $websites) {
              company_name
              registrationNumber
              website
              business_category
              sub_category
              contact_name
              designation
              email
              phone
              website
              filling_month
              file_count
              status
              region
            }
          }
        `,
        variables: {
          websites: selectedReges,
        },
      });
      console.log("Websites saved:", response.data.data.savewebites);
      alert("Selected companies saved successfully!");
    } catch (error) {
      console.error("Error saving selected companies:", error);
    }
  };

  getRowColor = (status) => {
    if (status === 'client') {
      return '#008631'; // Active status color (green)
    } else if (status === 'DND') {
      return '#FF0000'; // Inactive status color (red)
    }
    return '#32302f'; // Default color (no specific status)
  };

  render() {
    const { excelData, error, selectAll, selectedRows, websites, statusFilter, sortBy, sortOrder, loading, showSecondButton } = this.state;
    const filteredData = excelData.filter((company) =>
      statusFilter ? company.status === statusFilter : true
    );

    const sortedData = filteredData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    return (
      <div className="content">
        <div className="d-md-flex d-block align-companys-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2">
            <h2 className="mb-1">Utilities</h2>
            <nav>
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-company">Utilities</li>
                <li className="breadcrumb-company">Domain_Gen</li>
              </ol>
            </nav>
          </div>
          <div className="mb-2 d-flex align-companys-center">
            <button onClick={this.exportCsv} className="btn btn-primary me-3 mb-2">
              Export to CSV
            </button>
            <CreateTable />
          </div>
        </div>
        <div className="card">
          <div className="card-header d-flex align-companys-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex my-xl-auto right-content align-companys-start flex-wrap row-gap-3">
              <button className="me-3 btn btn-white">Domain Check</button>
              {!this.state.showSecondButton && (
                <button
                  onClick={this.handleSelectAll}
                  className="btn btn-white d-flex align-companys-center me-3"
                  style={{ borderColor: "LightGray" }}
                >
                  Get Website
                </button>
              )}
              {this.state.showSecondButton && (
                <button onClick={this.saveSelectedWebsite} className="btn btn-secondary">
                  <Link to="/EmailChecker" className="text-white">Email_Checker</Link>
                </button>
              )}
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
            <div className="table-responsive">
              <div className="table">
              <table >
                <thead className=" table thead-light">
                  <tr>
                    <th className="no-sort">
                    
                    </th>
                    <th> S.NO
                      <Link onClick={() => this.handleSort('sNo')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray" }}></i>
                      </Link>
                    </th>
                    <th>LEI
                      <Link onClick={() => this.handleSort('lei_number')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Reg.NO
                      <Link onClick={() => this.handleSort('reg_no')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>BizCategory
                      <Link onClick={() => this.handleSort('business_category')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>SubCategory
                      <Link onClick={() => this.handleSort('sub_category')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>CompanyName
                      <Link onClick={() => this.handleSort('company_name')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>ContactName
                      <Link onClick={() => this.handleSort('contact_name')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Website
                      <Link onClick={() => this.handleSort('website')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Designation
                      <Link onClick={() => this.handleSort('designation')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Email
                      <Link onClick={() => this.handleSort('email')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Phone
                      <Link onClick={() => this.handleSort('phone')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Status
                      <Link onClick={() => this.handleSort('status')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((company, index) => {
                      const website = websites[company.company_name] || "-";
                      return (
                        <tr key={index} style={{ color: this.getRowColor(company.status) }}>
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
                       
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.sno}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.lei_number}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}} >{company.registrationNumber}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.business_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.sub_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.company_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.contact_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{website}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.designation}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.email}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.phone}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{company.status}</th>
                      
                          
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
                      <td colSpan="12" className="text-center">
                        No companies found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Table;
