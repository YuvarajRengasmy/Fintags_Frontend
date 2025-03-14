import React, { useState, useEffect } from "react";
import { ExportCsvService } from "../../Utils/excel";
import { updateFileUpload, getSingleFileUpload, deleteFileUpload } from "../../api/fileUpload";
import { Dialog, DialogContent, } from "@mui/material";
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";
import { getallFileUpload } from "../../api/fileUpload";
import CreateTable from "./AddTable";
import FileUpload from "./FileUpload";

const Table = () => {
  const [dataLoaded, setDataLoaded] = useState([]);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [sortBy, setSortBy] = useState("sno");
  const [sortOrder, setSortOrder] = useState("asc");
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
    getallUniversityCount();
  }, []);

  const getallUniversityCount = () => {
    getallFileUpload()
      .then((res) => {
        console.log("yuvarajres");
        setDataLoaded(res?.data?.result || []);
      })
      .catch((err) => {
        console.log("Error fetching data:", err);
        setError(err.message);
      });
  };

  const toggleColumnSelection = (name) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.name === name ? { ...col, isSelected: !col.isSelected } : col
      )
    );
  };

  const handleSelectRow = (index) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const handleSort = (columnName) => {
    const order = sortOrder === "asc" ? "desc" : "asc";
    setSortBy(columnName);
    setSortOrder(order);

    const sortedData = [...dataLoaded].sort((a, b) => {
      const aVal = a[columnName] || "";
      const bVal = b[columnName] || "";
      if (aVal < bVal) return order === "asc" ? -1 : 1;
      if (aVal > bVal) return order === "asc" ? 1 : -1;
      return 0;
    });

    setDataLoaded(sortedData);
  };

  const getRowColor = (status) => {
    if (status === "client") {
      return "#008631"; // Active status color (green)
    } else if (status === "DND") {
      return "#FF0000"; // Inactive status color (red)
    }
    return "#32302f"; // Default color (no specific status)
  };

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialStateInputs = {
    company_name: "",
    registrationNumber: "",
    business_category: "",
    sub_category: "",
    contact_name: "",
    designation: "",
    email: "",
    website: "",
    phone: "",
    filling_month: "",
    file_count: "",
    status: "",
    region: "",
  };

  const initialStateErrors = {
    company_name: { required: false },
    registrationNumber: { required: false },
    business_category: { required: false },
    sub_category: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [deleteId, setDeleteId] = useState();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getPromotionList();
    deleteFileData();
  }, []);

  const getPromotionList = () => {
    getSingleFileUpload(id)
      .then((res) => {
        setInputs(res?.data?.result || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };

    if (data.company_name === "") {
      newErrors.company_name = { required: true };
    }
    if (data.registrationNumber === "") {
      newErrors.registrationNumber = { required: true };
    }
    if (data.business_category === "") {
      newErrors.business_category = { required: true };
    }
    if (data.sub_category === "") {
      newErrors.sub_category = { required: true };
    }

    return newErrors;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);

    if (handleErrors(newError)) {
      setIsSubmitting(true);

      updateFileUpload(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          setInputs(initialStateInputs);
          setErrors(initialStateErrors);
          setIsSubmitting(false);
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setIsSubmitting(false);
        });
    }
  };

  const inputFields = [
    { name: "company_name", label: "Company Name" },
    { name: "registrationNumber", label: "Registration Number" },
    { name: "business_category", label: "Business Category" },
    { name: "sub_category", label: "Sub Category" },
    { name: "contact_name", label: "Contact Name" },
    { name: "designation", label: "Designation" },
    { name: "email", label: "Email" },
    { name: "website", label: "Website" },
    { name: "phone", label: "Phone" },
    { name: "filling_month", label: "Filling Month" },
    { name: "file_count", label: "File Count" },
    { name: "status", label: "Status" },
    { name: "region", label: "Region" },
  ];

  const handleEdit = (item) => {
    setInputs({
      _id: item._id,
      company_name: item.company_name,
      registrationNumber: item.registrationNumber,
      business_category: item.business_category,
      sub_category: item.sub_category,
      contact_name: item.contact_name,
      designation: item.designation,
      email: item.email,
      website: item.website,
      phone: item.phone,
      filling_month: item.filling_month,
      file_count: item.file_count,
      status: item.status,
      region: item.region,
    });
  };

  const deleteFileData = () => {
    deleteFileUpload(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getallUniversityCount();
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
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
          <FileUpload />
          <CreateTable />
        </div>
      </div>
{/* Table List */}
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
          <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
            <button className="me-3 btn btn-white">File Upload</button>
            <button className="btn btn-white" style={{ borderColor: "LightGray" }}>
              <Link to="/RegisterNumber">Duplication Check</Link>
            </button>
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
                        onChange={() => toggleColumnSelection(column.name)}
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
                <thead style={{ backgroundColor: "#E5E7EB" }}>
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
                      <th key={column.name}>
                        {column.label}
                        <Link onClick={() => handleSort(column.name)}>
                          &nbsp;&nbsp;
                          <i className="fas fa-sort gap-3" style={{ color: "LightGray" }}></i>
                          {sortBy === column.name ? (sortOrder === "asc" ? "↓" : "↑") : ""}
                        </Link>
                      </th>
                    ))}
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {dataLoaded?.map((item, index) => (
                    <tr key={index} style={{ fontSize: "5px", color: getRowColor(item.status) }}>
                      <td>
                        <input
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelectRow(index)}
                        />
                      </td>
                      {columns.filter((column) => column.isSelected).map((column) => (
                        <th style={{ fontSize: "14px", fontWeight: "inherit" }} key={column.name}>
                          {item[column.name] || "-"}
                        </th>
                      ))}
                      <td>
                        <div className="action-icon d-inline-flex">

                          <Link
                            className="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#edit_contact"
                            onClick={() => handleEdit(item)}
                          >
                            <i className="far fa-edit text-warning me-1"></i>
                          </Link>
                          <Link
                            className="dropdown-item"
                            onClick={() => {
                              openPopup(item?._id);
                            }}
                          >
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
      </div>

      {/* Edit Modal */}
      <div
        className="modal fade"
        id="edit_contact"
        tabIndex="-1"
        aria-labelledby="edit_contactLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="edit_contactLabel">
                Edit Contact
              </h4>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="row">
                  {inputFields.map(({ name, label }) => (
                    <div className="col-md-6" key={name}>
                      <div className="mb-3">
                        <label className="form-label">{label}</label>
                        <input
                          type="text"
                          className="form-control"
                          name={name}
                          value={inputs[name]}
                          onChange={handleInputs}
                        />
                        {errors[name]?.required && (
                          <span className="text-danger">This field is required</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-light"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* Delete Popup */}
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center p-4">
            <h5 className="mb-4" style={{ fontSize: '14px' }}>
              Are you sure you want to Delete <br /> the selected Promotion ?
            </h5>
            <button
              type="button"
              className="btn btn-save btn-success px-3 py-1 border-0 rounded-pill fw-semibold  mx-3"
              onClick={deleteFileData}
              style={{ fontSize: '12px' }}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel  btn-danger px-3 py-1 border-0 rounded-pill fw-semibold  "
              onClick={closePopup}
              style={{ fontSize: '12px' }}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default Table;
