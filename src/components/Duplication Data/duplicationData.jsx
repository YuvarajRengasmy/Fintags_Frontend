import React, { Component } from "react";
import axios from "axios";
import CreateTable from "../Table/AddTable";
import EditTable from "../Table/EditTable";
import FileUpload from "../Table/FileUpload";
import { Link } from "react-router-dom";

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataLoaded: false,
      excelData: null,
      duplicatesData: [],
      nonDuplicatesData: [],
      error: null,
      selectAll: false,
      selectedRows: [],
      sortBy: "sNo",
      sortOrder: "asc",
      statusFilter: "",
      deletingId: null,
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

        const uniqueData = [];
        const duplicates = [];
        const seen = new Set();
        const duplicateCheck = new Set();

        // Check for duplicates based on company_name and contact_name
        data.forEach((item) => {
          const identifier = `${item.company_name}-${item.contact_name}`;

          if (seen.has(identifier)) {
            // Mark as duplicate if already seen
            if (!duplicateCheck.has(identifier)) {
              duplicates.push(item); // Add first occurrence of duplicate
              duplicateCheck.add(identifier); // Ensure we only add the first duplicate once
            }
          } else {
            uniqueData.push(item); // Keep the first occurrence (non-duplicate)
            seen.add(identifier);
          }
        });

        // Set the state for both duplicates and non-duplicates
        this.setState({
          excelData: uniqueData,
          duplicatesData: duplicates,
          nonDuplicatesData: uniqueData,
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

  handleSelectAll = (e) => {
    const { checked } = e.target;
    const selectedRows = checked ? this.state.excelData.map((_, index) => index) : [];
    this.setState({
      selectAll: checked,
      selectedRows: selectedRows,
    });
  };

  handleSelectRow = (index) => {
    const { selectedRows } = this.state;
    const newSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((row) => row !== index)
      : [...selectedRows, index];
    this.setState({
      selectedRows: newSelectedRows,
    });
  };

  handleSort = (columnName) => {
    const { sortBy, sortOrder } = this.state;
    const newSortOrder = sortBy === columnName && sortOrder === "asc" ? "desc" : "asc";
    this.setState({
      sortBy: columnName,
      sortOrder: newSortOrder,
    });
  };

  exportCsv = () => {
    // Add CSV export logic here
  };

  render() {
    const {
      dataLoaded,
      duplicatesData, // Only render duplicates
      nonDuplicatesData, // Only render non-duplicates
      error,
      sortBy,
      sortOrder,
      columns,
    } = this.state;

    // Sort duplicates data
    const sortedDuplicates = duplicatesData.sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortOrder === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    // Sort non-duplicates data
    const sortedNonDuplicates = nonDuplicatesData.sort((a, b) => {
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

        {/* Table for Duplicates */}
        <div className="card">
          <div className="card-header">
            <h4>Duplicate Entries</h4>
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
                          checked={this.state.selectAll}
                          onChange={this.handleSelectAll}
                        />
                      </div>
                    </th>
                    {columns.filter((column) => column.isSelected).map((column) => (
                      <th key={column.name}>
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
                  {sortedDuplicates.length > 0 ? (
                    sortedDuplicates.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={this.state.selectedRows.includes(index)}
                              onChange={() => this.handleSelectRow(index)}
                            />
                          </div>
                        </td>
                        {columns.filter((column) => column.isSelected).map((column) => (
                          <td key={column.name}>{item[column.name] || "-"}</td>
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
                      <td colSpan="14">No duplicate entries available</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Table for Non-Duplicates */}
        <div className="card mt-3">
          <div className="card-header">
            <h4>Non-Duplicate Entries</h4>
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
                          checked={this.state.selectAll}
                          onChange={this.handleSelectAll}
                        />
                      </div>
                    </th>
                    {columns.filter((column) => column.isSelected).map((column) => (
                      <th key={column.name}>
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
                  {sortedNonDuplicates.length > 0 ? (
                    sortedNonDuplicates.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="form-check form-check-md">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              checked={this.state.selectedRows.includes(index)}
                              onChange={() => this.handleSelectRow(index)}
                            />
                          </div>
                        </td>
                        {columns.filter((column) => column.isSelected).map((column) => (
                          <td key={column.name}>{item[column.name] || "-"}</td>
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
                      <td colSpan="14">No non-duplicate entries available</td>
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
