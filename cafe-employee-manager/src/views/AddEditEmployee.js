import React, { useState } from 'react';
import { FormControl, FormControlLabel, FormHelperText, TextField, Input, InputLabel, Button, FormLabel, RadioGroup, Radio, MenuItem, Select, Paper, Grid } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useNavigate } from "react-router-dom";

export default function AddEditEmployee() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    employeeName: '',
    employeeEmail: '',
    employeePhone: '',
  });
  const [gender, setGender] = useState(null);
  const [cafe, setCafe] = useState('');
  const [startDate, setStartDate] = useState(null);

  function handleTextChange(event) {
    let temp = state;
    temp[event.target.name] = event.target.value
    setState(temp)
  }

  function handleGenderChange(event) {
    setGender(event.target.value)
  }

  function handleCafeChange(event) {
    setCafe(event.target.value)
  }

  function handleDateChange(event) {
    setStartDate(event)
  }

  function handleSubmit() {
    
    console.log({...state, cafe, gender, startDate:startDate.format('YYYY-MM-DD')})
    navigate("/employees")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper style={{ padding: 40, margin: 'auto', maxWidth: 600 }}>
        <Grid container alignItems='flex-start' spacing={4}>
          <Grid item xs={12}>
            <TextField 
              required 
              fullWidth
              name='employeeName' 
              variant='standard' 
              label='Name' 
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              required 
              fullWidth
              name='employeeEmail' 
              variant='standard' 
              label='Email Address' 
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl required>
              <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
              <RadioGroup
                row
                aria-labelledby='demo-radio-buttons-group-label'
                defaultValue='female'
                name='radio-buttons-group'
                value={gender}
                onChange={handleGenderChange}
              >
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='male' control={<Radio />} label='Male' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField 
              required 
              fullWidth
              name='employeePhone' 
              variant='standard' 
              label='Phone Number' 
              onChange={handleTextChange}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl required fullWidth variant='standard' sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id='demo-simple-select-standard-label'>Assigned Cafe</InputLabel>
              <Select
                labelId='demo-simple-select-standard-label'
                id='demo-simple-select-standard'
                value={cafe}
                onChange={handleCafeChange}
                label='Cafe'
              >
                <MenuItem value={'Ten'} >Ten</MenuItem>
                <MenuItem value={'Twenty'} >Twenty</MenuItem>
                <MenuItem value={'Thirty'} >Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                label='Start Date'
                inputFormat='DD/MM/YYYY'
                value={startDate}
                onChange={handleDateChange}
                renderInput={(params) => <TextField required fullWidth {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth 
              type='submit' 
              variant='contained'
            >
                Submit
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Button
        fullWidth 
        variant='contained'
        onClick={handleSubmit}
      >
          Check
      </Button>

    </form>
  )
};
