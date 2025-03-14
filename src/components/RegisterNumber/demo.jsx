import React, { useState, useEffect } from "react";
import EditTable from "../Table/EditTable";
import axios from "axios";
import CreateTable from "../Table/AddTable";
import { fetchGraphQLData } from "../../Utils/graphqlHelper";
import { getallFileUpload } from "../../api/fileUpload";
import { Link } from "react-router-dom";

const RegisterNumber = () => {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [excelData, setExcelData] = useState(null);
  const [error, setError] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]); // To track selected row indexes
  const [sortBy, setSortBy] = useState("sNo");
  const [sortOrder, setSortOrder] = useState("asc");
  const [statusFilter, setStatusFilter] = useState("");
  const [registrationNumbers, setRegistrationNumbers] = useState({}); // Store registration number by company name
  const [leiNumbers, setLeiNumbers] = useState({}); // Store LEI number by company name
  const [loading, setLoading] = useState(false);
  const [showSecondButton, setShowSecondButton] = useState(false);
  const [columns, setColumns] = useState([
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
  ]);

  useEffect(() => {
     getallUniversityCount();
   }, []);
 
   const getallUniversityCount = () => {
     getallFileUpload()
       .then((res) => {
         console.log("yuvarajres");
         const uniqueData = removeDuplicates(res?.data?.result || []);
         setDataLoaded(uniqueData);
       })
       .catch((err) => {
         console.log("Error fetching data:", err);
         setError(err.message);
       });
   };
   const removeDuplicates = (data) => {
    const uniqueData = [];
    const seen = new Set();

    data.forEach((item) => {
      const identifier = item.contact_name + item.phone; // Create a unique identifier based on Contact Name and Phone
      if (!seen.has(identifier)) {
        uniqueData.push(item); // Add the item to uniqueData if it's not a duplicate
        seen.add(identifier); // Mark this combination as seen
      }
    });

    return uniqueData;
  };
  // Handle sorting columns
  const handleSort = (column) => {
    const newSortOrder = sortBy === column && sortOrder === "asc" ? "desc" : "asc";
    setSortBy(column);
    setSortOrder(newSortOrder);
  };

  // Handle select all rows
  const handleSelectAll = () => {
    const newSelectAll = !selectAll;
    const newSelectedRows = newSelectAll ? excelData.map((_, index) => index) : [];

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setShowSecondButton(true); // Show the second button after the first action is completed
    }, 2000);

    if (newSelectAll) {
      excelData.forEach((item) => {
        if (!registrationNumbers[item.company_name]) {
          getCompanyRegistrationNumber(item.company_name);
        }
      });
    }

    setSelectAll(newSelectAll);
    setSelectedRows(newSelectedRows);
  };

  // Handle row selection
  const handleSelectRow = (index) => {
    const updatedSelectedRows = selectedRows.includes(index)
      ? selectedRows.filter((row) => row !== index)
      : [...selectedRows, index];
    setSelectedRows(updatedSelectedRows);
    setSelectAll(updatedSelectedRows.length === excelData.length);
  };

  // Fetch the registration number from the API
  const getCompanyRegistrationNumber = async (companyName) => {
    const query = `
      query {
        getCompanyByName(name: "${companyName}") {
          name
          registrationNumber
        }
      }`;

    try {
      const data = await fetchGraphQLData(query);
      const { registrationNumber } = data.data.getCompanyByName;

      setRegistrationNumbers((prevState) => ({
        ...prevState,
        [companyName]: registrationNumber,
      }));

      checkAllFetched();
    } catch (error) {
      console.error("Error fetching registration number:", error);
    }
  };

  // Check if all registration numbers are fetched
  const checkAllFetched = () => {
    const allFetched = excelData.every(
      (item) => registrationNumbers[item.company_name]
    );

    if (allFetched) {
      setLoading(false); // Set loading to false once all data is fetched
    }
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
  };

  const getRowColor = (status) => {
    if (status === 'client') {
      return '#008631'; // Active status color (green)
    } else if (status === 'DND') {
      return '#FF0000'; // Inactive status color (red)
    }
    return '#32302f'; // Default color (no specific status)
  };

  const saveSelectedReges = async () => {
    const selectedReges = selectedRows.map((index) => {
      const item = excelData[index];

      // Ensure phone number is treated as a string
      const phone = String(item.phone);  // Ensure it's a string

      return {
        company_name: item.company_name,
        registrationNumber: registrationNumbers[item.company_name],
        region: item.region,
        website: item.website,
        business_category: item.business_category,
        sub_category: item.sub_category,
        contact_name: item.contact_name,
        designation: item.designation,
        email: item.email,
        phone: phone,  // Save phone as a string
        filling_month: item.filling_month,
        file_count: item.file_count,
        status: item.status,
      };
    });

    try {
      const response = await axios.post("http://192.168.133.130:9000/graphql", {
        query: `mutation($reges: [RegInput]) {
          saveReges(reges: $reges) {
            company_name
            registrationNumber
            business_category
            sub_category
            contact_name
            designation
            email
            phone
            website
            filling_month
            file_count
            status
            region
          }
        }`,
        variables: {
          reges: selectedReges,
        },
      });

      console.log("Reges saved:", response.data.data.saveReges);
      alert("Selected companies saved successfully!");
    } catch (error) {
      console.error("Error saving selected companies:", error);
    }
  };

  const toggleColumnSelection = (columnName) => {
    setColumns((prevState) => (
      prevState.map((column) =>
        column.name === columnName
          ? { ...column, isSelected: !column.isSelected }
          : column
      )
    ));
  };

  // Sorting the data
  const uniqueCompanies = dataLoaded && excelData
    ? excelData.filter((value, index, self) =>
        index === self.findIndex((t) => t.company_name === value.company_name)
      )
    : [];

  const filteredData = uniqueCompanies.filter((item) =>
    statusFilter ? item.status === statusFilter : true
  );

  const sortedData = filteredData.sort((a, b) => {
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
              <li className="breadcrumb-item active" aria-current="page">
                Reg_Gen
              </li>
            </ol>
          </nav>
        </div>
        <div className="mb-2 d-flex align-items-center">
      
          <CreateTable />
        </div>
      </div>
      <div className="card">
        <div className="card-header d-flex align-items-center justify-content-between">
          <div className="d-flex my-xl-auto right-content align-items-start flex-wrap row-gap-3">
            <button className="me-3 btn btn-white">Ref Gen</button>
            {!showSecondButton && (
              <button
                onClick={handleSelectAll}
                className="btn btn-white me-2"
                style={{ borderColor: "LightGray" }}
                disabled={loading} // Disable button if loading
              >
                GetAll_Reg_Number
              </button>
            )}
            {showSecondButton && (
              <button onClick={saveSelectedReges} className="btn btn-secondary">
                <Link to="/DomainSearch" className="text-white">Website_Page</Link>
              </button>
            )}
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
                <thead className=" table thead-light">
                  <tr>
                    <th className="no-sort">
                      <div style={{ backgroundColor: "#E5E7EB", fontSize: "10px" }}>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="select-all"
                          checked={selectAll}
                          onChange={handleSelectAll}
                        />
                      </div>
                    </th>
                    <th>
                      S.NO
                      <Link onClick={() => handleSort('sNo')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      LEI
                      <Link onClick={() => handleSort('lei_number')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Reg.NO
                      <Link onClick={() => handleSort('reg_no')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      BizCategory
                      <Link onClick={() => handleSort('business_category')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      SubCategory
                      <Link onClick={() => handleSort('sub_category')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      CompanyName
                      <Link onClick={() => handleSort('company_name')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      ContactName
                      <Link onClick={() => handleSort('contact_name')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Website
                      <Link onClick={() => handleSort('website')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Designation
                      <Link onClick={() => handleSort('designation')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Email
                      <Link onClick={() => handleSort('email')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Phone
                      <Link onClick={() => handleSort('phone')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                    <th>
                      Status
                      <Link onClick={() => handleSort('status')} style={{backgroundColor:"#E5E7EB"}}>
                        &nbsp;&nbsp;<i className="fas fa-sort gap-3" style={{color:"LightGray"}}></i>
                      </Link>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sortedData.map((item, index) => (
                    <tr key={index} style={{ backgroundColor: getRowColor(item.status) }}>
                      <td>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          checked={selectedRows.includes(index)}
                          onChange={() => handleSelectRow(index)}
                        />
                      </td>
                      <td>{item.sNo}</td>
                      <td>{item.lei_number}</td>
                      <td>{item.reg_no}</td>
                      <td>{item.business_category}</td>
                      <td>{item.sub_category}</td>
                      <td>{item.company_name}</td>
                      <td>{item.contact_name}</td>
                      <td>{item.website}</td>
                      <td>{item.designation}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterNumber;
