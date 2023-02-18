import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Cafes() {
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState([]);
  const [columnDefs] = useState([
    {field:'id', headerName:'Employee ID'},
    {field:'name', headerName:'Name'},
    {field:'email_address', headerName:'Email Address'},
    {field:'phone_number', headerName:'Phone Number'},
    {field:'days_worked', headerName:'Days Worked in Cafe'},
    {field:'cafe_name', headerName:'Cafe Name'},
  ])
  
  async function fetchEmployeeData() {
    const employeeDataResponse = await axios.get(`http://localhost:5000/employees`);
    console.log(employeeDataResponse.data)
    setEmployeeData(employeeDataResponse.data)
  }

  useEffect(() => {
    if (employeeData !== []) {
      fetchEmployeeData();
    }
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
        <AgGridReact
          rowData={employeeData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
      <Button variant="contained" onClick={()=>navigate("/addEmployee")}>Add</Button>
      <Button variant="contained" onClick={()=>navigate("/editEmployee")}>Edit</Button>
    </div>
  ) 
  
};
