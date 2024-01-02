"use client";
import "./globals.css";
import "./data-tables-css.css";
import "./satoshi.css";
import { useState, useEffect, useContext } from "react";
import Loader from "@/components/common/Loader";
import { SuccessMessageProvider, useSuccessMessageContext } from '../components/SuccessMessageContext';
import NotificationToast from "@/components/notificationToast";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Toaster } from "react-hot-toast";
import { usePathname } from "next/navigation";
import { currentUser } from "@/services/authService";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const { setSuccessMessage } = useSuccessMessageContext();
  const [loggedIn, setLoggedin] = useState(false);


  useEffect(() => {
    
    setTimeout(() => setLoading(false), 1000);
  }, []);



  return (
    <SuccessMessageProvider>
      <html lang="en">
        <body suppressHydrationWarning={true}>
          <div className="dark:bg-boxdark-2 dark:text-bodydark">
            {loading ? (
              <Loader />
            ) : (
              <>
                {children && (
                  <div className="flex h-screen overflow-hidden">
                    {/* Sidebar */}
                    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                    {/* Content Area */}
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                      {/* Header */}
                      <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                      {/* Main Content */}
                      <main>
                        {/* NotificationToast */}
                        <Toaster
                          position="top-right"
                          reverseOrder={false}
                        />
                        <NotificationToast />
                        <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                          {children}
                        </div>
                      </main>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </body>
      </html>
    </SuccessMessageProvider>
  );
}
