import React, { useState, useEffect } from "react";
import axios from "axios";
import { ExportCsvService } from "../../Utils/excel";
import CreateTable from "./AddTable";
import EditTable from "./EditTable";
import FileUpload from "./FileUpload";
import { Link } from "react-router-dom";

const Table = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState("sno");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [deletingId, setDeletingId] = useState(null);
  const [columns, setColumns] = useState([
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
  ]);

  useEffect(() => {
    const query = `
      query GetExcelData {
        getExcelData {
          data
        }
      }
    `;
    axios.post("http://192.168.133.120:9000/graphql", { query })
      .then((response) => {
        const data = response.data.data.getExcelData.reduce((acc, item) => acc.concat(item.data), []);
        const uniqueData = data.filter((value, index, self) =>
          index === self.findIndex((t) =>
            t.company_name === value.company_name &&
            t.reg_no === value.reg_no &&
            t.lei_number === value.lei_number
          )
        );
        setExcelData(uniqueData);
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error.message);
        setDataLoaded(true);
      });
  }, []);

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
        {/* <button onClick={this.exportCsv} className="btn btn-primary me-3 mb-2">
          Export to CSV
        </button> */}
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
                {dataLoaded.length > 0 ? (
                  dataLoaded.map((item, index) => (
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
};

export default Table;
