import React from "react";

export default function BentoBox1() {
  return (
    <>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="bento-shape-1" clipPathUnits="objectBoundingBox">
            <path 
              d="M0 0.0417599C0 0.0186966 0.0250721 0 0.056 0H0.6105C0.641428 0 0.6665 0.0186965 0.6665 0.0417599V0.148024C0.6665 0.171087 0.691572 0.189784 0.7225 0.189784H0.944C0.974928 0.189784 1 0.20848 1 0.231544V0.95824C1 0.981303 0.974928 1 0.944 1H0.056C0.0250721 1 0 0.981303 0 0.95824V0.0417599Z" 
            />
          </clipPath>
        </defs>
      </svg>
      <div 
        className="h-full w-full flex items-center justify-center"
        style={{ 
          clipPath: 'url(#bento-shape-1)',
          backgroundColor: '#e5e7eb'
        }}
      >
        {/* Content can be added here */}
      </div>
    </>
  );
}
