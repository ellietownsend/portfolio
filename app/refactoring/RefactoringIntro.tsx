'use client'
import { useRouter } from 'next/router'
import { useState } from "react";
import styles from "./Refactor.module.css"

export default function RefactoringIntro() {
  const [finished, setFinished] = useState(false);
  if (finished) {
    return null;
  }
  
  return (
      <div 
        className="flex box-content min-h-screen bg-[#0A1118ff] flex-col items-center justify-center "
        onAnimationEnd={() => setFinished(true)}
      >
        <h1 className={styles.starWarsScrollIntro}>
          A long time ago in a galaxy far,
          <br /> far away....
        </h1>

      </div>
  );
}
