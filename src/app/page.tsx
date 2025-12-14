"use client";

import { useEffect } from "react";
import Image from "next/image";
import dbConnection from './db';
import Homepage from "@/components/Homepage";

export default function Home() {
  return <Homepage />;
  
}
