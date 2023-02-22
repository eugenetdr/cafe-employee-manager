import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { updateSelectedCafeId } from '../../features/cafe/cafeSlice';
import { API_CAFE, API_EMPLOYEE, DIALOG_ALERT_DELETE, PATH_EDIT_CAFE, PATH_EDIT_EMPLOYEE } from '../../constants';
import { updateSelectedEmployeeId } from '../../features/employee/employeeSlice';
import axios from 'axios';
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';

export default props => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [context, setContext] = useState();
  
  function handleEditClick() {
    if (location['pathname'] === '/cafes') {
      dispatch(updateSelectedCafeId(props.data.id));
      navigate(PATH_EDIT_CAFE);
    } else {
      dispatch(updateSelectedEmployeeId(props.data.id));
      navigate(PATH_EDIT_EMPLOYEE);
    }
  }

  function handleDeleteClick(event) {
    setDeleteDialogOpen(true);
    setContext(event)
  }

  async function deleteAction() {
    if (context.data.id.includes('CAFE')) {
      const response = await axios.delete(API_CAFE, {data: {id: context.data.id}})
    }
    if (context.data.id.includes('UI')) {
      const response = await axios.delete(API_EMPLOYEE, {data: {id: context.data.id}})
    }
    setDeleteDialogOpen(false);
    navigate(0)
  }
  
  return (
    <span>
      <IconButton onClick={handleEditClick}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={()=>handleDeleteClick(props)}>
        <DeleteIcon />
      </IconButton>
      <Dialog
        open={deleteDialogOpen}
        onClose={()=>setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Warning!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {DIALOG_ALERT_DELETE}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{ color: '#51321b' }} onClick={()=>setDeleteDialogOpen(false)}>Disagree</Button>
          <Button style={{ color: '#51321b' }} onClick={deleteAction} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </span>
  );
};
