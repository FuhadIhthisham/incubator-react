import * as React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Alert from '@mui/material/Alert';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FloatingLabel, Form, ProgressBar } from 'react-bootstrap';


const theme = createTheme();

export const Home = function UserLogin() {

    const [ formError, setFormError ] = useState(false)
    const [ applicationDetails, setApplicationDetails ] = useState({})
    
    const initialFormState = {
        name: '',
        address: '',
        city: '',
        state: '',
        password: '',
        email: '',
        phone: '',
        companyName: '',
        teamAndBackground: '',
        aboutProducts: '',
        problemToSolve: '',
        uniqueSolution: '',
        valuePropositionOfCustomer: '',
        competitors: '',
        revenueModel: '',
        marketSize: '',
        marketPlan: '',
        incubationType: 'Physical',
    }
    const [ formData, setFormData ] = useState(initialFormState)
    

    // get user info from local storage
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const handleFormChange = (e) =>{
        const { name, value } = e.target
        setFormData({ ...formData, [name]: value })
    }

    useEffect(async()=>{

        try{

            const { data } = await axios.post('/applicationDetails',{
                userId: userInfo._id
            },
            {
                headers: {
                    "Content-type": "application/json"
                }
            })
            setApplicationDetails(data)
        }
        catch (err){
            console.log(err.response?.data.message);
        }
    },[])


  return (
    <ThemeProvider theme={theme}>
            {
                !applicationDetails?.status ?
      <Grid container component="main" sx={{ height: '100vh', my: 12, display: 'flex', justifyContent: 'center', }}>
        
            
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
            <Box
                sx={{
                my: 5,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                {/* <LockOutlinedIcon /> */}
                </Avatar>
                <Typography component="h1" sx={{marginBottom: 4}} variant="h5">
                    Application For Incubation
                </Typography>
                Fill up the form to apply for Z-Combinator
                <Box component="form" noValidate sx={{ mt: 1 }}
                    onSubmit={async (e) => {
                        e.preventDefault()
                        setFormError(null)

                        try {
                            const config = {
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }

                            const { data } = await axios.post('/apply', {
                            
                                userId: userInfo._id,
                                name: formData.name,
                                address: formData.address,
                                city: formData.city,
                                state: formData.state,
                                email: formData.email,
                                phone: formData.phone,
                                companyName: formData.companyName,
                                teamAndBackground: formData.teamAndBackground,
                                aboutProducts: formData.aboutProducts,
                                problemToSolve: formData.problemToSolve,
                                uniqueSolution: formData.uniqueSolution,
                                valuePropositionOfCustomer: formData.valuePropositionOfCustomer,
                                competitors: formData.competitors,
                                revenueModel: formData.revenueModel,
                                marketSize: formData.marketSize,
                                marketPlan: formData.marketPlan,
                                incubationType: formData.incubationType,
                            }, config)

                            setFormData(initialFormState)
                            setApplicationDetails({status: 'Pending'})


                        }
                        catch(error){
                            setFormError(error.response.data.message)
                        }
                    }}

                >
                    { formError && <Alert severity="error"> { formError } </Alert> }
                    
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                onChange={handleFormChange}
                                value={formData.name}
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                onChange={handleFormChange}
                                value={formData.lastName}
                                label="Address"
                                name="address"
                                autoComplete="address"
                                
                            />
                        </Grid>   
                    </Grid> 

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="city"
                                label="City"
                                onChange={handleFormChange}
                                value={formData.city}
                                name="city"
                                autoComplete="city"
                                
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="state"
                                onChange={handleFormChange}
                                value={formData.lastName}
                                label="State"
                                name="state"
                                autoComplete="state"
                                
                            />
                        </Grid>   
                    </Grid> 
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                onChange={handleFormChange}
                                value={formData.email}
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="companyName"
                                onChange={handleFormChange}
                                value={formData.companyName}
                                label="Company Name"
                                name="companyName"
                                
                            />
                        </Grid>   
                    </Grid> 
                        <Grid item>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="phone"
                                onChange={handleFormChange}
                                value={formData.phone}
                                label="Phone"
                                name="phone"
                                autoComplete="phone"
                                
                            />
                        </Grid>   

                    <Grid>

                        <FloatingLabel className="my-3" id="teamAndBackground" label="Describe your Team and Background *">
                            <Form.Control
                            as="textarea"
                            onChange={handleFormChange}
                            value={formData.teamAndBackground}
                            name='teamAndBackground'
                            placeholder="Describe your team and background *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="Describe your Company and Products *">
                            <Form.Control
                            as="textarea"
                            id="aboutProducts"
                            onChange={handleFormChange}
                            value={formData.aboutProducts}
                            name='aboutProducts'
                            placeholder="Describe your Company and Products *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="Describe the problem you are trying to solve *">
                            <Form.Control
                            as="textarea"
                            id="problemToSolve"
                            onChange={handleFormChange}
                            value={formData.problemToSolve}
                            name='problemToSolve'
                            placeholder="Describe the problem you are trying to solve *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="What is unique about your solution? *">
                            <Form.Control
                            as="textarea"
                            id="uniqueSolution"
                            onChange={handleFormChange}
                            value={formData.uniqueSolution}
                            name='uniqueSolution'
                            placeholder="What is unique about your solution? *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="What is your value proposition of customer? *">
                            <Form.Control
                            as="textarea"
                            id="valuePropositionOfCustomer"
                            onChange={handleFormChange}
                            value={formData.valuePropositionOfCustomer}
                            name='valuePropositionOfCustomer'
                            placeholder="What is your value proposition of customer? *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="Who are your competitors? *">
                            <Form.Control
                            as="textarea"
                            id="competitors"
                            onChange={handleFormChange}
                            value={formData.competitors}
                            name='competitors'
                            placeholder="Who are your competitors and what is your competitive avantage? *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="Explain your revenue model *">
                            <Form.Control
                            as="textarea"
                            id="revenueModel"
                            onChange={handleFormChange}
                            value={formData.revenueModel}
                            name='revenueModel'
                            placeholder="Explain your revenue model *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="What is the potential market size of your product? *">
                            <Form.Control
                            as="textarea"
                            id="marketSize"
                            onChange={handleFormChange}
                            value={formData.marketSize}
                            name='marketSize'
                            placeholder="What is the potential market size of your product? *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>
                        <FloatingLabel className="my-4" label="How do you plan to market your products and service? *">
                            <Form.Control
                            as="textarea"
                            id="marketPlan"
                            onChange={handleFormChange}
                            value={formData.marketPlan}
                            name='marketPlan'
                            placeholder="How do you plan to market your products and service *"
                            style={{ height: '120px' }}
                        />
                        </FloatingLabel>

                        <Form.Check
                            type='radio'
                            label='Physical Incubation'
                            onChange={ handleFormChange }
                            value='Physical'
                            name='incubationType'
                            id='physical'
                        />
                        <Form.Check
                            type='radio'
                            label='Virtual Incubation'
                            onChange={ handleFormChange }
                            value='Virtual'
                            name='incubationType'
                            id='virtual'
                        />
                        
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Box>
            </Box>
        </Grid>
      </Grid>

        : 

        <Grid container component="main" sx={{ height: '40vh', p:5, my: 12, justifyContent: 'center', }}>
            <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square>
                <Box
                    sx={{
                    my: 5,
                    px:6,
                    }}
                >

                    <Typography component="h1" sx={{marginBottom: 10, color:'#0d47a1', textAlign:'center'}} variant="h5">
                        Thank You For Selecting Z-Combinator
                    </Typography>

                    <Typography component="h1" sx={{marginBottom: 4, color:'#0d47a1', textAlign:'center'}} variant="h5">
                        Your Application Status
                    </Typography>
                    
                        { applicationDetails?.status === 'Pending' ? 
                        <Grid>
                            <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                            <Typography component="h1" sx={{marginBottom: 4, color:'#ffc107', textAlign:'center'}} variant="h5">
                                { applicationDetails?.status }
                            </Typography>
                        </Grid>
                        :
                        ''
                        }

                        {
                            applicationDetails?.status === 'Processing' ?
                            <Grid>
                                <ProgressBar> 
                                    <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                    <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                </ProgressBar>
                                <Typography component="h1" sx={{marginBottom: 4,marginTop:2, color:'cyan', textAlign:'center'}} variant="h5">
                                    { applicationDetails?.status }
                                </Typography>
                            </Grid>
                            : ''
                            
                        }

                        {
                            applicationDetails?.status === 'Approved' ?
                            <Grid>
                                <ProgressBar> 
                                    <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                    <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                    <ProgressBar striped variant="primary" now={25} key={3} label='Approved' />
                                </ProgressBar>
                                <Typography component="h1" sx={{marginBottom: 2, marginTop:2, color:'green', textAlign:'center'}} variant="h5">
                                    { applicationDetails?.status }
                                </Typography>
                            </Grid>
                            : ''
                            
                        }

                        {
                            applicationDetails?.status === 'Booked' ?
                            <Grid>
                                <ProgressBar> 
                                    <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                    <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                    <ProgressBar striped variant="primary" now={25} key={3} label='Approved' />
                                    <ProgressBar striped variant="success" now={25} key={3} label='Booked' />
                                </ProgressBar>
                                <Typography component="h1" sx={{marginBottom: 2,marginTop:2, color:'green', textAlign:'center'}} variant="h5">
                                    { applicationDetails?.status }
                                </Typography>
                                <Typography component="h3" sx={{marginBottom: 4, color:'red', textAlign:'center'}} variant="h6">
                                    Your Slot Number:  { applicationDetails?.slot }
                                </Typography>
                            </Grid>
                            : ''
                            
                        }

                        {
                            applicationDetails?.status === 'Rejected' ?
                            <Grid sx={{textAlign: 'center'}}>
                                <ProgressBar> 
                                    <ProgressBar striped variant="danger" now={100} label='Rejected' />
                                </ProgressBar>
                                <Typography component="h1" sx={{marginBottom: 4, marginTop: 3, color:'red', textAlign:'center'}} variant="h5">
                                    { applicationDetails?.status }
                                </Typography>
                                {/* <Button
                                    onClick={(e)=>{
                                        e.preventDefault()
                                        
                                    }}
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Apply Again
                                </Button> */}
                            </Grid>
                            
                            : ''
                            
                        }

                </Box>
            </Grid>
        </Grid>

        }
    </ThemeProvider>
  );
}