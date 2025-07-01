import React, { useEffect, useState } from 'react'
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import missionImage from "../assets/eLearnerXimage.jpg"
import ImageSection from './ImageSection';
import { BACKEND_URL } from '../../utils/utils';

function Home() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/course/courses`, {
          withCredentials: true
        });
        setCourses(response.data.courses);
      } catch (error) {
        console.log("error in fetching Courses", error)
      }
    };
    fetchCourses();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className='bg-[#e4eff7]'>
      <Navbar />

      {/* Hero Section */}
      <section>
        <div className="relative w-full min-h-[80vh] px-4 sm:px-6 overflow-hidden">
          {/* Background Circles */}
          <div className="absolute w-20 h-20 bg-orange-400 rounded-full top-[15%] left-[-1.5%] hidden sm:block"></div>
          <div className="absolute w-10 h-10 bg-pink-300 rounded-full top-[10%] left-[20%]"></div>
          <div className="absolute w-16 h-16 bg-blue-600 rounded-full top-[60%] left-[5%] hidden md:block"></div>
          <div className="absolute w-16 h-16 bg-yellow-400 rounded-full bottom-[30%] right-[20%] hidden sm:block"></div>
          <div className="absolute w-20 h-20 bg-sky-400 rounded-full top-[20%] right-[-3%] hidden sm:block"></div>

          {/* Hero Content */}
          <div className="relative text-center pt-16 max-w-screen-xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
              LearnEdge <br /> Course Platform
            </h1>
            <p className="text-gray-600 mt-4 text-base sm:text-lg max-w-lg mx-auto">
              Where Learning Meets Opportunity.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to={"/courses"}
                className="bg-black text-white px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-blue-500 duration-300 hover:scale-105"
              >
                Explore Courses
              </Link>

              <Link
                to={"https://www.youtube.com/channel/UCV7cZwHMX_0vk8DSYrS7GCg"}
                target="_blank"
                rel="noreferrer"
                className="border border-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-full font-semibold text-sm sm:text-base md:text-lg hover:bg-black hover:text-white duration-300 hover:scale-105"
              >
                Course Videos
              </Link>

            </div>
          </div>
        </div>
      </section>

      {/* Courses Slider */}
      <section className='px-4 sm:px-8 mt-20 mb-50 max-w-screen-xl mx-auto'>
        <h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center'>Featured Courses</h2>
        <Slider {...settings}>
          {
            courses.map((course) => (
              <div key={course._id} className="px-2">
                <div className='bg-white rounded-lg overflow-hidden shadow-md h-full flex flex-col justify-between transition-transform duration-300 transform hover:scale-105'>
                  <img className='h-48 w-full object-contain bg-white' src={course.image?.url} alt={course.title} />
                  <div className='p-4 text-center'>
                    <h3 className='text-lg font-semibold text-gray-800 truncate'>{course.title}</h3>
                    <button className='mt-4 border border-black px-4 py-2 rounded-full font-medium text-sm sm:text-base hover:bg-black hover:text-white transition duration-300'>
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))
          }
        </Slider>
      </section>

      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 gap-10 md:gap-20 mb-40 mt-10">
        {/* LEFT TEXT SECTION */}
        <div className="w-full md:w-1/2 mt-6 md:mt-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-snug">
            The mission behind <br /> LearnEdge platform
          </h1>
          <p className="text-base sm:text-lg mt-5 text-gray-700">
            At LearnEdge, our mission is to bridge the gap between ambition and achievement by providing high-quality, accessible, and practical education to learners across the globe. We believe that education is not just about absorbing information—it's about transformation.
          </p>
          <p className="text-base sm:text-lg mt-5 text-gray-700">
            LearnEdge is built with a vision to empower students, professionals, and curious minds by offering industry-relevant content, hands-on projects, and real-world skills that matter in today’s dynamic landscape. Our platform is designed to inspire learning that goes beyond textbooks, encouraging creativity, critical thinking, and problem-solving.
          </p>

          <div className="mt-8">
            <Link
              to="/courses"
              className="bg-black text-white px-6 py-3 sm:px-9 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:bg-blue-500 transition duration-300 transform hover:scale-105"
            >
              Explore
            </Link>
          </div>
        </div>

        {/* RIGHT IMAGE SECTION */}
        <div className="w-full md:w-1/2">
          <img
            src={missionImage}
            alt="Mission"
            className="w-full h-auto max-h-[70vh] object-cover rounded-3xl shadow-md"
          />
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home;
