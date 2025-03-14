import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { getallFileUpload } from "../../api/fileUpload";
import { saveRegisterNumber } from "../../api/registerNumber";
import { Dialog, DialogContent } from "@mui/material";
import CreateTable from "../Table/AddTable";

const Table = () => {
  const [dataLoaded, setDataLoaded] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
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
    getallFileUpload()
      .then((res) => {
        setDataLoaded(res?.data?.result || []);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
      });
  }, []);

  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(dataLoaded.map((_, index) => index));
    }
    setSelectAll(!selectAll);
  };

  // Handle Save in the frontend
const handleSave = () => {
  const selectedData = selectAll ? dataLoaded : selectedRows.map((index) => dataLoaded[index]);

  // Ensure all records have required fields, or fill them with empty/default values
  const validData = selectedData.map((item) => ({
    company_name: item.company_name || '',  // Default to empty string if missing
    registrationNumber: item.registrationNumber || '',  // Default to empty string if missing
    business_category: item.business_category || '',  // Default to empty string if missing
    sub_category: item.sub_category || '',  // Default to empty string if missing
    contact_name: item.contact_name || '',  // Default to empty string if missing
    designation: item.designation || '',  // Default to empty string if missing
    email: item.email || '',  // Default to empty string if missing
    website: item.website || '',  // Default to empty string if missing
    phone: item.phone || '',  // Default to empty string if missing
    filling_month: item.filling_month || '',  // Default to empty string if missing
    file_count: item.file_count || 0,  // Default to 0 if missing
    status: item.status || '',  // Default to empty string if missing
    region: item.region || ''  // Default to empty string if missing
  }));

  // Now send this valid data to the backend
  saveRegisterNumber(validData)
    .then((res) => {
      toast.success("Data saved successfully");
    })
    .catch((err) => {
      toast.error("Error saving data");
    });
};



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
          <CreateTable />
        </div>
      </div>

      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
            <button className="me-3 btn btn-white">File Upload</button>
            <button className="btn btn-white" style={{ borderColor: "LightGray" }}>
              <Link to="/RegisterNumber">Register Number</Link>
            </button>
          </div>
        </div>

        <div className="card-body p-0">
          <div className="table-responsive">
            <table>
              <thead style={{ backgroundColor: "#E5E7EB" }}>
                <tr>
                  <th className="no-sort">
                    <div className="form-check form-check-md">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="select-all"
                        checked={selectAll}
                        onChange={handleSelectAll}
                      />
                    </div>
                  </th>
                  {columns.filter((column) => column.isSelected).map((column) => (
                    <th key={column.name}>{column.label}</th>
                  ))}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {dataLoaded.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(index)}
                        onChange={() => handleSelectRow(index)}
                      />
                    </td>
                    {columns.filter((column) => column.isSelected).map((column) => (
                      <td key={column.name}>{item[column.name] || "-"}</td>
                    ))}
                    <td>
                      <div className="action-icon d-inline-flex">
                        <Link className="dropdown-item">
                          <i className="far fa-edit text-warning me-1"></i>
                        </Link>
                        <Link className="dropdown-item">
                          <i className="far fa-trash-alt text-danger me-1"></i>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <button onClick={handleSave} className="btn btn-primary">
        Save Selected Data
      </button>
    </div>
  );
};

export default Table;
