"use client"
import { useRouter } from "next/router";
import React, { useEffect } from "react";

export const LoadingScreen: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        // push the user to the destination page after 2 seconds
        const timer = setTimeout(() => {
            router.push(router.query.destination as string || '/');
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="loading-screen">
            <img src="/public/images/rocketLoading.gif"></img>
        </div>
    )
}