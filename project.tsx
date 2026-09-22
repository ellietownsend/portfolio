import React from 'react';

function Project({imagePath, imageLogoPath, projectName, gitHubLink, linkedIn}: {imagePath: string, imageLogoPath: string, projectName: string, gitHubLink: string, linkedIn: string}) {
    return (
         <div className="w-100 max-w-4xl mx-auto bg-[#DAEDBD] rounded-xl p-6 shadow-2xl">

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