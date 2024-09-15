"use client"
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import "./loading.css";

const LoadingScreen: React.FC = () => {
    const router = useRouter();

   /**  useEffect(() => {
        // push the user to the destination page after 2 seconds
        const timer = setTimeout(() => {
            router.push(router.query.destination as string || '/');
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);
   */
    return (
        <div className="loading-screen">
            <img src="/images/rocketLoading.gif"></img>
        </div>
    )
}

export default LoadingScreen;