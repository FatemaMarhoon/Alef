'use client'
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { FirebaseSetup } from "@/services/authService";
import { UserSingleton } from '@/services/singleton';

export default function Dashboard() {
  const userName = UserSingleton.getInstance().getToken()
  return (
    <main>
      <h2>Welcome to Dashboard {userName}</h2>

      {/* Rest of your component */}
    </main>
  );
}
