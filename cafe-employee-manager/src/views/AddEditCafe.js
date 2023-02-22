import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { 
  FormControl, 
  Avatar, 
  TextField,
  InputLabel, 
  Button, 
  MenuItem, 
  Select, 
  Paper, 
  Grid,
  Typography 
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { updateSelectedCafeId } from '../features/cafe/cafeSlice';
import { 
  API_CAFE,
  DIALOG_CANCEL,
  DIALOG_CANCEL_TITLE,
  ERROR_MSG_DESCRIPTION,
  ERROR_MSG_IMAGE,
  ERROR_MSG_IMAGE_TITLE,
  ERROR_MSG_NAME,
  ERROR_MSG_VALIDATION,
  LOCATIONS,
  PATH_CAFE 
} from '../constants';

export default function AddEditCafe() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedCafeId = useSelector((state) => state.cafe.selectedCafeId);
  const cafeData = useSelector((state) => state.cafe.data);
  
  const [editMode, setEditMode] = useState(false);
  const [cafeName, setCafeName] = useState();
  const [cafeDescription, setCafeDescription] = useState();
  const [location, setLocation] = useState('');
  const [logo, setLogo] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [imageSizeExceedOpen, setImageSizeExceedOpen] = useState(false);
  const [validationDialogOpen, setValidationDialogOpen] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedCafeId !== '') {
      let values = cafeData.filter((cafe) => cafe['id'] === selectedCafeId)[0]
      setCafeName(values['name']);
      setCafeDescription(values['description']);
      setLocation(values['location']);
      setLogo(values['logo']);
      setEditMode(true);
    } 
  }, [cafeData, selectedCafeId]);

  function handleNameChange(event) {
    setCafeName(event.target.value);
    let temp = errors;
    temp['cafeName'] = !(event.target.value.length < 11 && event.target.value.length > 5);
    setErrors(temp)
  }

  function handleDescriptionChange(event) {
    setCafeDescription(event.target.value);
    let temp = errors;
    temp['cafeDescription'] = !(event.target.value.length < 257);
    setErrors(temp)
  }

  function handleLocationChange(event) {
    setLocation(event.target.value)
  }

  async function handleLogoChange(event) {
    const newImage = event.target?.files?.[0];
    if (newImage.size > 2097152) {
      setImageSizeExceedOpen(true)
    } else if (newImage) {
      const base64 = await convertToBase64(newImage)
      console.log(base64)
      setLogo(base64);
    }
  }

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  function handleCancel() {
    setDialogOpen(false)
    navigate(PATH_CAFE)
  } 

  async function handleSubmit(e) {
    e.preventDefault()
    let response;
    let data = {
      id: selectedCafeId,
      name: cafeName, 
      description: cafeDescription, 
      location,
    };
    let additionalValidation = Object.values(errors).every(item => item === false)
    if (additionalValidation) {
      if (editMode) {
        response = await axios.put(API_CAFE, {logo: logo}, {
          params: data
        });
      } else {
        response = await axios.post(API_CAFE, {logo: logo}, {
          params: data
        });
      }
      dispatch(updateSelectedCafeId(''));
      navigate(PATH_CAFE);
    } else {
      setValidationDialogOpen(true);
    }
  }

  return (
    <div style={{ height: '100%', display: 'flex', justifyContent:'center', alignItems:'center' }}>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <Paper style={{ padding: 40, margin: 'auto', maxWidth: 600 }}>
          <Typography variant='h4'>Add Cafe</Typography>
          <br />
          <Grid container alignItems='flex-start' spacing={4}>
            <Grid item xs={12}>
              <TextField 
                required 
                fullWidth
                name='cafeName' 
                error={errors['cafeName']}
                helperText={errors['cafeName'] ? ERROR_MSG_NAME : ''}
                variant='outlined' 
                label='Cafe Name' 
                value={cafeName}
                onChange={handleNameChange}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl required fullWidth variant='outlined'>
                  <InputLabel id='demo-simple-select-standard-label'>Location</InputLabel>
                  <Select
                    required
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={location}
                    onChange={handleLocationChange}
                    label='Cafe'
                  >
                    {LOCATIONS.map((loc) => <MenuItem value={loc} >{loc}</MenuItem>)}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={3} style={{ display: 'flex', alignItems: 'center'}}>
                <Grid item xs={6} style={{ display: 'flex', justifyContent :'center' }}>
                  <Button 
                    variant="contained" 
                    style={{ marginLeft: '8px', padding:'12px', color:'white', paddingLeft: '32px', paddingRight: '32px', backgroundColor: '#51321b' }}
                    component="label">
                    Upload Logo
                    <input hidden accept="image/*" multiple type="file" onChange={handleLogoChange} />
                  </Button>
                </Grid>
                <Grid item xs={6} style={{ display: 'flex', justifyContent :'center' }}>
                  <Avatar variant='rounded' style={{ height: '50%', width: '50%', marginBottom:'20px' }}>
                    {logo ? <img alt='logo' src={logo} style={{ height: '100%', width: '100%' }}/> : <FolderIcon style={{ height: '100%', width: '100%' }}/>}
                  </Avatar>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} style={{ paddingTop: '0px' }}>
              <TextField 
                required 
                fullWidth
                multiline
                name='cafeDescription' 
                error={errors['cafeDescription']}
                helperText={errors['cafeDescription'] ? ERROR_MSG_DESCRIPTION : ''}
                variant='outlined' 
                label='Cafe Description' 
                value={cafeDescription}
                onChange={handleDescriptionChange}
                rows={5}
              />
            </Grid>
            <Grid item xs={12}>
              <div style={{ display: 'flex', flexDirection: 'row'}}>
                <Button
                  fullWidth 
                  size='large'
                  style={{ marginRight: '8px', padding:'12px', color: '#51321b', borderColor: '#51321b',paddingLeft: '32px', paddingRight: '32px' }}
                  variant='outlined'
                  onClick={()=>setDialogOpen(true)}
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
        open={imageSizeExceedOpen}
        onClose={()=>setImageSizeExceedOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {ERROR_MSG_IMAGE_TITLE}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ERROR_MSG_IMAGE}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#51321b' }} onClick={()=>setImageSizeExceedOpen(false)}>OK</Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={dialogOpen}
        onClose={()=>setImageSizeExceedOpen(false)}
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
          <Button style={{ color: '#51321b' }} onClick={()=>setDialogOpen(false)}>Disagree</Button>
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
