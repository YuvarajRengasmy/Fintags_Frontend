import React, { Component } from "react";
import axios from "axios";
import { ExportCsvService } from "../../Utils/excel";
import CreateTable from "./AddTable";
import EditTable from "./EditTable";
import FileUpload from "./FileUpload";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: null,
      error: null,
      selectAll: false,
      selectedRows: [],
      sortBy: "sno",
      sortOrder: "asc",
      statusFilter: "",
      deletingId: null,
      columns: [
        { name: "sno", label: "S.No", isSelected: true },
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

  componentDidMount() {
    const query = `
      query GetExcelData {
        getExcelData {
          data
        }
      }
    `;

    axios
      .post("http://192.168.133.120:9000/graphql", { query: query })
      .then((response) => {
        let data = response.data.data.getExcelData.reduce((acc, item) => {
          return acc.concat(item.data);
        }, []);

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

  handleDeleteData = (id) => {
    const query = `
      mutation DeleteExcelData($id: ID!) {
        deleteExcelData(id: $id) {
          success
          message
        }
      }
    `;

    axios
      .post("http://192.168.133.120:9000/graphql", {
        query: query,
        variables: { id: id },
      })
      .then((response) => {
        if (response.data.errors) {
          console.log(response.data.errors[0].message); // Logs the error message
        } else {
          console.log("Data deleted successfully:", response.data.data.deleteExcelData.message);
          // After successful deletion, remove the deleted item from the state
          this.setState(prevState => ({
            excelData: prevState.excelData.filter(item => item._id !== id),
          }));
        }
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
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

  exportCsv = (event) => {
    event?.preventDefault();
    const { excelData, statusFilter } = this.state;

    if (!excelData || excelData.length === 0) {
      console.log("No data available to export.");
      return;
    }

    const filteredData = excelData.filter(item =>
      statusFilter ? item.status === statusFilter : true
    );

    if (filteredData.length === 0) {
      console.log("No data matches the filter criteria.");
      return;
    }

    let list = filteredData.map((item) => ({
      sNo: item.sno ?? "-",
      lei_number: item.lei_number ?? "-",
      reg_no: item.reg_no ?? "-",
      business_category: item.business_category ?? "-",
      sub_category: item.sub_category ?? "-",
      company_name: item.company_name ?? "-",
      contact_name: item.contact_name ?? "-",
      designation: item.designation ?? "-",
      email: item.email ?? "-",
      phone: item.phone ?? "-",
      filling_month: item.filling_month ?? "-",
      file_count: item.file_count ?? "-",
      status: item.status ?? "-",
    }));

    let header1 = [
      "sno",
      "lei_number",
      "reg_no",
      "business_category",
      "sub_category",
      "company_name",
      "contact_name",
      "designation",
      "email",
      "phone",
      "filling_month",
      "file_count",
      "status",
    ];

    let header2 = [
      "S.No",
      "LEI Number",
      "Registration Number",
      "Business Category",
      "Sub Category",
      "Company Name",
      "Contact Name",
      "Designation",
      "Email",
      "Phone",
      "Filling Month",
      "File Count",
      "Status",
    ];

    ExportCsvService.downloadCsv(
      list,
      "company_list",
      "Fintags-CrmApplication List",
      header1,
      header2
    );
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
  getRowColor = (status) => {
    if (status === 'client') {
      return '#008631'; // Active status color (green)
    } else if (status === 'DND') {
      return '#FF0000'; // Inactive status color (red)
    }
    return '#32302f'; // Default color (no specific status)
  };

  // Add this function to handle row selection
  handleSelectRow = (index) => {
    this.setState((prevState) => {
      const selectedRows = [...prevState.selectedRows];
      if (selectedRows.includes(index)) {
        const indexToRemove = selectedRows.indexOf(index);
        selectedRows.splice(indexToRemove, 1); // Remove the index
      } else {
        selectedRows.push(index); // Add the index
      }
      return { selectedRows };
    });
  };

  handleSelectAll = () => {
    const { selectAll, excelData } = this.state;
    this.setState({
      selectAll: !selectAll,
      selectedRows: !selectAll ? excelData.map((_, index) => index) : [],
    });
  };

  render() {
    const { dataLoaded, excelData, error, selectAll, selectedRows, statusFilter, sortBy, sortOrder, columns } = this.state;

    const filteredData = dataLoaded && excelData ? 
      excelData.filter(item =>
        statusFilter ? item.status === statusFilter : true
      ) : [];

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
                <li className="breadcrumb-item">FileUpload</li>
              </ol>
            </nav>
          </div>
          <div className="mb-2 d-flex align-items-center">
            <button onClick={this.exportCsv} className="btn btn-primary me-3 mb-2">
              Export to CSV
            </button>
            <FileUpload />
            <CreateTable />
          </div>
        </div>

        <div className="card">
          <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
            <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
              <button className="me-3 btn btn-white">File Upload</button>
              <button className="btn btn-white" style={{borderColor: "LightGray"}}><Link to="/RegisterNumber">Duplication Check</Link></button>
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
                <table>
                  <thead style={{backgroundColor:"#E5E7EB"}}>
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
                      {columns.filter((column) => column.isSelected).map((column) => (
                        <th key={column.name} >
                          {column.label}
                          <Link onClick={() => this.handleSort(column.name)}>
                            &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                            {sortBy === column.name ? (sortOrder === "asc" ? "↓" : "↑") : ""}
                          </Link>
                        </th>
                      ))}
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedData.length > 0 ? (
                      sortedData.map((item, index) => (
                        <tr key={index} style={{ fontSize: "5px", color: this.getRowColor(item.status) }}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedRows.includes(index)}
                              onChange={() => this.handleSelectRow(index)}
                            />
                          </td>
                          {columns.filter((column) => column.isSelected).map((column) => (
                            <th style={{ fontSize: "14px",fontWeight:"inherit"}}  key={column.name}>{item[column.name] || "-"}</th>
                          ))}
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
                      ))
                    ) : (
                      <tr>
                        <td colSpan="14">No data available</td>
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
