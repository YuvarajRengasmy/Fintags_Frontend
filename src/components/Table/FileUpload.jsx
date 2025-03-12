import React, { Component } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: [],
      structuredData: {},
      isDataValid: false,
      headers: [],
      selectedHeaders: {},
      mappedData: [],
    };
    this.predefinedHeaders = [
      'sno',
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
      'status',
    ];
  }

  uploadExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const transformedData = this.transformDataToObject(jsonData);

        this.setState({
          excelData: jsonData,
          structuredData: transformedData,
          headers: jsonData[0], // First row of the Excel sheet as headers
          isDataValid: true,
        });
      };
      reader.readAsBinaryString(file);
    } else {
      toast.error('Please select a file first.');
    }
  };

  transformDataToObject = (data) => {
    const headers = data[0];
    const structuredData = {};

    for (let i = 0; i < headers.length; i++) {
      const columnData = data.slice(1).map((row) => row[i]);
      structuredData[headers[i]] = columnData;
    }

    return structuredData;
  };

  handleHeaderChange = (e, predefinedHeader) => {
    this.setState({
      selectedHeaders: {
        ...this.state.selectedHeaders,
        [predefinedHeader]: e.target.value,
      },
    });
  };

  handleSaveData = () => {
    const { selectedHeaders, structuredData, headers } = this.state;

    // Ensure all headers are mapped (all predefined headers have corresponding selected Excel headers)
    if (Object.values(selectedHeaders).some((header) => !header)) {
      toast.error('Please select a corresponding header for each predefined field.');
      return;
    }

    // Map the selected headers (Excel columns) to the predefined headers
    const finalMappedData = [];
    const rowCount = structuredData[headers[0]].length;

    const seenCompanies = new Set(); // To track duplicates by company_name or reg_no

    // Collect the data row by row based on selected headers
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const rowData = {};

      // Fill the rowData with corresponding predefined header values
      this.predefinedHeaders.forEach((predefinedHeader) => {
        const excelHeader = selectedHeaders[predefinedHeader];
        if (structuredData[excelHeader]) {
          rowData[predefinedHeader] = structuredData[excelHeader][rowIndex];
        }
      });

      // Add the rowData to the final mapped data
      finalMappedData.push(rowData);
    }

    // Update the state with the final mapped data (no duplicates removed)
    this.setState({ mappedData: finalMappedData });

    // If data is valid, save it to Apollo Server
    if (finalMappedData.length > 0) {
      this.saveDataToApolloServer(finalMappedData);
    } else {
      toast.warning('No unique data found to save.');
    }
  };

  saveDataToApolloServer = (data) => {
    const mutation = `
      mutation($data: JSON) {
        addExcelData(data: $data) {
          success
          message
        }
      }
    `;
    fetch('http://192.168.133.120:9000/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
        variables: { data },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Data successfully saved to the database!', data);
        toast.success('Data successfully saved to the database!');
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error saving data to the database.');
      });
  };

  render() {
    const { isDataValid, headers, selectedHeaders } = this.state;

    return (
      <>
        <div className="mb-2">
          <a
            href="#"
            className="btn btn-primary d-inline-flex align-items-center me-2"
            data-bs-toggle="modal"
            data-bs-target="#import_contact"
          >
            <i className="ti ti-file-type-pdf" /> Import
          </a>
        </div>

        <div
          className="modal fade"
          id="import_contact"
          tabIndex="-1"
          aria-labelledby="import_contactLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title" id="import_contactLabel">
                  File Upload
                </h4>
                <button
                  type="button"
                  className="btn-close custom-btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  <i className="ti ti-x" />
                </button>
              </div>
              <div className="modal-body pb-0">
                <div className="row">
                  <div className="col-md-12">
                    <div className="d-flex align-items-center flex-wrap row-gap-3 bg-light w-100 rounded p-3 mb-4">
                      <div className="d-flex align-items-center justify-content-center avatar avatar-xxl rounded-circle border border-dashed me-2 flex-shrink-0 text-dark frames">
                        <img
                          src="assets/img/profiles/avatar-30.jpg"
                          alt="img"
                          className="rounded-circle"
                        />
                      </div>
                      <div className="profile-upload">
                        <div className="mb-2">
                          <h6 className="mb-1">Excel File Upload</h6>
                        </div>
                        <div className="profile-uploader d-flex align-items-center">
                          <input
                            type="file"
                            className="form-control"
                            onChange={this.uploadExcel}
                            accept=".xlsx,.xls"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Header Mapping Section */}
                {isDataValid && (
                  <div className="row">
                    {this.predefinedHeaders.map((header, index) => (
                      <div key={index} className="col-md-6">
                        <div className="mb-3">
                          <label
                            className="form-label text-capitalize"
                            htmlFor={`headerSelect${header}`}
                          >
                            {header}
                            <span className="text-danger"> *</span>
                          </label>
                          <select
                            id={`headerSelect${header}`}
                            className="form-control"
                            onChange={(e) => this.handleHeaderChange(e, header)}
                          >
                            <option value="">Select Header</option>
                            {headers.map((headerOption, idx) => (
                              <option key={idx} value={headerOption}>
                                {headerOption}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-light me-2" data-bs-dismiss="modal">
                  Cancel
                </button>
                <button
                  type="button"
                data-bs-dismiss="modal"
                  className="btn btn-primary"
                  onClick={this.handleSaveData}
                  disabled={Object.values(selectedHeaders).some((header) => !header)} // Disable Save if any header is not selected
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default FileUpload;
