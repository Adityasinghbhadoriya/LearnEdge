import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom'
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../utils/utils';

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("user")
    if(token){
      setIsLoggedIn(true)
    }
    else{
      setIsLoggedIn(false)
    }
  },[location])

  const handleLogout = async () => {
  try {
    const response = await axios.get(`${BACKEND_URL}/admin/logout`, {
      withCredentials: true,
    });

    toast.success("Logged Out Successfully");

    // Clear localStorage and update state
    localStorage.removeItem("user");
    setIsLoggedIn(false);

    // Redirect to login page
    navigate("/login");

  } catch (error) {
    console.log("Error in logging out", error);
    toast.error(
      error?.response?.data?.error ||
      "Error in logging out"
    );
    localStorage.removeItem("user");
     setIsLoggedIn(false);
  }
};


  return (
    <div className='Navbar ml-10 mr-10 px-4 py-4'>
      <div className='flex items-center justify-between'>

        {/* Left - Logo + Brand Name */}
        <div className='flex items-center gap-2'>
          {/* You can add a logo image here */}
          <Link to={"/"} className='font-extrabold text-2xl sm:text-3xl'>LearnEdge</Link>
        </div>

        {/* Right - Nav Links */}
        <div className='flex gap-2'>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className='border border-black px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-black text-white text-sm sm:text-base cursor-pointer'
            >
              Logout
            </button>

          ) : (
            <>
              <Link
                to={"/signup"}
                className='border border-black px-5 sm:px-8 py-2 sm:py-3 rounded-full bg-black text-white text-sm sm:text-base cursor-pointer'
              >
                Signup
              </Link>
              <Link
                to={"/login"}
                className='border border-black px-5 sm:px-8 py-2 sm:py-3 rounded-full text-sm sm:text-base'
              >
                Login
              </Link>
            </>
          )}
        </div>

      </div>
    </div>
  )
}

export default Navbar
