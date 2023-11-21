'use client'
import { useEffect, useState } from 'react';
import { User, getAuth } from "firebase/auth";
import { currentUser } from "@/services/authService";

export default function Dashboard() {

  const [username, setUsername] = useState("");

useEffect(() => {
  const loadCurrentUser = async () => {
    try {
      const user = await currentUser();
      if (user) {
        setUsername(user?.email ? user.email : "")
        console.log("ACCESSSEEEEDDD");
      } else {
        console.log("CANTTT");
      }
    } catch (error) {
      console.error('Error fetching current user:', error);
    }
  };

  loadCurrentUser();
}, []);

  
  return (
    <main>
      <h2>Welcome to Dashboard {username}</h2>

      {/* Rest of your component */}
    </main>
  );
}
