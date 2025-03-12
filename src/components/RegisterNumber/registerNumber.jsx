import React, { Component } from "react";
import EditTable from "../Table/EditTable";
import axios from "axios";
import CreateTable from "../Table/AddTable";
import { fetchGraphQLData } from "../../Utils/graphqlHelper";
import { Link } from "react-router-dom";

class RegisterNumber extends Component {
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
      registrationNumbers: {}, // Store registration number by company name
      leiNumbers: {}, // Store LEI number by company name
      loading: false,
      showSecondButton: false,
      columns: [
        { name: "sNo", label: "S.No", isSelected: true },
        { name: "lei_number", label: "LEI Number", isSelected: true },
        { name: "reg_no", label: "Registration Number", isSelected: true },
        { name: "business_category", label: "Business Category", isSelected: true },
        { name: "sub_category", label: "Sub Category", isSelected: true },
        { name: "company_name", label: "Company Name", isSelected: true },
        { name: "contact_name", label: "Contact Name", isSelected: true },
        { name: "website", label: "Website", isSelected: true },
        { name: "designation", label: "Designation", isSelected: true },
        { name: "email", label: "Email", isSelected: true },
        { name: "phone", label: "Phone", isSelected: true },
        { name: "status", label: "Status", isSelected: true },
      ],
    };
  }

  async componentDidMount() {
    const query = `
      query GetExcelData {
        getExcelData {
          data
        }
      }`;
  
    try {
      // Fetch data from GraphQL query
      const data = await fetchGraphQLData(query);
    
      // Extract the Excel data
      let excelData = data.data.getExcelData.reduce((acc, item) => {
        return acc.concat(item.data);
      }, []);
    
      // Filter unique entries based on company_name and contact_name
      const uniqueData = excelData.filter((value, index, self) =>
        index === self.findIndex((t) =>
          t.company_name === value.company_name && t.contact_name === value.contact_name
        )
      );
    
      // Set the filtered unique data to the state
      this.setState({
        excelData: uniqueData,
        dataLoaded: true,
      });
    
    } catch (error) {
      // Catch any errors and set the error state
      console.error("Error fetching data:", error);
      this.setState({
        error: error.message,
        dataLoaded: true,
      });
    }
  }
  

  // Handle sorting columns
  handleSort = (column) => {
    const { sortBy, sortOrder } = this.state;
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    this.setState({ sortBy: column, sortOrder: newSortOrder });
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
      });
    }

    this.setState({
      selectAll: newSelectAll,
      selectedRows: newSelectedRows,
    });
  };

  // Handle row selection
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

  // Fetch the registration number from the API
  getCompanyRegistrationNumber = async (companyName) => {
    const query = `
      query {
        getCompanyByName(name: "${companyName}") {
          name
          registrationNumber
        }
      }`;

    try {
      const data = await fetchGraphQLData(query);
      const { registrationNumber } = data.data.getCompanyByName;

      this.setState((prevState) => ({
        registrationNumbers: {
          ...prevState.registrationNumbers,
          [companyName]: registrationNumber,
        },
      }));

      this.checkAllFetched();
    } catch (error) {
      console.error("Error fetching registration number:", error);
    }
  };

  // Check if all registration numbers are fetched
  checkAllFetched = () => {
    const { excelData, registrationNumbers } = this.state;
    const allFetched = excelData.every(
      (item) => registrationNumbers[item.company_name]
    );

    if (allFetched) {
      this.setState({ loading: false }); // Set loading to false once all data is fetched
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

  // Save selected companies
// Save selected companies
saveSelectedReges = async () => {
  const { selectedRows, excelData } = this.state;

  const selectedReges = selectedRows.map((index) => {
    const item = excelData[index];

    // Ensure phone number is treated as a string
    const phone = String(item.phone);  // Ensure it's a string

    return {
      company_name: item.company_name,
      registrationNumber: this.state.registrationNumbers[item.company_name],
      region: item.region,
      website: item.website,
      business_category: item.business_category,
      sub_category: item.sub_category,
      contact_name: item.contact_name,
      designation: item.designation,
      email: item.email,
      phone: phone,  // Save phone as a string
      filling_month: item.filling_month,
      file_count: item.file_count,
      status: item.status,
    };
  });

  try {
    const response = await axios.post("http://192.168.133.130:9000/graphql", {
      query: `mutation($reges: [RegInput]) {
        saveReges(reges: $reges) {
          company_name
          registrationNumber
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
      }`,
      variables: {
        reges: selectedReges,
      },
    });

    console.log("Reges saved:", response.data.data.saveReges);
    alert("Selected companies saved successfully!");
  } catch (error) {
    console.error("Error saving selected companies:", error);
  }
};


  toggleColumnSelection = (columnName) => {
    this.setState((prevState) => ({
      columns: prevState.columns.map((column) =>
        column.name === columnName
          ? { ...column, isSelected: !column.isSelected }
          : column
      ),
    }));
  };
  render() {
    const { dataLoaded, excelData, selectAll, selectedRows, registrationNumbers, sortBy, sortOrder, loading, showSecondButton,columns } = this.state;

    const uniqueCompanies = dataLoaded && excelData
      ? excelData.filter((value, index, self) =>
          index === self.findIndex((t) => t.company_name === value.company_name)
        )
      : [];

    const filteredData = uniqueCompanies.filter((item) =>
      this.state.statusFilter ? item.status === this.state.statusFilter : true
    );

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
                <li className="breadcrumb-item active" aria-current="page">
                  Reg_Gen
                </li>
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
          <div className="card-header d-flex align-items-center justify-content-between">
            <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
              <button className="me-3 btn btn-white">Ref Gen</button>
              {!this.state.showSecondButton && (
                <button
                  onClick={this.handleSelectAll}
                  className="btn btn-white me-2"
                  style={{ borderColor: "LightGray" }}
                  disabled={loading} // Disable button if loading
                >
                  GetAll_Reg_Number
                </button>
              )}
              {this.state.showSecondButton && (
                <button onClick={this.saveSelectedReges} className="btn btn-secondary">
                  <Link to="/DomainSearch" className="text-white">Website_Page</Link>
                </button>
              )}
            </div>

            <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
             

              <div className="dropdown">
            <button
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center dropdown-toggle"
              type="button"
              id="dropdownMenuButton"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select Columns
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              {columns.map((column) => (
                <li key={column.name}>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={column.name}
                      checked={column.isSelected}
                      onChange={() => this.toggleColumnSelection(column.name)}
                    />
                    <label className="form-check-label" htmlFor={column.name}>
                      {column.label}
                    </label>
                  </div>
                </li>
              ))}
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
                      <div style={{backgroundColor:"#E5E7EB",fontSize:"10px"}}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                          checked={selectAll}
                          onChange={this.handleSelectAll}
                        />
                      </div>
                    </th>
                    <th > S.NO
                      <Link onClick={() => this.handleSort('sNo')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
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
                <tbody >
                  {filteredData.length > 0 ? (
                    filteredData.map((item, index) => {
                      const regNo = registrationNumbers[item.company_name] || item.reg_no;
                      return (
                        <tr key={index} style={{ fontSize: "5px", color: this.getRowColor(item.status) }}>
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
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.sno}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.lei_number}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}} >{regNo}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.business_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.sub_category}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.company_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.contact_name}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.website}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.designation}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.email}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.phone}</th>
                          <th style={{ fontSize: "14px",fontWeight:"inherit"}}>{item.status}</th>
                          <td>
                            <div className="action-icon d-inline-flex">
                              <EditTable />
                              <a
                                href="#"
                                onClick={() => this.setState({ deletingId: item._id })}
                                data-bs-toggle="modal"
                                data-bs-target="#delete_modal"
                              >
                                <i className="ti ti-trash" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="7" className="text-center">
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
      </div>
    );
  }
}

export default RegisterNumber;
