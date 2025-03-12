import React from "react";
import { Routes, Route } from 'react-router-dom';
import HomeTable from "../pages/HomeOuter";
import CompanyNmae from "../pages/CompanyName";
import DomainSearch from "../pages/DomainSearch";
import RegisterNumnber from "../pages/RegisterNumber";
import EmailChecker from "../pages/emailChecker";
import DataEnrichment from "../pages/DataEnrichment";
import DataBase from "../pages/Database";
import Login from "../components/Register/login";
import Register from "../components/Register/register";
import DuplicationData from "../pages/DuplicationData";


function HomePage() {
  return (
    <div>

      <Routes>
        <Route path="/FileUpload" element={<HomeTable />} />
        <Route path="/CompanyName" element={<CompanyNmae />} />
        <Route path="/DomainSearch" element={<DomainSearch />} />
        <Route path="/RegisterNumber" element={<RegisterNumnber />} />
        <Route path="/EmailChecker" element={<EmailChecker />} />
        <Route path="/DataEnrichment" element={<DataEnrichment />} />
        <Route path="/Database" element={<DataBase />} />
        <Route path="/" element={<Login/>}/>
        <Route path="/Register" element={<Register/>}/>
        <Route path="/DuplicationData" element={<DuplicationData/>}/>
      </Routes>


    </div>
  );
}
export default HomePage;
