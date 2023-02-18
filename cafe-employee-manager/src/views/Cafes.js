import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Cafes() {
  const navigate = useNavigate();
  const [cafeData, setCafeData] = useState([]);
  const [employeeData, setEmployeeData] = useState([]);
  const [columnDefs] = useState([
    {field:'name', headerName:'Name'},
    {field:'description', headerName:'Description'},
    {field:'location', headerName:'Location'},
    {field:'logo', headerName:'Logo'},
    {field:'employees', headerName:'Number of Employees'},
    {field:'employeeNames', headerName:'Employees'},
  ])
  
  async function fetchCafeData() {
    const cafeDataResponse = await axios.get(`http://localhost:5000/cafes`);
    const employeeDataResponse = await axios.get(`http://localhost:5000/employees`);
    // console.log(response.data)
    insertEmployeesToCafeData(cafeDataResponse.data, employeeDataResponse.data)
  }

  function insertEmployeesToCafeData(cafeDataResponse, employeeDataResponse) {
    let cafeEmployees = {};
    employeeDataResponse.forEach((employee) => {
      let cafeName = employee['cafe_name'];
      if (cafeEmployees.hasOwnProperty(cafeName) === true) {
        cafeEmployees[cafeName].push(employee['name']);
      } else {
        cafeEmployees[cafeName] = Array(employee['name']);
      }
    })
    cafeDataResponse.forEach((cafe)=>{
      cafe['employeeNames'] = cafeEmployees[cafe['name']];
    })
    setCafeData(cafeDataResponse);
    setEmployeeData(employeeDataResponse);
  }

  let data = true;
  function click() {
    if (data) {
      alert(data)
      data = !data
    } else {
      alert('not')
      data = !data
    }
  }

  useEffect(() => {
    fetchCafeData();
  }, []);

  return (
    <div>
      <h1>Cafes</h1>
      <div className="ag-theme-alpine" style={{height: 400, width: '100%'}}>
        <AgGridReact
          rowData={cafeData}
          columnDefs={columnDefs}>
        </AgGridReact>
      </div>
      <Button variant="contained" onClick={()=>navigate("/addCafe")}>Add</Button>
      <Button variant="contained" onClick={()=>navigate("/editCafe")}>Edit</Button>
      <Button variant="contained" onClick={click}>click</Button>
    </div>
  )
};
