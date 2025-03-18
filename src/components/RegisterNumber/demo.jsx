import React, { useState } from "react";

const SearchCompanyWebsites = () => {
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/search?company=${encodeURIComponent(company)}&region=${encodeURIComponent(region)}`
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Failed to fetch data. Please check your server and API key.");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Company Website Finder</h2>
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Enter Company Name"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        className="border p-2 mb-2 w-full"
        type="text"
        placeholder="Enter Region"
        value={region}
        onChange={(e) => setRegion(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white p-2 rounded w-full"
        onClick={fetchData}
      >
        Search Websites
      </button>

      <ul className="mt-4">
        {results.map((result, index) => (
          <li key={index} className="border-b p-2">
            <a href={result.link} target="_blank" rel="noopener noreferrer">
              {result.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchCompanyWebsites;
