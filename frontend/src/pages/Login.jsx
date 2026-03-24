import React from 'react'
import {loginUser} from"../services/authService"
import {Link,useNavigate} from "react-router-dom"


function Login() {
  const navigate = useNavigate()

  const [form, setForm] = React.useState({
    email: "",
    password: ""
  });


  const handleChange=(e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    });
  };

  const handleSunbmit=async (e)=>{
    e.preventDefault();

    try{
      await loginUser(form);
      navigate("/profile");
      console.log("login successfull")
    }catch(err){
      alert(err.response?.data?.message);
    }

  }


  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleSunbmit}
        className='bg-white p-8 rounded-2xl shadow-lg w-80'
      >
        <h2 className='text-2xl font-bold mb-6 text-center'>Login</h2>

        <input 
          name='email'
          placeholder='email'
          className='w-full p-2 border rounded mb-4'
          onChange={handleChange}
        />

        <input 
          name='password'   
          placeholder='password'
          type='password'
          className='w-full p-2 border rounded mb-4'
          onChange={handleChange}
        />

        <button className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600' >
          Login
        </button>

        <p className="text-sm mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-blue-500">
            Register
          </Link>
        </p>
      </form>

    </div>
  )
}

export default Login