'use client';
import styles from "./Refactor.module.css"
import { useEffect } from 'react';

export default function RefactoringIntro() {
  
  
  
  return (
      <div className="flex box-content min-h-screen bg-[#0A1118ff] flex-col items-center justify-center ">
        <h1 className={styles.starWarsScrollIntro}>
          A long time ago in a galaxy far,
          <br /> far away....
        </h1>

      </div>
  );
}
