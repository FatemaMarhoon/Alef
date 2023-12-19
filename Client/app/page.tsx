'use client'
import Dashboard from "./dashboard/page";
import { useRouter } from 'next/navigation'
import { currentUser } from "@/services/authService";
import { useEffect, useState } from "react";

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
    <>{loggedIn &&
      <Dashboard>
      </Dashboard>
    }
    </>

  );
}
