import React, { useState } from 'react';
import { useEffect } from "react";


type RGB = {
  r: number;
  g: number;
  b: number;
};

function getLogoColor(
  image: HTMLImageElement,
): RGB {
  const canvas = document.createElement("canvas");

  try {
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Could not create canvas context");
    }

    // Resize img before processing
    const maxSize = 100;
    const scale = Math.min(
      1,
      maxSize / Math.max(image.naturalWidth, image.naturalHeight),
    );

    canvas.width = Math.max(1, Math.floor(image.naturalWidth * scale));
    canvas.height = Math.max(1, Math.floor(image.naturalHeight * scale));

    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

    const color: RGB = { r: 0, g: 0, b: 0 };

    let count = 0; // amount of pixels included

  for (let i = 0; i < data.length; i += 4) {
  const alpha = data[i + 3];
  if (alpha === 0) continue;

  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];

  // Skip near-black and near-white pixels
  const brightness = (r * 299 + g * 587 + b * 114) / 1000; 
  const BLACK_THRESHOLD = 30;   
  const WHITE_THRESHOLD = 225; 

  if (brightness < BLACK_THRESHOLD || brightness > WHITE_THRESHOLD) continue;

    color.r += r;
    color.g += g;
    color.b += b;
    count++;
  }

  if (count > 0) {
  color.r = Math.round(color.r / count);
  color.g = Math.round(color.g / count);
  color.b = Math.round(color.b / count);
  }

  console.log("Extracted color:", color);
  return color;
  } catch (error) {
    console.error("Caught error creating canvas context:", error);
    console.log("Extracted color:", { r: 0, g: 0, b: 0 });
    return { r: 0, g: 0, b: 0 };
  }
}

const rgbToHex = (r:number, g:number, b:number) => 
  '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('');

interface ProjectProps {
  imagePath: string;
  imageLogoPath: string;
  projectName: string;
  gitHubLink: string;
  linkedIn: string;
}

function Project({imagePath, imageLogoPath, projectName, gitHubLink, linkedIn}: ProjectProps) {
  const [bgColor, setBgColor] = useState(rgbToHex(0, 0, 0));

  useEffect(() => {
    const image = new Image();

    image.crossOrigin = "anonymous";

    image.onload = () => {
      try {
        
        const color = getLogoColor(image);
        setBgColor(rgbToHex(color.r, color.g, color.b));

      } catch (error) {
        console.error("Could not extract color palette:", error);
      }
    };

    image.onerror = () => {
      console.error("Could not load image:", imageLogoPath);
    };

    image.src = imageLogoPath;
  }, []);

  
    return (
         <div className={`w-100 max-w-4xl mx-auto rounded-xl p-6 shadow-2xl"`}
         style={{ backgroundColor: bgColor }}
         >
      

  {/* Title + Logo */}
  <div className="flex items-center justify-center gap-2  mb-6 font-mono">
    <img
      src={imageLogoPath}
      alt={`${projectName} logo`}   
      className="w-6 h-6 object-contain"
    />

    <p className="text-2xl font-extrabold text-[#E5563D] text-shadow-xs">
      {projectName}
    </p>
  </div>

  {/* Picture */}
  <div className="w-full h-full rounded-lg overflow-hidden flex items-center justify-center">
    <img
      src={imagePath}
      alt={`${projectName} computer screen`}
      className="w-90 h-60"
    />
  </div>

</div>
    )
}

export default Project;
