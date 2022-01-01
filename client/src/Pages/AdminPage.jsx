import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminHome  from '../components/AdminHome/AdminHome'
import AdminNav from '../components/AdminHome/AdminNav'


function AdminPage() {

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
        <div>
            <AdminNav />
            <AdminHome/>
        </div>
    )
}

export default AdminPage
