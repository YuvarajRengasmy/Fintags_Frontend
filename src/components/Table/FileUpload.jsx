import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const FileUpload = () => {
  const [excelData, setExcelData] = useState([]);
  const [structuredData, setStructuredData] = useState({});
  const [isDataValid, setIsDataValid] = useState(false);
  const [headers, setHeaders] = useState([]);
  const [selectedHeaders, setSelectedHeaders] = useState({});
  const [mappedData, setMappedData] = useState([]);

  const predefinedHeaders = [
    'sno', 'lei_number', 'reg_no', 'business_category', 'sub_category',
    'company_name', 'region', 'contact_name', 'designation', 'email',
    'phone', 'country', 'website_link', 'filling_month', 'file_count',
    'status', 'mobile', 'linkedin', 'street', 'block_no_bulinding',
    'city', 'zip', 'services', 'tags', 'status',
  ];

  const uploadExcel = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const data = event.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });

        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const transformedData = transformDataToObject(jsonData);

        setExcelData(jsonData);
        setStructuredData(transformedData);
        setHeaders(jsonData[0]);
        setIsDataValid(true);
      };
      reader.readAsBinaryString(file);
    } else {
      toast.error('Please select a file first.');
    }
  };

  const transformDataToObject = (data) => {
    const headers = data[0];
    const structuredData = {};

    for (let i = 0; i < headers.length; i++) {
      const columnData = data.slice(1).map((row) => row[i]);
      structuredData[headers[i]] = columnData;
    }

    return structuredData;
  };

  const handleHeaderChange = (e, predefinedHeader) => {
    setSelectedHeaders((prevSelectedHeaders) => ({
      ...prevSelectedHeaders,
      [predefinedHeader]: e.target.value,
    }));
  };

  const handleSaveData = () => {
    if (Object.values(selectedHeaders).some((header) => !header)) {
      toast.error('Please select a corresponding header for each predefined field.');
      return;
    }

    const finalMappedData = [];
    const rowCount = structuredData[headers[0]].length;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const rowData = {};

      predefinedHeaders.forEach((predefinedHeader) => {
        const excelHeader = selectedHeaders[predefinedHeader];
        if (structuredData[excelHeader]) {
          rowData[predefinedHeader] = structuredData[excelHeader][rowIndex];
        }
      });

      finalMappedData.push(rowData);
    }

    setMappedData(finalMappedData);

    if (finalMappedData.length > 0) {
      saveDataToServer(finalMappedData);
    } else {
      toast.warning('No unique data found to save.');
    }
  };

  const saveDataToServer = (data) => {
    fetch('http://localhost:4000/api/fileupload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message || 'Data successfully saved to the database!');
        } else {
          toast.error(data.message || 'Error saving data to the database.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Error saving data to the database.');
      });
  };

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
                  <input
                    type="file"
                    className="form-control"
                    onChange={uploadExcel}
                    accept=".xlsx,.xls"
                  />
                </div>
              </div>

              {isDataValid && (
                <div className="row">
                  {predefinedHeaders.map((header, index) => (
                    <div key={index} className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          {header} <span className="text-danger"> *</span>
                        </label>
                        <select
                          className="form-control"
                          onChange={(e) => handleHeaderChange(e, header)}
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
                className="btn btn-primary"
                onClick={handleSaveData}
                disabled={Object.values(selectedHeaders).some((header) => !header)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
