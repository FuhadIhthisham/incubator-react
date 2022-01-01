import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import RecordTrack  from '../components/RecordTrack/RecordTrack'
import AdminNav from '../components/AdminHome/AdminNav'


function RecordTrackPage() {

    const navigate = useNavigate()


    useEffect(()=>{
        const adminInfo = localStorage.getItem('adminInfo')
        if(adminInfo){
            navigate('/admin/records')
        }
        else {
            navigate('/admin/login')
        }
    }, [navigate])

    return (
        <div>
            <AdminNav />
            <RecordTrack/>
        </div>
    )
}

export default RecordTrackPage
