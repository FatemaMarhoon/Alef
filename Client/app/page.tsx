'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Login from '@/app/login/page'
import Dashboard from "./dashboard/page";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/navigation";
import { currentUser } from "@/services/authService";

export default function Home() {
  const router = useRouter();
  const user = currentUser();
 
  
}
