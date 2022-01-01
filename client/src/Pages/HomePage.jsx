import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Header from '../components/NavBar/NavBar'
import { Home } from '../components/Home/Home'



function HomePage() {

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

    return (
        <div>
            <Header title='Home' />
            <Home />
        </div>
    )
}

export default HomePage
