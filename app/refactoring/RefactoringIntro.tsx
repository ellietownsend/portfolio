'use client'
import { useState } from "react";
import styles from "./Refactor.module.css"

export default function RefactoringIntro() {
  const [finished, setFinished] = useState(false);
  if (finished) {
    return null;
  }
  
  return (
      <div 
        className="font-sans font-bold text-[#309BADff]  text-4xl p-1.5 px-6 sm:px-10 md:px-16  leading-relaxed flex box-content min-h-screen bg-[#0A1118ff] flex-col items-center justify-center "
        onAnimationEnd={() => setFinished(true)}
      >
        <h1 className={styles.starWarsIntro}>
          A long time ago in a galaxy far,
          <br /> far away....
        </h1>

      </div>
  );
}
