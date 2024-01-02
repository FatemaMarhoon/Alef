'use client'
import Dashboard from "./dashboard/page";
import { useRouter } from 'next/navigation'
import { currentUser } from "@/services/authService";
import { useEffect, useState } from "react";
import Router from "next/router";
import RootLayout from "./plans/layout";
import Layout from "./layout"
import SubscriptionPlansPage from "./plans/page";

export default function Home() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    async function checkLogin() {
      if (await currentUser()) {
        setLoggedIn(true);
      }
      else {
        router.push('/plans')
      }
    }

    checkLogin();
  }, []);

  return (
    <>
      {/* {!loggedIn &&
        <><RootLayout><SubscriptionPlansPage></SubscriptionPlansPage></RootLayout></>
      } */}
      <Dashboard>
      </Dashboard>

    </>

  );
}
