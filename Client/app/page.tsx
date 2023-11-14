'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Login from '@/app/login/page'
import Dashboard from "./dashboard/page";
import { FirebaseSetup, auth } from "@/services/authService";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/navigation";
import { UserSingleton } from "@/services/singleton";

export default function Home() {

  useEffect(() => {
    const user = UserSingleton.getInstance().getUser();
    if (user) {
      console.log("User found in singleton:", user);
    }
  }, []);
  
  // const router = useRouter();
  // // const [auth, setAuth] =useState(false);
  // useEffect(() => {
  //   const onLoad = async () => {
  //     // const user = auth?.currentUser;
  //     const user = UserSingleton.getInstance().getUser();

  //     console.log('whos logged in?', user);
  //     if (user) {
  //       router.push("auth/signin")
  //     }
  //     else {
  //       return ( 
  //         <><Dashboard></Dashboard></>
  //       )
  //     }
  //   };
  //   onLoad();
  // }, []); // The empty dependency array ensures that this effect runs only once when the component mounts
}
