'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Login from '@/app/login/page'
import Dashboard from "./dashboard/page";
import { FirebaseSetup, auth } from "@/services/authService";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/navigation";
export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  const router = useRouter();
  // const [auth, setAuth] =useState(false);
  useEffect(() => {
    const initializeFirebase = async () => {
      const user = auth?.currentUser;

      console.log('whos logged in?', user);
      if (user != null) {
        router.push("auth/signin")
      }
      else {
        router.push("/dashboard")
      }
    };
    initializeFirebase();
  }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

  //  let loggedin = localStorage.getItem("currentUser")
  // return (
  //   <>
  //     {!loggedin && <Login></Login>}
  //     {loggedin && <Dashboard></Dashboard>}
  //   </>
  // )
}
