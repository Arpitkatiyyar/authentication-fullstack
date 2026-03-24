import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import { registerUser } from "../services/authService";
function Register() {
	const navigate=useNavigate();
	const [form,setForm]=useState({
		username:"",
		email:"",
		password:""
	})

	const handleChange=(e)=>{
		setForm({
			...form,
			[e.target.name] : e.target.value
		})
	}
	console.log(form)

	const handleSubmit=async (e)=>{
		e.preventDefault();

		try {
			await registerUser(form);
			alert("Registered! check email for otp");
			navigate("/verify-email");
			console.log("registered")
		} catch (error) {
			alert(error.respone?.data?.message)
		}
	}

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="bg-white p-8 rounded-2xl shadow-lg w-80"
        onSubmit={handleSubmit}
      >
				<h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

				<input  
					name="username"
					placeholder="username"
					className="w-full p-2 border rounded mb-4"
					onChange={handleChange}
				/>

				<input  
					name="email"
					placeholder="email"
					className="w-full p-2 border rounded mb-4"
					onChange={handleChange}
				/>

				<input  
					name="password"
					placeholder="password"
					className="w-full p-2 border rounded mb-4"
					onChange={handleChange}
				/>

				<button className="w-full bg-green-500 text-white py-2 rounded">
          Register
        </button>

				<p className="text-sm mt-4 text-center">
          Already have an account?{" "}
          <Link to="/" className="text-blue-500">
            Login
          </Link>
        </p>
			</form>
    </div>
  );
}

export default Register;
