import React, { useState } from 'react';
import { FormControl, Avatar, TextField, Input, InputLabel, Button, FormLabel, RadioGroup, Radio, MenuItem, Select, Paper, Grid } from '@mui/material';
import { useNavigate } from "react-router-dom";
import FolderIcon from '@mui/icons-material/Folder';

export default function AddEditCafe() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    cafeName: '',
    cafeDescription: '',
  });
  const [location, setLocation] = useState('');
  const [img, setImg] = useState('');

  function handleTextChange(event) {
    let temp = state;
    temp[event.target.name] = event.target.value
    setState(temp)
  }

  function handleLocationChange(event) {
    setLocation(event.target.value)
  }

  async function handleImgChange(event) {
    const newImage = event.target?.files?.[0];
    if (newImage) {
      const base64 = await convertToBase64(newImage)
      setImg(base64);
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

  function handleSubmit() {
    
    console.log({...state, location})
    navigate("/employees")
  }

  return (
    <form onSubmit={handleSubmit}>
      <Paper style={{ padding: 40, margin: 'auto', maxWidth: 600 }}>
        <Grid container alignItems='flex-start' spacing={4}>
          <Grid item xs={6}>
            <Grid container spacing={3} >
              <Grid item xs={12}>
                <TextField 
                  required 
                  fullWidth
                  name='cafeName' 
                  variant='standard' 
                  label='Cafe Name' 
                  onChange={handleTextChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl required fullWidth variant='standard' sx={{ minWidth: 120 }}>
                  <InputLabel id='demo-simple-select-standard-label'>Assigned Cafe</InputLabel>
                  <Select
                    labelId='demo-simple-select-standard-label'
                    id='demo-simple-select-standard'
                    value={location}
                    onChange={handleLocationChange}
                    label='Cafe'
                  >
                    <MenuItem value={'Ten'} >Ten</MenuItem>
                    <MenuItem value={'Twenty'} >Twenty</MenuItem>
                    <MenuItem value={'Thirty'} >Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={3}>
              <Grid item xs={12} style={{ height: "100%", display:'flex', justifyContent: 'center' }}>
                  <Avatar style={{ height: '50%', width: '50%' }}>
                    {console.log(img)}
                    {img ? <img src={img} style={{ height: '100%', width: '100%' }}/> : <FolderIcon style={{ height: '100%', width: '100%' }}/>}
                  </Avatar>
              </Grid>
              <Grid item xs={12}>
                <Input type='file' onChange={handleImgChange}/>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{ paddingTop: '0px' }}>
            <TextField 
              required 
              fullWidth
              multiline
              name='cafeDescription' 
              variant='standard' 
              label='Cafe Description' 
              onChange={handleTextChange}
              rows={5}
            />
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
        onClick={()=>console.log(img)}
      >
          Check
      </Button>

    </form>
  )
};
