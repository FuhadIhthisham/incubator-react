import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const AdminLogin = function AdminLogin() {


    // states for user login form
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const [ loginError, setLoginError ] = useState(false)
    
    const navigate = useNavigate()

    useEffect(()=>{
        const adminInfo = localStorage.getItem('adminInfo')
        if(adminInfo){
            navigate('/admin')
        }
        else {
            navigate('/admin/login')
        }
    }, [navigate])


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh', alignItems: 'center', justifyContent: 'center',}}>

            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 12,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" sx={{marginBottom: 4}} variant="h5">
                ADMIN
                </Typography>
                Log in to manage the Z-Combinator
                <Box 
                    component="form" 
                    noValidate 
                    onSubmit={async(e)=>{
                        e.preventDefault()
                        
                        try {
                            const config = {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }

                            const { data } = await axios.post('/admin/login', {
                                email: loginEmail,
                                password: loginPassword
                            }, config)

                            delete data.password

                            localStorage.setItem('adminInfo', JSON.stringify(data))
                            navigate('/admin')
                        }
                        catch (error){
                            setLoginError(error.response.data.message)
                        }
                    }} 
                    sx={{ mt: 1 }}
                >
                    { loginError && <Alert severity="error"> { loginError } </Alert> }
                    <TextField
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email or phone"
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        label="Password"
                        type="password"
                        id="password"
                    />

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                </Box>
            </Box>
        </Grid>
            
      </Grid>
    </ThemeProvider>
  );
}