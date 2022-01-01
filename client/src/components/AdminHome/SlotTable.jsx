import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Grid, Tooltip } from '@mui/material';

import { Button, Dropdown, DropdownButton, Form, Modal } from 'react-bootstrap';
import axios from 'axios';


export default function SlotTable() {

    var rows = [];
    const numslots = 30

    const [show, setShow] = useState(false);

    const [showDetails, setShowDetails] = useState(false);

    const [details, setDetails] = useState({});

    const [slotNumber, setSlotNumber] = useState(null);
    
    const [ allApplication, setAllApplication ] = useState([])

    var booked


    const handleClose = () =>{
        setShow(false); 
        setShowDetails(false)
    } 



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


    for (var i = 1; i <= numslots; i++) {

        allApplication.forEach((el)=>{
            el.slot = parseInt(el.slot)
            if(el.slot === i && el.status === 'Booked' ){
                booked = i
            }
        })
        
        // note: we are adding a key prop here to allow react to uniquely identify each
        // element in this array.
        rows.push(
            <Tooltip title={'Slot '+i } key={i}>

                <Paper
                    sx={{
                        backgroundColor: i===booked? 'red' : '',
                        justifyContent: 'center',
                        '&:hover': {
                            backgroundColor: i===booked? 'red' : 'primary.dark',
                            opacity: [0.9, 0.8, 0.7],
                        },
                    }
                    }
                    elevation={3} key={i} onClick={(data)=>{

                        allApplication.forEach((el)=>{
                            el.slot = parseInt(el.slot)
                            if(el.slot == data.target.innerText && el.status === 'Booked' ){
                                setShowDetails(true)
                                setDetails(el)
                            }
                            else{
                                setShow(true)
                            }
                        })

                        setSlotNumber(data.target.innerText)
                        
                    }} >
                    
                    <Typography
                        noWrap
                        sx={{ flexGrow: 1, textAlign:'center',fontWeight:700 , my: 3 }}
                    >
                        {i} 
                    </Typography>
                         
                         
                </Paper>
            </Tooltip>);
    }
    return (
        <div>
            <Typography variant="h4" gutterBottom component="div">
                Total Slots : {numslots}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    '& > :not(style)': {
                        m: 1,
                        width: 100,
                        height: 100,
                    },


                }}
            >

                {rows}
            </Box>

            <Modal size="sm" style={{zIndex: 9999, marginTop: 50}} show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Approved Companies</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <DropdownButton
                        variant="outline-secondary"
                        title="Company Name"
                        id="input-group-dropdown-1"
                        >

                    {     
                        allApplication.map((el,index)=>{
                            if(el.status === 'Approved' && !el.slot ){
                                return <Dropdown.Item key={index} onClick={async()=>{
                                    const user = el
                                    setChangeStatus(false)
                                        
                                        try{
                                            const { data } = await axios.post('/admin/changeStatus',
                                            {
                                            userId: user.userId,
                                            status: 'Booked',
                                            slot: slotNumber
                                        },
                                        {
                                            headers: {
                                                "Content-type": "application/json"
                                            }
                                        })
                                        setChangeStatus(true)
                            
                                    }
                                    catch (err){
                                        console.log(err.response?.data.message);
                                    }
                                    
                                    handleClose()
                                }}>{el.companyName}</Dropdown.Item>
                            }
                        })
                    }
                    
                    </DropdownButton>


                </Modal.Body>
            </Modal>

            <Modal size="lg" style={{zIndex: 9999}} show={showDetails} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{details.companyName}</Modal.Title>
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



        </div>
    );
}