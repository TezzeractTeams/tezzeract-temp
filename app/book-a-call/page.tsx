"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Cal, { getCalApi } from "@calcom/embed-react";
import Footer from "../components/Footer";

export default function BookACallPage() {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({});
            cal("ui", {
                theme: "light",
                styles: { branding: { brandColor: "#0068B5" } },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return (
        <><div className="flex flex-col lg:flex-row h-screen w-full overflow-hidden bg-white">
            {/* Left Content Area - Approx 60% on desktop */}
            <div className="w-full lg:w-[60%] h-full overflow-y-auto px-6 py-12 md:px-16 md:py-20 lg:px-24 lg:py-24 flex flex-col bg-white lg:rounded-r-[48px] rounded-b-[40px] z-20 shadow-2xl">
                <div className="max-w-3xl w-full mx-auto lg:mx-0">
                    <Link href="/">
                        <Image
                            src="/tezzeractLogo.svg"
                            alt="Tezzeract Logo"
                            width={160}
                            height={45}
                            className="mb-14" />
                    </Link>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-light text-[#1A1A1A] mb-14 leading-tighter tracking-tight">
                        Take the first step <br />
                        to your <span className="text-[#0068B5] font-light">Dream <br />Team.</span>
                    </h1>

                    <div className="bg-white rounded-[32px] border border-[#EEEEEE] shadow-sm p-4 md:p-6 mb-24">
                        <Cal
                            calLink="shanilka-rajapaksha-b5mqme/30min"
                            style={{ width: "100%", height: "100%", minHeight: "500px" }}
                            config={{ layout: "month_view", theme: "light" }} />
                    </div>
                </div>
            </div>

            {/* Right Image Area - Approx 40% on desktop, overlapping slightly */}
            <div className="hidden lg:block w-[45%] h-full relative lg:-ml-16 z-10">
                <Image
                    src="/bookingimage.svg"
                    alt="Background Pattern"
                    fill
                    className="object-cover"
                    priority />
            </div>

        </div><Footer /></>
    );
}
