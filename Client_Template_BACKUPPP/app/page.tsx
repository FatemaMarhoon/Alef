'use client'
import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Login from '@/app/login/page'
import Dashboard from "./dashboard/page";
export const metadata: Metadata = {
  title: "TailAdmin | Next.js E-commerce Dashboard Template",
  description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
       let loggedin = localStorage.getItem("currentUser")
  return (
    <>
      {!loggedin && <Login></Login>}
      {loggedin && <Dashboard></Dashboard>}
    </>
  )
}
