import React from 'react'
import fbIcon from '../assets/facebook.png'
import instaIcon from '../assets/instagram.png'
import youtubeIcon from '../assets/youtube.png'
import linkedinIcon from '../assets/linkedin.png'
import twitterIcon from '../assets/twitter.png'

function Footer() {
    return (
        <div className='bg-black text-white rounded-3xl mx-4 md:mx-10 my-6 px-6 py-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8'>

            {/* Left Section */}
            <div className='text-center md:text-left'>
                <button className='font-bold text-2xl sm:text-3xl'>LearnEdge</button>
                <p className='text-sm sm:text-base mt-2'>
                    <span className='text-gray-300'>
                        © LearnEdge | Designed by <span className='font-bold'>Team LearnEdge</span> – Powered by
                    </span>{' '}
                    <span className='font-bold'>Modern Web Technologies</span>
                </p>
            </div>

            {/* Social Icons */}
            <div className='flex justify-center md:justify-end gap-4 flex-wrap'>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                    <img src={fbIcon} alt="Facebook" className="w-10 h-10 hover:scale-110 transition-transform" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                    <img src={instaIcon} alt="Instagram" className="w-10 h-10 hover:scale-110 transition-transform" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                    <img src={twitterIcon} alt="Twitter" className="w-10 h-10 hover:scale-110 transition-transform" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    <img src={linkedinIcon} alt="LinkedIn" className="w-10 h-10 hover:scale-110 transition-transform" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeIcon} alt="YouTube" className="w-10 h-10 hover:scale-110 transition-transform" />
                </a>
            </div>

        </div>
    )
}

export default Footer
