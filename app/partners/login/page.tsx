"use client";

import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PartnerLoginForm from "@/components/features/partners/PartnerLoginForm";

export default function PartnerLoginPage() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col font-sans">
            <Header />
            <main className="flex-grow flex items-center justify-center px-4 pt-20">
                <PartnerLoginForm />
            </main>
            <Footer />
        </div>
    );
}
