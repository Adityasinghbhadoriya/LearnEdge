import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import Navbar from './Navbar';
import { BACKEND_URL } from '../../utils/utils';

function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); 

  const navigate = useNavigate();
  

  const handleSubmit =async (e) => {
    e.preventDefault();
    
    try {
        const response = await axios.post(`${BACKEND_URL}/user/login`,{
        email,
        password
      },{
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      console.log("Login Successfull ", response.data)
      toast.success(response.data.message)
      // With this:
      const { user, token } = response.data;
      localStorage.setItem("user", JSON.stringify({ user, token }));
      navigate("/")
    } catch (error) {
      if(error.response){
        setErrorMessage(error.response.data.message || error.response.data.error || error.response.data.errors || "Login Failed")
      } 
    }
  }

  return (
  <>
    <div className='relative overflow-hidden flex items-center justify-center  pb-10 h-screen w-full '>
      {/* Background Circles (optional responsive hides) */}
      {/* Background Circles */}
      <div className=''>

        <div className="absolute w-20 h-20 bg-orange-400 rounded-full top-[15%] left-[-1.5%] hidden sm:block"></div>
        <div className="absolute w-10 h-10 bg-pink-300 rounded-full top-[10%] left-[20%]"></div>
        <div className="absolute w-16 h-16 bg-blue-600 rounded-full top-[60%] left-[5%] hidden md:block"></div>
        <div className="absolute w-16 h-16 bg-yellow-400 rounded-full bottom-[30%] right-[20%] hidden sm:block"></div>
        <div className="absolute w-20 h-20 bg-sky-400 rounded-full top-[20%] right-[-3%] hidden sm:block"></div>
        <div className='w-110 h-100 rounded-3xl bg-white'>
          <h1 className='font-bold text-3xl text-center p-4'>Welcome to <Link to={"/"} className='text-blue-500  hover:text-blue-400  cursor-pointer'>LearnEdge</Link></h1>
          <h1 className='text-center'>Just Login To Join Us!</h1>
          <form className='mt-9' onSubmit={handleSubmit}>

           
            <input
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-90 px-4 py-3 mt-6 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ml-10"
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-90 px-4 py-3 mt-6 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 ml-10"
              placeholder="Password"
            />
             {/* ✅ Show error message if exists */}
          {errorMessage && (
        <div className="text-red-500 text-center mt-4">{errorMessage}</div>
      )}
          <button type='submit' className='w-90 px-4 py-3  mt-5 ml-10 rounded-xl bg-blue-500 text-white font-bold text-[18px] hover:scale-105 duration-300 hover:bg-blue-400 cursor-pointer'>Login</button>
          <div className='text-center p-3'>Don't have an account? <Link to={"/signup"} className='text-blue-500 hover:text-blue-600' >Signup</Link></div>
          </form>

        </div>
      </div>

    </div>
    </>
  )
}

export default Login