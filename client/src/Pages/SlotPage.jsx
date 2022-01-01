import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SlotBooking  from '../components/AdminHome/SlotBooking'
import AdminNav from '../components/AdminHome/AdminNav'


function SlotPage() {

    const navigate = useNavigate()


    useEffect(()=>{
        const adminInfo = localStorage.getItem('adminInfo')
        if(adminInfo){
            navigate('/admin/slots')
        }
        else {
            navigate('/admin/login')
        }
    }, [navigate])

    return (
        <div>
            <AdminNav />
            <SlotBooking/>
        </div>
    )
}

export default SlotPage
