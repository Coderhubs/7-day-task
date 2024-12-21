import React from 'react';
import { Button } from './ui/Button';
import { Card, CardContent } from './ui/card';
import Image from 'next/image';
import Car from "../../../public/images/car.png"
import Car2 from "../../../public/images/image8.png"

// First Card with Circle Gradients and Content
const circles = [
  { size: 60, top: 368, left: 367 },
  { size: 170, top: 313, left: 312 },
  { size: 295, top: 250, left: 250 },
  { size: 420, top: 188, left: 187 },
  { size: 545, top: 125, left: 125 },
  { size: 670, top: 63, left: 62 },
  { size: 795, top: 0, left: 0 },
];

// Card with Aspect Ratio and Gradient Background (Left Card)
const GradientCard = () => (
  <Card className="w-[320px] h-[180px] sm:w-[640px] sm:h-[360px] mx-auto my-5 sm:mx-5 sm:my-10 bg-blue-500 border-none relative overflow-hidden">
    <CardContent className="relative w-[387.5px] h-[387.5px] sm:w-[775px] sm:h-[775px] -top-[41.5px] sm:-top-[83px] -left-[78.5px] sm:-left-[157px] p-0 scale-50 sm:scale-100 origin-top-left">
      <div className="relative w-[795px] h-[795px] -top-2.5 -left-2.5">
        {circles.map((circle, index) => (
          <div
            key={index}
            className="absolute border-[20px] border-[#ffffff0f]"
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              top: `${circle.top}px`,
              left: `${circle.left}px`,
              borderRadius: `${circle.size / 2}px`,
            }}
          />
        ))}
        <Image
          className="absolute w-[406px] h-[116px] top-[327px] left-[304px]"
          alt="Rental Car"
          src={Car}
          width={340}
          height={108}
        />
      </div>
      <div className="absolute top-[107px] left-[181px] flex flex-col items-start gap-5">
        <div className="flex flex-col items-start gap-4">
          <h1 className="w-[272px] font-semibold text-[32px] tracking-tight leading-tight text-[#FFFFFF]">
            The Best Platform for Car Rental
          </h1>
          <p className="w-[284px] font-medium text-[16px] text-[#FFFFFF]">
            Ease of doing a car rental safely and reliably. Of course, at a low price.
          </p>
          <Button className="w-[120px] h-11 bg-blue-600 font-semibold text-[16px] text-white">
            Rental Car
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

// Second Card with SVG Gradient Background
const CustomCard = () => {
  const svgGradient = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="75" height="120" viewBox="0 0 75 120" fill="none">
      <path d="M25 60L0 0H25H50L75 60L50 120H25H0L25 60Z" fill="white" fill-opacity="0.06"/>
    </svg>
  `);

  return (
    <Card className="w-[320px] h-[180px] sm:w-[640px] sm:h-[360px] mx-auto my-5 sm:mx-5 sm:my-10 bg-blue-500 relative border-none overflow-hidden">
      <CardContent className="relative w-[387.5px] h-[387.5px] sm:w-[775px] sm:h-[775px] -top-[41.5px] sm:-top-[83px] -left-[78.5px] sm:-left-[157px] p-0 scale-50 sm:scale-100 origin-top-left">
        {/* SVG Gradient Background repeated */}
        <div
          className="absolute inset-0"
          style={{
            background: `url('data:image/svg+xml,${svgGradient}')`,
            backgroundSize: '75px 120px',
            backgroundPosition: '0 0',
            backgroundRepeat: 'repeat',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
          }}
        ></div>

        {/* Image and other content */}
        <div className="relative w-[795px] h-[795px] -top-2.5 -left-2.5">
          <Image
          
            alt="Custom Car"
            src={Car2}
            width={340}
            height={108}
              className="absolute w-[406px] h-[116px] top-[327px] left-[304px]"
          />
        </div>

        <div className="absolute top-[107px] left-[181px] flex flex-col items-start gap-5">
          <div className="flex flex-col items-start gap-4">
            <h1 className="w-[272px] font-semibold text-[32px] tracking-tight leading-tight text-[#FFFFFF]">
              Easy way to rent a car at a low price
            </h1>
            <p className="w-[284px] font-medium text-[16px] text-[rgb(255,255,255)]">
              Providing cheap car rental services and safe and comfortable facilities.
            </p>
            <Button className="w-[120px] h-11 bg-blue-600 font-semibold text-[16px] text-white">
              Rental Car
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Component to Render Both Cards
export default function Ads(): JSX.Element {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:items-start gap-4 p-4">
      {/* Left Card with Gradient */}
      <GradientCard />
      {/* Right Customizable Card with SVG Gradient */}
      <CustomCard />
    </div>
  );
}

