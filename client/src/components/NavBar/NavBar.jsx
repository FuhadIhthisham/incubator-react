import { useNavigate } from 'react-router-dom'
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import {  Dropdown, DropdownButton } from 'react-bootstrap';

import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';





function Header(props) {

    const navigate = useNavigate()
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))


  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        elevation={3}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}`, backgroundColor: "#0d47a1" }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="#F9AA33" noWrap sx={{ flexGrow: 1 }}>
            Z Combinator
          </Typography>

          { props?.title ? 



          <DropdownButton
            variant="outline-warning"
            title={userInfo?.firstName}
            id="input-group-dropdown-1"
            >
            <Dropdown.Item disabled>{userInfo?.email}</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={()=>{
              localStorage.removeItem('userInfo')
              navigate('/login')
            }}>Logout</Dropdown.Item>
          </DropdownButton>

        //   <Button 
        //   onClick={()=>navigate('/login')} 
        //   color= 'warning'
        //   sx={{ my: 1, mx: 1.5 }}
        //   >
        //   Logout
        // </Button>
          :
          ''
          
          }
          
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

export default Header