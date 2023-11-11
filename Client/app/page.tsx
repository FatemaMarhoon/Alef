'use client'
import { Metadata } from "next";
import Login from '@/app/login/page'
import Dashboard from "./dashboard/page";
import { useRouter } from 'next/navigation'

// export const metadata: Metadata = {
//   title: "TailAdmin | Next.js E-commerce Dashboard Template",
//   description: "This is Home Blog page for TailAdmin Next.js",
//   // other metadata
// };

export default function Home() {
  let loggedin = localStorage.getItem("currentUser")
  const router = useRouter();
  if (loggedin) {
    return (<> <Dashboard></Dashboard> </>)
  }
  else {
    router.push('/login')
  }

}
