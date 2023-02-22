import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { FormControl, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { AgGridReact } from 'ag-grid-react';
import { updateCafeData, updateSelectedCafeId } from '../features/cafe/cafeSlice';
import cellActionRenderer from './components/cellActionRenderer';
import cellEmployeesRenderer from './components/cellEmployeesRenderer';
import cellImageRenderer from './components/cellImageRenderer';
import { API_GET_CAFES, LOCATIONS, PATH_ADD_CAFE } from '../constants';
import './styles.css';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

export default function Cafes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cafeData = useSelector((state) => state.cafe.data);
  const selectedCafeId = useSelector((state) => state.cafe.selectedCafeId);
  const [locationFilter, setLocationFilter] = useState('All');
  const [cafeFilterData, setCafeFilterData] = useState(null);

  const defaultColumnDefs = {
    flex: 1, 
    wrapText: true, 
    autoHeight: true,
    minWidth: 150,
  }
  const [columnDefs] = useState([
    {
      field:'name', 
      headerName:'Name', 
    },
    {
      field:'description', 
      headerName:'Description', 
      flex: 2, 
      minWidth: 300,
      cellClass: "cell-wrap-text",
    },
    {
      field:'location', 
      headerName:'Location', 
    },
    {
      field:'logo', 
      headerName:'Logo', 
      cellRenderer: cellImageRenderer, 
    },
    {
      field:'employees', 
      headerName:'Employees', 
      cellRenderer:cellEmployeesRenderer
    },
    {
      field:'actions', 
      headerName:'Actions', 
      cellRenderer: cellActionRenderer
    },
  ])
  
  useEffect(() => {
    if (selectedCafeId !== '') {
      dispatch(updateSelectedCafeId(''));
    }
    fetchCafeData();
  }, [dispatch]);

  async function fetchCafeData() {
    const cafeDataResponse = await axios.get(API_GET_CAFES);
    dispatch(updateCafeData(cafeDataResponse.data));
  }

  async function handleFilter(event) {
    setLocationFilter(event.target.value)
    if (event.target.value !== 'All') {
      const filterDataResponse = await axios.get(API_GET_CAFES, { params: {location: event.target.value}});
      setCafeFilterData(filterDataResponse.data);
    } else {
      setCafeFilterData(null);
    }
  }

  return (
    <div style={{ height:'100%',display: 'flex' }}>
      <div className="ag-theme-alpine" >
        <div style={{ width: '100%', maxWidth: '2000px', marginTop: '24px' , display:'flex', justifyContent:'space-between', alignItems: 'center'}}>
          <Typography variant='h4' style={{ justifyContent: 'center'}}>Cafes</Typography>
          <div style={{ display: 'flex', alignItems:'center'}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingRight: '16px' }}>
                <Typography >Location</Typography>
                <FormControl fullWidth sx={{ m: 1, minWidth: 120 }} size='large'>
                  <Select
                    value={locationFilter}
                    onChange={handleFilter}
                  >
                    <MenuItem value={'All'} >All</MenuItem>
                    {LOCATIONS.map((loc) => <MenuItem value={loc} >{loc}</MenuItem>)}
                  </Select>
                </FormControl>
              </div>
            <Button 
              variant="contained" 
              size='large'
              onClick={()=>navigate(PATH_ADD_CAFE)} 
              startIcon={<AddIcon />} 
              style={{ padding:'12px', color:'white', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#51321b' }}
            >Add Cafe</Button>
          </div>
        </div>
        <div style={{ height: '100%', width: '100%', maxWidth: '2000px', marginTop: '24px' }}>
          <AgGridReact
            rowData={cafeFilterData ? cafeFilterData : cafeData}
            defaultColDef={defaultColumnDefs}
            columnDefs={columnDefs}>
          </AgGridReact>
        </div>
      </div>
    </div>
  )
};
