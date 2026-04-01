"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface DiscountBadgeProps {
  percentage: number;
  className?: string;
}

const DiscountBadge: React.FC<DiscountBadgeProps> = ({ percentage, className }) => {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, filter: "brightness(1.1)" }}
      className={`relative flex items-center justify-center w-24 h-28 ${className}`}
    >
      <svg 
        viewBox="0 0 100 120" 
        className="w-full h-full drop-shadow-2xl overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4D0" />
            <stop offset="20%" stopColor="#DBA514" />
            <stop offset="50%" stopColor="#FBDF93" />
            <stop offset="80%" stopColor="#DBA514" />
            <stop offset="100%" stopColor="#FFF4D0" />
          </linearGradient>
          
          <linearGradient id="redGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#BE123C" />
            <stop offset="100%" stopColor="#881337" />
          </linearGradient>

          <linearGradient id="ribbonDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9F1239" />
            <stop offset="100%" stopColor="#701026" />
          </linearGradient>
          
          <filter id="innerShadow">
            <feOffset dx="0" dy="2" />
            <feGaussianBlur stdDeviation="1" result="blur" />
            <feComposite operator="out" in="SourceGraphic" in2="blur" result="inverse" />
            <feFlood floodColor="black" floodOpacity="0.3" result="color" />
            <feComposite operator="in" in="color" in2="inverse" result="shadow" />
            <feComposite operator="over" in="shadow" in2="SourceGraphic" />
          </filter>
        </defs>

        {/* Ribbons - Perfectly centered under the medal */}
        <g transform="translate(50, 60)">
          {/* Left Ribbon */}
          <path 
            d="M-15 0 L-35 50 L-20 42 L-5 50 L-10 0" 
            fill="url(#redGradient)" 
            transform="rotate(-15)"
            stroke="#9F1239"
            strokeWidth="0.5"
          />
          {/* Right Ribbon */}
          <path 
            d="M15 0 L35 50 L20 42 L5 50 L10 0" 
            fill="url(#redGradient)" 
            transform="rotate(15)"
            stroke="#9F1239"
            strokeWidth="0.5"
          />
        </g>

        {/* Main Medal */}
        <g transform="translate(50, 45)">
          {/* Jagged Seal Edges */}
          <path
            d="M0 -45 L5 -35 L12 -42 L16 -32 L27 -38 L28 -27 L39 -30 L36 -19 L45 -18 L39 -8 L45 0 L36 8 L40 18 L30 19 L28 30 L18 28 L15 39 L5 32 L0 42 L-5 32 L-15 39 L-18 28 L-28 30 L-30 19 L-40 18 L-36 8 L-45 0 L-39 -8 L-45 -18 L-36 -19 L-39 -30 L-28 -27 L-27 -38 L-16 -32 L-12 -42 L-5 -35 Z"
            fill="url(#goldGradient)"
            stroke="#B48608"
            strokeWidth="0.5"
          />
          
          {/* Outer Circle */}
          <circle r="36" fill="url(#goldGradient)" />
          
          {/* Red Inner Circle */}
          <circle r="32" fill="url(#redGradient)" filter="url(#innerShadow)" stroke="#B48608" strokeWidth="1" />
          
          {/* Decorative Dotted Ring */}
          <circle r="28" fill="none" stroke="rgba(251, 223, 147, 0.3)" strokeWidth="0.5" strokeDasharray="1 1" />

          {/* Stars Arched at Top */}
          {[0, 1, 2, 3, 4].map((i) => {
            const angle = (i * 24 - 48) * (Math.PI / 180);
            const r = 24;
            const sx = Math.sin(angle) * r;
            const sy = -Math.cos(angle) * r - 2;
            return (
              <path
                key={i}
                d="M0 -4 L1.2 -1 L4.5 -1 L2 1 L3 4.5 L0 2.5 L-3 4.5 L-2 1 L-4.5 -1 L-1.2 -1 Z"
                fill="#FFF4D0"
                transform={`translate(${sx}, ${sy}) scale(0.6)`}
              />
            );
          })}

          {/* Percentage Text */}
          <g transform="translate(0, 4)">
            <text
              fill="white"
              fontSize="24"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              className="drop-shadow-md"
            >
              {percentage}<tspan fontSize="12" dy="-8">%</tspan>
            </text>
            
            {/* Divider */}
            <line x1="-12" y1="4" x2="12" y2="4" stroke="white" strokeWidth="0.5" strokeOpacity="0.5" />
            
            {/* Label */}
            <text
              y="11"
              fill="#FBDF93"
              fontSize="6"
              fontWeight="900"
              fontFamily="sans-serif"
              textAnchor="middle"
              letterSpacing="2"
              className="uppercase"
            >
              Offert
            </text>
          </g>
        </g>
        
        {/* Shine Overlay */}
        <circle cx="50" cy="45" r="32" fill="url(#shineGradient)" pointerEvents="none" />
        <defs>
          <linearGradient id="shineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
            <stop offset="50%" stopColor="white" stopOpacity="0" />
            <stop offset="100%" stopColor="white" stopOpacity="0.05" />
          </linearGradient>
        </defs>
      </svg>
    </motion.div>
  );
};

export default DiscountBadge;
