'use client'
import { useEffect } from 'react';
import { getAuth } from "firebase/auth";
import { FirebaseSetup } from "@/services/authService";

export default function Dashboard() {
  return (
    <main>
      <h2>Welcome to Dashboard</h2>
      {/* Rest of your component */}
    </main>
  );
}
