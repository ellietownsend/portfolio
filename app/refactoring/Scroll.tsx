'use client'
import { useState } from "react";
import styles from "./Refactor.module.css";
import Starfield from "./StarField";

export default function Scroll() {

  return (
    <>
      <div className="fixed inset-0 z-0">
        <Starfield />
      </div>

      <div
        className="relative z-10 font-sans font-bold text-[#F5CA43ff] text-4xl p-1.5 px-6 sm:px-10 md:px-16 leading-relaxed flex box-content min-h-screen flex-col items-center justify-center"
      >
        <h1 className={styles.starWarsScroll}>
         test
        </h1>
      </div>
    </>
  );
}
