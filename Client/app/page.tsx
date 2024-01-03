'use client'
import Dashboard from "./dashboard/page";
import { useRouter } from 'next/navigation'
import { currentUser } from "@/services/authService";
import { useEffect, useState } from "react";
import Router from "next/router";
// import RootLayout from "./plans/layout";
import EmptyLayout from "./login/layout"
import SubscriptionPlansPage from "./plans/page";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    async function checkLogin() {
      if (await currentUser()) {
        // setLoggedIn(true);
        window.location.assign('/dashboard')
      }
      else {
        window.location.assign('/plans')
      }
    }

    checkLogin();
  }, []);
  return (
    <><EmptyLayout children={undefined}></EmptyLayout></>
  );
}
