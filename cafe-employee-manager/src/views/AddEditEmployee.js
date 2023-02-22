import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { 
  FormControl,
  FormControlLabel,
  TextField,
  InputLabel,
  Button,
  FormLabel,
  RadioGroup,
  Radio,
  MenuItem,
  Select,
  Paper,
  Grid,
  Typography 
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateSelectedEmployeeId } from '../features/employee/employeeSlice';
import { 
  API_EMPLOYEE,
  DIALOG_CANCEL,
  DIALOG_CANCEL_TITLE,
  ERROR_MSG_EMAIL,
  ERROR_MSG_NAME,
  ERROR_MSG_PHONE,
  ERROR_MSG_VALIDATION,
  PATH_EMPLOYEES 
} from '../constants';

export default function AddEditEmployee() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedEmployeeId = useSelector((state) => state.employee.selectedEmployeeId);
  const employeeData = useSelector((state) => state.employee.data);
  const cafeData = useSelector((state) => state.cafe.data);

  const [editMode, setEditMode] = useState(false);
  const [employeeName, setEmployeeName] = useState();
  const [employeeEmail, setEmployeeEmail] = useState();
  const [employeePhone, setEmployeePhone] = useState();
  const [gender, setGender] = useState(null);
  const [cafe, setCafe] = useState(''); 
  const [startDate, setStartDate] = useState(null);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedEmployeeId !== '') {
      let values = employeeData.filter((employee) => employee['id'] === selectedEmployeeId)[0]
      console.log(values)
      setEmployeeName(values['name']);
      setEmployeeEmail(values['email_address']);
      setEmployeePhone(values['phone_number']);
      setGender(values['gender']);
      setCafe(values['cafe_name']);

      let d = new Date()
      d.setDate(d.getDate()-values['days_worked'])
      setStartDate(moment(d));
      setEditMode(true);
    } 
  }, [employeeData, selectedEmployeeId]);

  function handleNameChange(event) {
    setEmployeeName(event.target.value);
    let temp = errors;
    temp['employeeName'] = !(event.target.value.length < 11 && event.target.value.length > 5);
    setErrors(temp)
  }

  function handleEmailChange(event) {
    setEmployeeEmail(event.target.value)
    let re = /^\w+@\w+\.\w+/;
    let temp = errors;
    temp['emailAddress'] = !re.test(event.target.value);
    setErrors(temp)
  }

  function handlePhoneChange(event) {
    setEmployeePhone(event.target.value)
    let re = /^[8-9][0-9]{7}$/;
    let temp = errors;
    temp['phoneNumber'] = !re.test(event.target.value);
    setErrors(temp)
  }
  
  function handleCancel() {
    setCancelDialogOpen(false)
    navigate(PATH_EMPLOYEES)
  } 

  async function handleSubmit(e) {
    e.preventDefault()
    let response;
    let data = {
      id: selectedEmployeeId,
      name: employeeName, 
      email_address: employeeEmail, 
      phone_number: employeePhone, 
      gender, 
      cafe,
      start_date: startDate.format('YYYY-MM-DD'),
    }
    let additionalValidation = Object.values(errors).every(item => item === false)
    if (additionalValidation) {
      if (editMode) {
        response = await axios.put(API_EMPLOYEE, null, {
          params: data
        });
      } else {
        response = await axios.post(API_EMPLOYEE, null, {
          params: data
        });
      }
      dispatch(updateSelectedEmployeeId(''));
      navigate(PATH_EMPLOYEES);
    } else {
      setValidationDialogOpen(true);
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', justifyContent:'center', alignItems:'center' }}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Paper style={{ padding: 40, margin: 'auto', maxWidth: 600 }}>
          <Typography variant='h4'>Add Employee</Typography>
          <br />
          <Grid container alignItems='flex-start' spacing={4}>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth
                name='employeeName' 
                variant='outlined' 
                label='Name' 
                onChange={handleNameChange}
                value={employeeName}
                error={errors['employeeName']}
                helperText={errors['employeeName'] ? ERROR_MSG_NAME : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth
                name='employeeEmail' 
                variant='outlined' 
                label='Email Address' 
                onChange={handleEmailChange}
                value={employeeEmail}
                error={errors['emailAddress']}
                helperText={errors['emailAddress'] ? ERROR_MSG_EMAIL : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required>
                <FormLabel id='demo-radio-buttons-group-label'>Gender</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-radio-buttons-group-label'
                  defaultValue='female'
                  name='radio-buttons-group'
                  value={gender}
                  onChange={(event)=>setGender(event.target.value)}
                >
                  <FormControlLabel value='Female' control={<Radio />} label='Female' />
                  <FormControlLabel value='Male' control={<Radio />} label='Male' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth
                error={errors['phoneNumber']}
                name='employeePhone' 
                variant='outlined' 
                label='Phone Number' 
                onChange={handlePhoneChange}
                value={employeePhone}
                helperText={errors['phoneNumber'] ? ERROR_MSG_PHONE : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant='outlined' sx={{ minWidth: 120 }}>
                <InputLabel id='demo-simple-select-standard-label'>Assigned Cafe</InputLabel>
                <Select
                  labelId='demo-simple-select-standard-label'
                  id='demo-simple-select-standard'
                  value={cafe}
                  onChange={(event)=>setCafe(event.target.value)}
                  label='Cafe'
                >
                  {cafeData.map((cafe) => <MenuItem value={cafe['name']} >{cafe['name']}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label='Start Date'
                  inputFormat='DD/MM/YYYY'
                  value={startDate}
                  onChange={(event)=>setStartDate(event)}
                  renderInput={(params) => <TextField required disabled fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <Button
                  fullWidth 
                  size='large'
                  style={{ marginRight: '8px', padding:'12px', color: '#51321b', borderColor: '#51321b',paddingLeft: '32px', paddingRight: '32px' }}
                  variant='outlined'
                  onClick={()=>setCancelDialogOpen(true)}
                >
                    Cancel
                </Button>
                <Button
                  fullWidth 
                  size='large'
                  style={{ marginLeft: '8px', padding:'12px', color:'white', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#51321b' }}
                  variant='contained'
                  type='submit'
                >
                    Submit
                </Button>
              </div>
            </Grid>
          </Grid>
        </Paper>
      </form>
      <Dialog
        open={cancelDialogOpen}
        onClose={()=>setCancelDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {DIALOG_CANCEL_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {DIALOG_CANCEL}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#51321b' }} onClick={()=>setCancelDialogOpen(false)}>Disagree</Button>
          <Button style={{ color: '#51321b' }} onClick={handleCancel} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={validationDialogOpen}
        onClose={()=>setValidationDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Warning!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ERROR_MSG_VALIDATION}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#51321b' }} onClick={()=>setValidationDialogOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
