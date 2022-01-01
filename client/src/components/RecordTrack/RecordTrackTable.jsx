import { Grid, Typography } from '@mui/material';
import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';

import { Table, Form, ProgressBar, Modal, Button } from 'react-bootstrap';


// import Title from './Title';

export default function RecordTrackTable() {

    // for modal
    const [show, setShow] = useState(false);
    const [details, setDetails] = useState({});
    const handleClose = () => setShow(false);

    const [ allApplication, setAllApplication ] = useState([])
    
    const [ changeStatus, setChangeStatus ] = useState(false)

    useEffect(async()=>{

        try{

            const { data } = await axios.get('/admin/allApplication',
            {
                headers: {
                    "Content-type": "application/json"
                }
            })
            setAllApplication(data)
        }
        catch (err){
            console.log(err.response?.data.message);
        }
    },[ changeStatus ])

  return (
      <Grid>
        <Paper
            elevation={6}
            sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            }}
        >
            <Typography
                    component="h1"
                    variant="h5"
                    color="inherit"
                    noWrap
                    sx={{ flexGrow: 1, textAlign:'center',fontWeight:700 , my: 3 }}
                >
                    Application Records
                </Typography>

            <Table striped bordered hover responsive variant="dark" className="text-center">
                <thead>
                    <tr>
                    <th>S.No</th>
                    <th>Company Name</th>
                    <th>View</th>
                    <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    allApplication && allApplication.map((data, index)=>{
                        
                            return(
                                <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{data.companyName}</td>
                                    <td>
                                    <Button
                                        onClick={async() => {
                                            const user = data
                                            setShow(true);
                                            
                                            try{
                                                const { data } = await axios.post('/applicationDetails',
                                                {
                                                    userId: user.userId
                                                },
                                                {
                                                    headers: {
                                                        "Content-type": "application/json"
                                                    }
                                                })
                                                setDetails(data)

                                            }
                                            catch (err){
                                                console.log(err.response?.data.message);
                                            }
                                            


                                        } }
                                        variant="outline-warning"
                                    >
                                        View
                                    </Button>
                                    </td>

                                    <td>
                                    {
                                        data?.status === 'Booked' ?
                                        <Grid>
                                            <ProgressBar> 
                                                <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                                <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                                <ProgressBar striped variant="primary" now={25} key={3} label='Approved' />
                                                <ProgressBar striped variant="success" now={25} key={3} label='Booked' />
                                            </ProgressBar>
                                        </Grid>
                                        : ''
                            
                                    }

                                    {
                                        data?.status === 'Approved' ?
                                        <Grid>
                                            <ProgressBar> 
                                                <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                                <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                                <ProgressBar striped variant="primary" now={25} key={3} label='Approved' />
                                            </ProgressBar>
                                        </Grid>
                                        : ''
                            
                                    }

                                    {
                                        data?.status === 'Processing' ?
                                        <Grid>
                                            <ProgressBar> 
                                                <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                                <ProgressBar striped variant="info" now={25} key={3} label='Processing' />
                                            </ProgressBar>
                                        </Grid>
                                        : ''
                            
                                    }

                                    {
                                        data?.status === 'Pending' ?
                                        <Grid>
                                            <ProgressBar> 
                                                <ProgressBar striped variant="warning" now={25} key={1} label='Pending' />
                                            </ProgressBar>
                                        </Grid>
                                        : ''
                            
                                    }

                                    {
                                        data?.status === 'Rejected' ?
                                        <Grid>
                                            <ProgressBar> 
                                                <ProgressBar striped variant="danger" now={100} key={1} label='Rejected' />
                                            </ProgressBar>
                                        </Grid>
                                        : ''
                            
                                    }
                                    </td>
                                </tr>
                            )
        
                            
                        })
                    }
                </tbody>
            </Table>
        </Paper>

    
        <Modal size="lg" style={{zIndex: 9999}} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body className='px-md-5'>
                
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="2">
                            Name
                        </Form.Label>
                        
                        <Form.Control type="text" disabled placeholder={details.name} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="2">
                            Address
                        </Form.Label>
                        <Form.Control type="text" disabled placeholder={details.address} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="2">
                            City
                        </Form.Label>
                        
                        <Form.Control type="text" disabled placeholder={details.city} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="2">
                            State
                        </Form.Label>
                        <Form.Control type="text" disabled placeholder={details.state} />
                    </Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="2">
                            Email
                        </Form.Label>
                        
                        <Form.Control type="text" disabled placeholder={details.email} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Form.Label column sm="5">
                            Phone
                        </Form.Label>
                        <Form.Control type="text" disabled placeholder={details.phone} />
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Form.Label column sm="5">
                        Company Name
                    </Form.Label>
                    <Form.Control type="text" disabled placeholder={details.companyName} />
                </Grid>

                <Grid item className="my-2" xs={12}>
                    <Form.Label> Describe team and background </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.teamAndBackground} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> Describe Company and Products </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.aboutProducts} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> Describe the problem trying to solve </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.problemToSolve} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> What is unique about your solution? </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.uniqueSolution} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> What is your value proposition of customer? </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.valuePropositionOfCustomer} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> Who are your competitors and what is your competitive avantage? </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.competitors} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> Explain your revenue model </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.revenueModel} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> What is the potential market size of your product? </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.marketSize} />
                </Grid>
                <Grid item className="my-2" xs={12}>
                    <Form.Label> How do you plan to market your products and service? </Form.Label>
                    <Form.Control disabled as="textarea" placeholder={details.marketPlan} />
                </Grid>
                <Grid item xs={12}>
                    <Form.Label column sm="5">
                        Incubation Type
                    </Form.Label>
                    <Form.Control type="text" disabled placeholder={details.incubationType} />
                </Grid>
            </Modal.Body>
            
        
            <Modal.Footer>
                
            </Modal.Footer>
        </Modal>
      </Grid>
    
  );
}
