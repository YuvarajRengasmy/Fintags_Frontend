import React, { Component } from "react";
import { toast } from "react-toastify";

class CreateTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
  }

  handleSaveContact = () => {
    const {
      company_name,
      registrationNumber,
      business_category,
      sub_category,
      contact_name,
      designation,
      email,
      website,
      phone,
      filling_month,
      file_count,
      status,
      region,
    } = this.state;

    if (!registrationNumber || !company_name || !email) {
      toast.error("Please fill all required fields.");
      return;
    }

    const mutation = `
      mutation {
        saveRege(
          registrationNumber: "${registrationNumber}",
          company_name: "${company_name}",
          business_category: "${business_category}",
          sub_category: "${sub_category}",
          contact_name: "${contact_name}",
          designation: "${designation}",
          email: "${email}",
          phone: "${phone}",
          website: "${website}",
          filling_month: "${filling_month}",
          file_count: "${file_count}",
          status: "${status}",
          region: "${region}"
        ) {
          id
          company_name
          contact_name
        }
      }
    `;

    fetch("http://192.168.133.120:9000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.errors) {
          toast.error("Error adding contact.");
        } else {
          toast.success("Contact successfully added!");
          this.setState({
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
          });
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error("Error adding contact.");
      });
  };

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  render() {
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
              <form>
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
                            value={this.state[name]}
                            onChange={this.handleInputChange}
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
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSaveContact}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateTable;
