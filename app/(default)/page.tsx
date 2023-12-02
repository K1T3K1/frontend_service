"use client";

import Hero from "@/components/hero";
import Features from "@/components/features";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");

      if (token) {
        window.location.href = "/dashboard";
      }
    }
  }, []);
  return (
    <>
      <Hero />
      <Features />
    </>
  );
}
