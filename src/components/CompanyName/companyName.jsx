import React, { Component } from "react";
import axios from "axios";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: null,
      error: null,
      selectAll: false,
      selectedRows: [], // To track selected row indexes
      registrationNumbers: {}, // Store registration number by company name
      leiNumbers: {}, // Store LEI number by company name
      websites: {}, // Store websites by company name
      loading: false,
    };
  }

  // Google Search API key and Custom Search Engine ID
  api_key = 'AIzaSyCVXwuprAMl_DnEvHwnRvkbsNaqhlBDcSs';
  cse_id = 'a7c047cfed9c84666';

  // ComponentDidMount function to fetch the Excel data
  componentDidMount() {
    const query = `query GetExcelData {
        getExcelData {
          data
        }
      }`;
    axios
      .post("http://192.168.133.120:9000/graphql", { query })
      .then((response) => {
        let data = response.data.data.getExcelData[0].data;
        const uniqueData = data.filter((value, index, self) =>
          index === self.findIndex((t) =>
            t.company_name === value.company_name &&
            t.reg_no === value.reg_no &&
            t.lei_number === value.lei_number
          )
        );
        this.setState({
          excelData: uniqueData,
          dataLoaded: true,
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        this.setState({
          error: error.message,
          dataLoaded: true,
        });
      });
  }

  // Fetch the company website link from Google Search API
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
      const firstResult = response.data.items && response.data.items[0];
      const website = firstResult ? firstResult.link : "Website Not Found";

      // Update the state with the fetched website URL
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

  // Handle select all rows
  handleSelectAll = () => {
    const { selectAll, excelData } = this.state;
    const newSelectAll = !selectAll;
    const newSelectedRows = newSelectAll ? excelData.map((_, index) => index) : [];
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
  // Fetch the registration number from the API
  getCompanyRegistrationNumber = async (companyName) => {
    try {
      const response = await axios.post("http://192.168.133.120:9000/graphql", {
        query: `query {
            getCompanyByName(name: "${companyName}") {
              name
              registrationNumber
              status
              type
            }
          }`,
      });
      const { registrationNumber } = response.data.data.getCompanyByName;
      this.setState((prevState) => ({
        registrationNumbers: {
          ...prevState.registrationNumbers,
          [companyName]: registrationNumber,
        },
      }));
    } catch (error) {
      console.error("Error fetching registration number:", error);
    }
  };

  render() {
    const { dataLoaded, excelData, selectAll, selectedRows, registrationNumbers, websites } = this.state;

    const filteredData = dataLoaded && excelData
      ? excelData.filter((item) =>
        this.state.statusFilter ? item.status === this.state.statusFilter : true
      )
      : [];

    return (
      <div className="content">
        <div className="d-md-flex d-block align-items-center justify-content-between page-breadcrumb mb-3">
          <div className="my-auto mb-2"></div>
        </div>
        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap">
              <h5 className="">Company List</h5>
            </div>
            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
              <button onClick={() => alert("Get Registration Numbers for selected companies")} className="btn btn-primary d-flex align-items-center me-3">
                <input
                  className="form-check-input me-2 "
                  type="checkbox"
                  id="select-all"
                  checked={selectAll}
                  onChange={this.handleSelectAll}
                />
                Get Registration Numbers
              </button>
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
                    <a href="#" className="dropdown-item rounded-1" onClick={() => this.handleStatusFilter("Active")}>
                      Active
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item rounded-1" onClick={() => this.handleStatusFilter("Inactive")}>
                      Inactive
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  Sort By : {this.state.sortBy} ({this.state.sortOrder === "asc" ? "Ascending" : "Descending"})
                </a>
                <ul className="dropdown-menu dropdown-menu-end p-3">
                  <li>
                    <a href="#" className="dropdown-item rounded-1" onClick={() => this.handleSort("sNo")}>
                      S.No
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item rounded-1" onClick={() => this.handleSort("company_name")}>
                      Company Name
                    </a>
                  </li>
                  <li>
                    <a href="#" className="dropdown-item rounded-1" onClick={() => this.handleSort("email")}>
                      Email
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
                    <th>S.NO</th>
                    <th>LEI</th>
                    <th>Reg.NO</th>
                    <th>CompanyName</th>
                    <th>Website</th>
                    <th>ContactName</th>
                    <th>Email</th>
                    <th>Region</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                      const regNo = registrationNumbers[item.company_name] || "Fetching...";
                      const website = websites[item.company_name] || "Fetching...";
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
                          <td>{regNo !== "Fetching..." ? regNo : "Fetching..."}</td>
                          <td>{item.company_name}</td>
                          <td>{website !== "Fetching..." ? website : "Fetching..."}</td>
                          <td>{item.contact_name}</td>
                          <td>{item.email}</td>
                          <td>{item.region}</td>
                          <td>{item.phone}</td>
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

export default Table;
