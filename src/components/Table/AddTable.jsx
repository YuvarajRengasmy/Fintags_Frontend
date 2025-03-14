import React, { useState } from "react";
import { saveFileUpload } from "../../api/fileUpload"; // Assuming you have this API function
import { toast } from "react-toastify";

const CreateTable = () => {
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
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
    if (submitted) {
      setErrors({ ...errors, [event.target.name]: false });
    }
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };

    if (data.company_name === "") {
      newErrors.company_name = true;
    }
    if (data.registrationNumber === "") {
      newErrors.registrationNumber = true;
    }
    if (data.business_category === "") {
      newErrors.business_category = true;
    }
    if (data.sub_category === "") {
      newErrors.sub_category = true;
    }

    return newErrors;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
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
    setSubmitted(true);

    if (handleErrors(newError)) {
      setIsSubmitting(true); // Set the submitting state to true

      saveFileUpload(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          event.target.reset();
          setInputs(initialStateInputs);
          setErrors(initialStateErrors);
          setSubmitted(false);
          setIsSubmitting(false); // Reset the submitting state
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
          setIsSubmitting(false); // Reset the submitting state
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

      <div
        className="modal fade"
        id="add_contact"
        tabIndex="-1"
        aria-labelledby="add_contactLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title" id="add_contactLabel">
                Add New Contact
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
                  disabled={isSubmitting} // Disable the button when submitting
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

export default CreateTable;
