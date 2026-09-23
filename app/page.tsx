'use client';
import Project from "./_components/project";



export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans">
      <h1>Welcome to Ellie's Portfolio</h1>
      <Project
        imagePath="/girls-who-math-dashboard.png"
        imageLogoPath="/db-logo.png"
        projectName="Daily Bruin"
        gitHubLink="https://github.com/dailybruin/buzz"
        linkedIn="https://www.linkedin.com/in/ellietownsend"
      />
    </div>
  );
}
