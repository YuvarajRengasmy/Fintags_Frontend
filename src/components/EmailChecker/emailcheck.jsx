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

const BASE_URL = 'https://api.zerobounce.net/v2';
const ZEROBOUNCE_API_KEY = 'b4f79d27e05a404d965190c5333c0c05';

class EmailChecker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: null,
      error: null,
      selectAll: false,
      selectedRows: [],
      validEmails: {},
      loading: false,
      sortBy: "sNo",
      sortOrder: "asc",
      statusFilter: "",
      showSecondButton: false,
    };
  }

  componentDidMount() {
    this.fetchReges();
  }

  fetchReges = async () => {
    try {
      const response = await fetch('http://192.168.133.120:9000/graphql', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: GET_COMPANIES }),
      });
      const result = await response.json();
      if (result.data) {
        this.setState({ excelData: result.data.getExcelWebsite, dataLoaded: true });
      } else {
        this.setState({ error: 'No data found' });
      }
    } catch (err) {
      this.setState({ error: 'Error fetching data' });
      console.error('Error fetching data:', err);
    }
  };

  // Modify generateEmails function to include Gmail email generation
  generateEmails = (company) => {
    const domain = this.extractDomain(company.website);
    const { contact_name } = company;
    if (!contact_name) {
      return []; // Return empty array if contact_name is missing
    }
    const [firstName, lastName] = this.splitName(contact_name);
    return [
      `${firstName}.${lastName}@${domain}`,  // firstname.lastname@domain
      `${firstName}@${domain}`,             // firstname@domain
      `${lastName}@${domain}`,              // lastname@domain
      `${firstName}.${lastName}@gmail.com`,  // firstname.lastname@gmail.com
      `${firstName}@gmail.com`,             // firstname@gmail.com
      `${lastName}@gmail.com`,              // lastname@gmail.com
    ];
  };

  splitName = (contactName) => {
    const nameParts = contactName.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : firstName;
    return [firstName, lastName];
  };

  extractDomain = (website) => {
    const parsedUrl = new URL(website);
    let domain = parsedUrl.hostname;
    if (domain.startsWith("www.")) {
      domain = domain.slice(4); // Remove 'www.' if it exists
    }
    return domain;
  };

  validateEmail = async (email) => {
    const url = `${BASE_URL}/validate?api_key=${ZEROBOUNCE_API_KEY}&email=${email}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      if (data && data.status === 'valid') {
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error validating email:', error);
      return false; // Consider the email invalid in case of an error
    }
  };

  handleSelectRow = (index) => {
    const { selectedRows } = this.state;
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((rowIndex) => rowIndex !== index)
      : [...selectedRows, index];

    this.setState({ selectedRows: newSelectedRows }, () => {
      if (newSelectedRows.includes(index)) {
        this.validateEmailsForRow(index);
      }
    });
  };

  validateEmailsForRow = async (index) => {
    const company = this.state.excelData[index];
    const emails = this.generateEmails(company);
    const validEmails = await this.getValidEmails(emails);
    this.setState((prevState) => ({
      validEmails: {
        ...prevState.validEmails,
        [company.company_name]: validEmails,
      },
    }));
  };

  getValidEmails = async (emails) => {
    const validEmails = [];
    for (const email of emails) {
      const isValid = await this.validateEmail(email);
      if (isValid) validEmails.push(email);
    }
    return validEmails;
  };

  handleSelectAll = () => {
    const { selectAll, excelData } = this.state;
    const newSelectAll = !selectAll;
    const newSelectedRows = newSelectAll ? excelData.map((_, index) => index) : [];
    this.setState({
      selectAll: newSelectAll,
      selectedRows: newSelectedRows,
      loading: true 
    });
    setTimeout(() => {
      this.setState({
        loading: false,
        showSecondButton: true, // Show the second button after the first action is completed
      });
    }, 2000);

    if (newSelectAll) {
      excelData.forEach(async (company, index) => {
        const emails = this.generateEmails(company);
        const validEmails = await this.getValidEmails(emails);
        this.setState((prevState) => ({
          validEmails: {
            ...prevState.validEmails,
            [company.company_name]: validEmails,
          },
        }));
      });
    }
  };

  saveSelectedWebsite = async () => {
    const { selectedRows, excelData, validEmails } = this.state;
    const selectedReges = selectedRows.map((index) => {
      const company = excelData[index];
      const validEmailList = validEmails[company.company_name] || [];
      const emailToSave = validEmailList.length > 0 ? validEmailList[0] : company.email; // Use valid email or fallback to main email
      return {
        company_name: company.company_name,
        registrationNumber: company.registrationNumber,
        website: company.website,
        region: company.region,
        contact_name: company.contact_name,
        email: emailToSave,
        phone: company.phone,
        status: company.status,
      };
    });

    try {
      const response = await axios.post("http://192.168.133.120:9000/graphql", {
        query: `
          mutation($emailes: [EmailInput]) {
            saveEmailes(emailes: $emailes) {
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
        `,
        variables: { emailes: selectedReges },
      });

      console.log("Emailes saved:", response.data.data.saveEmailes);
      alert("Selected companies saved successfully!");
    } catch (error) {
      console.error("Error saving selected companies:", error);
    }
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

  getRowColor = (status) => {
    if (status === 'client') {
      return '#008631'; // Active status color (green)
    } else if (status === 'DND') {
      return '#FF0000'; // Inactive status color (red)
    }
    return '#32302f'; // Default color (no specific status)
  };
  render() {
    const { dataLoaded, excelData, selectAll, selectedRows, validEmails, statusFilter, sortBy, sortOrder, loading, showSecondButton } = this.state;
    const filteredData = dataLoaded
      ? excelData.filter((item) => (this.state.statusFilter ? item.status === this.state.statusFilter : true))
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
                <li className="breadcrumb-item">Email Checker</li>
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
            <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
              <button className="me-3 btn btn-white">Email Checker</button>
              {!this.state.showSecondButton && (
                <button
                  onClick={this.handleSelectAll}
                  className="btn btn-primary d-flex align-items-center me-3"
                >
                  Get Email
                </button>
              )}
              {this.state.showSecondButton && (
                <button onClick={this.saveSelectedWebsite} className="btn btn-secondary me-3">
                  <Link to="/DataBase" className="text-white">Data Base</Link>
                </button>
              )}
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <div className="dropdown me-3">
                <a
                  href="#"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  Select Status
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <a
                      href="#"
                      className="dropdown-item rounded-1"
                      onClick={() => this.handleStatusFilter("Active")}
                    >
                      Active
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="dropdown-item rounded-1"
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
                                    <th> S.NO
                                      <Link onClick={() => this.handleSort('sNo')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'sNo' ? (sortOrder === 'asc' ) : ''}
                                      </Link>
                                    </th>
                                    <th>LEI
                                      <Link onClick={() => this.handleSort('lei_number')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'lei_number' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
                                      </Link>
                                    </th>
                                    <th>Reg.NO
                                      <Link onClick={() => this.handleSort('reg_no')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'reg_no' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
                                      </Link>
                                    </th>
                                    <th> BizCategory
                                      <Link onClick={() => this.handleSort('business_category')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i>  {sortBy === 'business_category' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
                                      </Link>
                                    </th>
                                    <th>SubCategory
                                      <Link onClick={() => this.handleSort('sub_category')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'sub_category' ? (sortOrder === 'asc' ? '↓' : '↑') : ''}
                                      </Link>
                                    </th>
                                    <th>
                                    CompanyName  
                                      <Link onClick={() => this.handleSort('company_name')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'company_name' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link>
                                    </th>
                                    <th>ContactName
                                    <Link onClick={() => this.handleSort('contact_name')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'contact_name' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link></th>
                                      <th>Website
                                    <Link onClick={() => this.handleSort('website')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'webiste' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link></th>
                                    <th>Designation <Link onClick={() => this.handleSort('designation')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'designation' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link></th>
                                    <th>Email
                                    <Link onClick={() => this.handleSort('email')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'email' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link>
                                    </th>
                                    <th>Phone
                                    <Link onClick={() => this.handleSort('phone')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'phone' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link></th>
                                    
                                    <th>Status 
                                    <Link onClick={() => this.handleSort('status')}>
                                      &nbsp;&nbsp;<i class="fas fa-sort gap-3 " style={{color:"LightGray"}}></i> {sortBy === 'status' ? (sortOrder === 'asc'? '↓' : '↑' ) : ''}
                                      </Link>
                                    </th>
                                    <th>Action</th>
                                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    sortedData.map((item, index) => {
                      const validEmailsForCompany = validEmails[item.company_name] || [];
                      return (
                        <tr key={index} style={{ color: this.getRowColor(item.status) }}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={() => this.handleSelectRow(index)}
                            />
                          </td>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.sNo}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.lei_number}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.registrationNumber}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.business_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.sub_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.company_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.contact_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.website}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.designation}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>
                            {validEmailsForCompany.length > 0
                              ? validEmailsForCompany.join(", ")
                              : item.email}
                          </th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.phone}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.status}</th>
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
                      <td colSpan="13" className="text-center">No data available</td>
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

export default EmailChecker;
