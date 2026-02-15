"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Disable scrolling when preloader is active
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setLoading(false);
            document.body.style.overflow = "auto";
        }, 2000); // 2 seconds duration

        return () => {
            document.body.style.overflow = "auto";
            clearTimeout(timer);
        };
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                >
                    <div className="relative flex flex-col items-center gap-4">
                    <Image src='/TezzeractGradient.svg' alt="Tezzeract logo" width={80} height={80} />
                        <div className="w-24 md:w-32 h-[1px] bg-gray-100 relative overflow-hidden">
                            <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 1.5,
                                    ease: "easeInOut",
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-[#00A9EE] to-[#00378A]"
                            />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
