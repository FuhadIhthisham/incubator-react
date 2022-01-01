import * as React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

export const UserLogin = function UserLogin() {

    const [isLogin, setIsLogin] = useState(true)

    // states for user login form
    const [ loginEmail, setLoginEmail ] = useState('')
    const [ loginPassword, setLoginPassword ] = useState('')
    const [ loginError, setLoginError ] = useState(false)
    
    const initialSignupState = {
        firstName: '',
        lastName: '',
        email: '',
        mobile: '',
        password: '',
    }
    const [ signupError, setSignupError ] = useState(false)
    const [ signupData, setSignupData ] = useState(initialSignupState)
    const navigate = useNavigate()

    useEffect(()=>{
        const userInfo = localStorage.getItem('userInfo')
        if(userInfo){
            navigate('/')
        }
        else {
            navigate('/login')
        }
    }, [navigate])


    const handleSignupChange = (e) =>{
        const { name, value } = e.target
        setSignupData({ ...signupData, [name]: value })
        console.log(signupData);
    }

    const { register, handleSubmit, formState: { errors } } = useForm()

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        {   

            isLogin ? 

            // Login Component
                
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
                Sign In
                </Typography>
                Log in to access the Z-Combinator Application
                <Box 
                    component="form" 
                    noValidate 
                    onSubmit={handleSubmit(async()=>{
                        
                        try {
                            const config = {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }

                            const { data } = await axios.post('/login', {
                                email: loginEmail,
                                password: loginPassword
                            }, config)

                            delete data.password

                            localStorage.setItem('userInfo', JSON.stringify(data))
                            navigate('/')
                        }
                        catch (error){
                            setLoginError(error.response.data.message)
                        }
                    })} 
                    sx={{ mt: 1 }}
                >
                    { loginError && <Alert severity="error"> { loginError } </Alert> }
                    <TextField
                        margin="normal"
                        {...register('email', {required: 'Email address is required'}) }
                        fullWidth
                        id="email"
                        label="Email or phone"
                        value={loginEmail}
                        onChange={(e)=>setLoginEmail(e.target.value)}
                        error= { errors.email ? true : false }
                        autoComplete="email"
                        autoFocus
                    />
                    { errors.email ? 

                            <Grid item style={{color: 'red', fontSize: '13px'}} > {errors.email.message} </Grid>
                        
                     : '' } 
                    <TextField
                        margin="normal"
                        {...register('password', {required: 'Password is required', minLength: {
                            value: 5,
                            message: 'Password must be 5 characters'
                        }})}
                        fullWidth
                        value={loginPassword}
                        onChange={(e)=>setLoginPassword(e.target.value)}
                        label="Password"
                        type="password"
                        id="password"
                        error= { errors.password ? true : false }
                    />
                    <Grid item style={{color: 'red', fontSize: '13px'}} > { errors.password ? errors.password.message : '' } </Grid>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                        <Link 
                            variant="body2"
                            style={{textDecoration: 'none', cursor: 'pointer'}} 
                            onClick={()=>setIsLogin(false)}
                            >
                            {"Don't have an account? Sign Up"}
                        </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </Grid>
            

            :


            // Signup Component

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
                Sign Up
                </Typography>
                Sign up to access the Z-Combinator Application
                <Box component="form" noValidate sx={{ mt: 1 }}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setSignupError(null)

                        try {
                            const config = {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }

                            const { data } = await axios.post('/signup', {
                            
                                firstName: signupData.firstName,
                                lastName: signupData.lastName,
                                email: signupData.email,
                                mobile: signupData.mobile,
                                password: signupData.password
                            }, config)

                            console.log(data);

                            setSignupData(initialSignupState)

                            setIsLogin(true)

                        }
                        catch(error){
                            setSignupError(error.response.data.message)
                        }
                    }}

                >
                    { signupError && <Alert severity="error"> { signupError } </Alert> }
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                onChange={handleSignupChange}
                                value={signupData.firstName}
                                name="firstName"
                                autoComplete="firstName"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="lastName"
                                onChange={handleSignupChange}
                                value={signupData.lastName}
                                label="Last Name"
                                name="lastName"
                                autoComplete="lastName"
                                
                            />
                        </Grid>   
                    </Grid>  
                    <Grid>

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            onChange={handleSignupChange}
                            value={signupData.email}
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            
                        />

                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleSignupChange}
                            value={signupData.phone}
                            id="phone"
                            label="Phone Number"
                            name="phone" 
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            onChange={handleSignupChange}
                            value={signupData.password}
                            name="password"
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
                            Signup
                        </Button>
                        <Grid container>
                            <Grid item >
                            <Link 
                                variant="body2"
                                style={{textDecoration: 'none', cursor: 'pointer'}} 
                                onClick={()=>setIsLogin(true)}
                                >
                                {"Already have an account?"}
                            </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            </Grid>

        }
      </Grid>
    </ThemeProvider>
  );
}