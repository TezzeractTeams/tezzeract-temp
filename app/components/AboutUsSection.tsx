"use client";

import React from "react";
import Image from "next/image";

export default function AboutUsSection() {
  return (

 
   
        <div >
       
          
          {/* Main Heading */}
          <div 
            className="flex items-center justify-center text-center h-[85vh]"
            style={{
              background: "radial-gradient(152.39% 60.24% at 50% 70.48%, #00378A 1.02%, #96D6F2 37.56%, #FFFFFF 65.93%)"
         

            }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-light leading-tight mb-4 tracking-tighter">
              <span className="text-[#00A9EE] font-light">Teams</span>{" "}
              <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
                <Image 
                  src="/assets/Teams.svg" 
                  alt="Teams" 
                  width={70} 
                  height={70}
                  className="inline-block"
                />
              </span>{" "}
              <span className="text-gray-700">built to scale</span><br></br>
              <span className="text-gray-700"> with your business</span>{" "}
              <span className="text-[#00A9EE] font-light">goals</span>{" "}
              <span className="inline-flex items-center text-3xl md:text-4xl lg:text-5xl">
                <Image 
                  src="/assets/Goals.svg" 
                  alt="Goals" 
                  width={70} 
                  height={70}
                  className="inline-block"
                />
              </span>{" "}<br></br>
              <span className="text-gray-700"> at every stage.</span>
            
            </h1>
            
          </div>

          {/* Growth Specialists Element */}

        <div 
          className="bg-white -mt-40 w-full rounded-t-4xl h-screen z-2"
        />

      {/* Content Section - White Background */}
      
      {/* Team Members Section */}
    
        </div>
  );
}
