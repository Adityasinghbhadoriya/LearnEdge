import React from 'react';

const ImageSection = () => {
  return (
    <div className="relative w-full py-16 bg-[#f2f8fc]">
      {/* Colored Dots */}
      <div className="absolute top-4 left-4 w-6 h-6 bg-green-400 rounded-full z-0" />
      <div className="absolute bottom-4 left-4 w-6 h-6 bg-red-400 rounded-full z-0" />
      <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-400 rounded-full z-0" />

      {/* Images */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap justify-center gap-6 relative z-10">

        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <img src="/images/image1.jpg" alt="Image 1" className="w-full h-full object-cover" />
        </div>

        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <img src="/images/image2.jpg" alt="Image 2" className="w-full h-full object-cover" />
        </div>

        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <img src="/images/image3.jpg" alt="Image 3" className="w-full h-full object-cover" />
        </div>

        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <img src="/images/image4.jpg" alt="Image 4" className="w-full h-full object-cover" />
        </div>

        <div className="w-60 h-60 rounded-2xl overflow-hidden shadow-md">
          <img src="/images/image5.jpg" alt="Image 5" className="w-full h-full object-cover" />
        </div>

      </div>
    </div>
  );
};

export default ImageSection;
