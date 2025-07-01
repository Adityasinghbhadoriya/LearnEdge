import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import  { Toaster } from 'react-hot-toast';
import Buy from './Components/Buy'
import Courses from './Components/Courses'
import Purchases from './Components/Purchases'
import AdminSignup from './admin/AdminSignup'
import AdminLogin from './admin/AdminLogin'
import AdminDashboard from './admin/AdminDashboard'
import CreateCourse from './admin/CreateCourse'
import UpdateCourse from './admin/UpdateCourse'
import OurCourses from './admin/OurCourses'
import { ProtectedRoute, AdminProtectedRoute } from './Components/ProtectedRoute';


function App() {
  const user = JSON.parse(localStorage.getItem("user"))
  const admin = JSON.parse(localStorage.getItem("admin"))
  return (
    <div className='bg-[#e4eff7] min-h-screen flex flex-col '>
     
      <main className='flex-grow'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>

        {/* Other Routes */}
        <Route path='/courses' element={<Courses/>}/>
        <Route path='/buy/:courseId' element={<Buy/>}/>
         {/* Protected User Route */}
        <Route
          path='/purchases'
          element={
            <ProtectedRoute>
              <Purchases />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
         <Route path='/admin/signup' element={<AdminSignup/>}/>
        <Route path='/admin/login' element={<AdminLogin/>}/>
        <Route
          path='/admin/dashboard'
          element={
            <AdminProtectedRoute>
              <AdminDashboard />
            </AdminProtectedRoute>
          }
        />
        <Route path='/admin/create-course' element={<CreateCourse/>}/>
        <Route path='/admin/update-course/:id' element={<UpdateCourse/>}/>
        <Route path='/admin/our-courses' element={<OurCourses/>}/>
      </Routes>
      </main>
      <Toaster/>
     
    </div>
  )
}

export default App