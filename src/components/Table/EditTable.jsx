import React, { useState, useEffect } from "react";
import { updateFileUpload, getSingleFileUpload } from "../../api/fileUpload"; // Assuming you have this API function
import { toast } from "react-toastify";
import { Link, useLocation } from "react-router-dom";

const EditTable = () => {
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
  const [upload, setUpload] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    getPromotionList();
  }, []);

  const getPromotionList = () => {
    getSingleFileUpload(id)
      .then((res) => {
        setUpload(res?.data?.result || []);
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

  return (
    <div>
      <div className="mb-2">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#add_contact"
        >
          Add Contact
        </button>
      </div>

      {/* Table displaying the list of data */}
      <table className="table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Registration Number</th>
            <th>Business Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {upload.map((item) => (
            <tr key={item.id}>
              <td>{item.company_name}</td>
              <td>{item.registrationNumber}</td>
              <td>{item.business_category}</td>
              <td>
                <button
                  className="btn btn-warning"
                  data-bs-toggle="modal"
                  data-bs-target="#add_contact"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing */}
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
    </div>
  );
};

export default EditTable;
