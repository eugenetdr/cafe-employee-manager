import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AgGridReact } from 'ag-grid-react';
import { updateCafeData, updateSelectedCafeId } from '../features/cafe/cafeSlice';
import { updateEmployeeData, updateSelectedEmployeeId } from '../features/employee/employeeSlice';
import cellActionRenderer from './components/cellActionRenderer';
import { API_GET_CAFES, API_GET_EMPLOYEES, PATH_ADD_EMPLOYEE } from '../constants';
import './styles.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Cafes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const employeeData = useSelector((state) => state.employee.data);
  const selectedCafeId = useSelector((state) => state.cafe.selectedCafeId);
  const selectedEmployeeId = useSelector((state) => state.employee.selectedEmployeeId);
  
  const defaultColumnDefs = {
    flex: 1, 
    wrapText: true, 
    autoHeight: true,
    minWidth: 150,
  }
  const [columnDefs] = useState([
    {
    field:'id', 
    headerName:'Employee ID'
    },
    {
    field:'name', 
    headerName:'Name'
    },
    {
    field:'email_address', 
    headerName:'Email Address'
    },
    {
    field:'phone_number', 
    headerName:'Phone Number'
    },
    {
    field:'days_worked', 
    headerName:'Days Worked in Cafe'
    },
    {
    field:'cafe_name', 
    headerName:'Cafe Name'
    },
    {
    field:'actions', 
    headerName:'Actions', 
    cellRenderer: cellActionRenderer
    },
  ])
  
  async function fetchEmployeeData() {
    let cafeDataResponse = await axios.get(API_GET_CAFES);
    let employeeDataResponse;
    if (selectedCafeId !== '') {
      employeeDataResponse = await axios.get(API_GET_EMPLOYEES, { params: {cafeId: selectedCafeId}});
    } else {
      employeeDataResponse = await axios.get(API_GET_EMPLOYEES);
    }
    dispatch(updateCafeData(cafeDataResponse.data));
    dispatch(updateEmployeeData(employeeDataResponse.data));
    dispatch(updateSelectedCafeId(''));
  }

  useEffect(() => {
    if (selectedEmployeeId !== '') {
      dispatch(updateSelectedEmployeeId(''));
    }
    fetchEmployeeData();
  }, [dispatch]);

  return (
    <div style={{ height:'100%',display: 'flex' }}>
      <div className="ag-theme-alpine" >
        <div style={{ width: '100%', maxWidth: '2000px', marginTop: '24px' , display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
          <Typography variant='h4' style={{ justifyContent: 'center'}}>Employees</Typography>
          <div style={{ display: 'flex', alignItems:'center'}}>
            <Button 
              variant="contained" 
              size='large'
              onClick={()=>navigate(PATH_ADD_EMPLOYEE)} 
              startIcon={<AddIcon />} 
              style={{ padding:'12px', color:'white', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#51321b' }}
            >Add Employee</Button>
          </div>
        </div>
        <div style={{ height: '100%', width: '100%', maxWidth: '2000px', marginTop: '24px' }}>
          <AgGridReact
            rowData={employeeData}
            defaultColDef={defaultColumnDefs}
            columnDefs={columnDefs}>
          </AgGridReact>
        </div>
      </div>
    </div>
  ) 
  
};
