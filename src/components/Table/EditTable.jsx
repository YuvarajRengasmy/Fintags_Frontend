import React, { Component } from 'react';
import { toast } from 'react-toastify';

class EditTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lei_number: '',
      reg_no: '',
      business_category: '',
      sub_category: '',
      company_name: '',
      region: '',
      contact_name: '',
      designation: '',
      email: '',
      phone: '',
      country: '',
      website_link: '',
      filling_month: '',
      file_count: '',
      status: '',
      mobile: '',
      linkedin: '',
      street: '',
      block_no_bulinding: '',
      city: '',
      zip: '',
      services: '',
      tags: '',
      editingId: this.props.contactId, // Assuming the contactId is passed as a prop
    };
  }

  // Fetch data when component mounts
  componentDidMount() {
    const { editingId } = this.state;
    if (editingId) {
      this.fetchContactData(editingId);
    }
  }

  // Fetch the contact data from the backend API (GraphQL query)
  fetchContactData = async (id) => {
    const query = {
      query: `
        query GetRegById($id: ID!) {
          getRegById(id: $id) {
            id
            lei_number
            reg_no
            business_category
            sub_category
            company_name
            region
            contact_name
            designation
            email
            phone
            country
            website_link
            filling_month
            file_count
            status
            mobile
            linkedin
            street
            block_no_bulinding
            city
            zip
            services
            tags
          }
        }
      `,
      variables: {
        id: id,
      },
    };

    try {
      const response = await fetch('http://192.168.133.120:9000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(query),
      });

      const result = await response.json();

      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      const contact = result.data.getRegById;
      // Set the form fields with the fetched data
      this.setState({
        ...contact,
      });
    } catch (error) {
      toast.error('Error fetching contact data: ' + error.message);
    }
  };

  // Handle input changes in the form fields
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Submit the updated data to the backend
  handleSubmit = async () => {
    const { editingId, ...updatedFields } = this.state;

    if (!editingId) {
      toast.error('No ID to update');
      return;
    }

    const mutation = {
      query: `
        mutation EditReg($id: ID!, $updatedFields: UpdateRegInput!) {
          editReg(id: $id, updatedFields: $updatedFields) {
            id
            company_name
            reg_no
            business_category
            sub_category
            contact_name
            email
            phone
            // Add other fields if needed
          }
        }
      `,
      variables: {
        id: editingId,
        updatedFields: updatedFields,
      },
    };

    try {
      const response = await fetch('http://192.168.133.120:9000/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mutation),
      });

      const result = await response.json();
      if (result.errors) {
        throw new Error(result.errors[0].message);
      }

      // Show a success toast
      toast.success('Contact updated successfully');
      document.querySelector('[data-bs-dismiss="modal"]').click(); // Close the modal after success
    } catch (error) {
      toast.error('Error updating contact: ' + error.message);
    }
  };

  render() {
    return (
      <>
        <div className="mb-2">
          <a
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#Edit_contact"
            className="d-flex align-items-center"
          >
            <i className="ti ti-edit" />
          </a>
        </div>

        <div className="modal fade" id="Edit_contact">
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Edit Contact</h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <form onSubmit={(e) => e.preventDefault()}>
                <div className="modal-body pb-0">
                  <div className="row">
                    {[
                      'lei_number',
                      'reg_no',
                      'business_category',
                      'sub_category',
                      'company_name',
                      'region',
                      'contact_name',
                      'designation',
                      'email',
                      'phone',
                      'country',
                      'website_link',
                      'filling_month',
                      'file_count',
                      'status',
                      'mobile',
                      'linkedin',
                      'street',
                      'block_no_bulinding',
                      'city',
                      'zip',
                      'services',
                      'tags',
                    ].map((field) => (
                      <div className="col-md-6" key={field}>
                        <div className="mb-3">
                          <label className="form-label text-capitalize">
                            {field.replace(/_/g, ' ')}
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            name={field}
                            value={this.state[field] || ''}
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
                    className="btn btn-light me-2"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default EditTable;
