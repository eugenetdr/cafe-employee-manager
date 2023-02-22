import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import '../index.css';

export default function Layout() {

  const navigate = useNavigate();
  const location = useLocation();
  const indexPageActive = location['pathname'] === '/';
  const cafePageNavUnderline = location['pathname'] === '/cafes' ? 'white' : null;
  const employeePageNavUnderline = location['pathname'] === '/employees' ? 'white' : null;
  const baseStyle = {
    height: '100%', 
    width: '200px', 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent:'center', 
    alignItems: 'center', 
    paddingLeft: '20px'
  }
  const navbarTextStyle = { 
    fontWeight: 'bold', 
    color: 'white' 
  }
  const buttonStyle = {
    width: '100%', 
    height:'95%', 
    display: 'flex', 
    justifyContent:'center', 
    alignItems: 'center'
  }
  const buttonUnderlineStyle = {
    width: '100%', 
    height:'5%',
    marginBottom: '5px',
  }
  const paperStyle = {
    height: '450px', 
    width: '400px', 
    minHeight: '450px',
    minWidth: '400px',
    margin: '5%', 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems:'center', 
    justifyContent:'center' 
  }
  const paperTextStyle = { 
    padding: '20px', 
    color: '#444444' 
  }

  function navigateOrRefresh(loc) {
    if (loc === location['pathname']) {
      navigate(0);
    } else {
      navigate(loc);
    }
  }

  return (
    <div style={{ margin: 0, width: '100%' }}>
      <nav style={{ backgroundColor: '#51321b', display: 'flex', flexDirection:'row', height:'80px', width: '100%' }}>
        <div style={baseStyle}> 
          <Typography 
            variant='h4' 
            style={navbarTextStyle}
            onClick={()=>navigate('/')}
          >
            BIRDS
          </Typography>
        </div>
        { indexPageActive ? null :
          <>
            <div style={{ ...baseStyle, paddingLeft: '50px' }} onClick={()=>navigateOrRefresh('/cafes')} >
              <div style={buttonStyle} >
                <Typography variant='h6' style={navbarTextStyle} >Manage Cafe</Typography>
              </div>
              <div style={{ ...buttonUnderlineStyle, backgroundColor: cafePageNavUnderline }} />
            </div>
            <div style={{ ...baseStyle, paddingLeft: 0 }} onClick={()=>navigateOrRefresh('/employees')} >
              <div style={buttonStyle} >
                <Typography variant='h6' style={navbarTextStyle} >Manage Employee</Typography>
              </div>
              <div style={{ ...buttonUnderlineStyle, backgroundColor: employeePageNavUnderline }} />
            </div>
          </>
        }
      </nav>

      {indexPageActive ? 
        <div className='bg' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <Paper
            square
            elevation={2}
            style={paperStyle}
            onClick={()=>navigate('cafes')}
          >
            <Icon icon="uiw:coffee" color="#7b6d5b" width="100" height="100" />
            <Typography variant='h4' style={paperTextStyle} >Manage Cafe</Typography>
          </Paper>
          <Paper
            square
            elevation={2}
            style={paperStyle}
            onClick={()=>navigate('employees')}
          >
            <Icon icon="clarity:employee-group-line" color="#7b6d5b" width="100" height="100" />
            <Typography variant='h4' style={paperTextStyle} >Manage Employee</Typography>
          </Paper>
        </div> 
        : <div style={{ width: '100%', height: 'calc(100vh - 80px)', marginTop: '80px', position: 'absolute', top: 0, overflow: 'hidden' }}><Outlet /></div>
      }
    </div>
  )
};

