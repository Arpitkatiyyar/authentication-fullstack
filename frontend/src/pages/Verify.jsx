import React, { useState } from 'react'
import { verifyEmail } from '../services/authService'
import { useNavigate,Link } from 'react-router-dom'
function Verify() {
    const navigate =useNavigate()

    const [form ,setForm]=useState({
        email:"",
        otp:""
    })

    const handleChange=(e)=>{
       setForm({ ...form,
        [e.target.name]:e.target.value})
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try {
            await verifyEmail(form);
            alert("email-verified")
            navigate("/")
        } catch(err){
      alert(err.response?.data?.message);
    }
    }
  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded-2xl shadow-lg w-80'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Verify Email</h2>

        <input 
          name='email'
          placeholder='email'
          className='w-full p-2 border rounded mb-4'
          onChange={handleChange}
        />

        <input 
          name='otp'   
          placeholder='otp'
          className='w-full p-2 border rounded mb-4'
          onChange={handleChange}
        />

        <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600' >
          Verify Email
        </button>


      </form>

    </div>
  )
}

export default Verify