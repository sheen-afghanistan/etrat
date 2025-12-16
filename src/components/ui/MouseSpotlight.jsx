"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export const MouseSpotlight = () => {
    const [isActive, setIsActive] = useState(false);

    // Use MotionValues for high-performance animation
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth springs to reduce jitter - a bit looser for that "floating" feel
    const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
    const smoothX = useSpring(mouseX, springConfig);
    const smoothY = useSpring(mouseY, springConfig);

    useEffect(() => {
        const updateMousePosition = (e) => {
            if (!isActive) setIsActive(true);
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener("mousemove", updateMousePosition);
        return () => {
            window.removeEventListener("mousemove", updateMousePosition);
        };
    }, [isActive, mouseX, mouseY]);

    if (!isActive) return null;

    return (
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Consistent Blue Glow - Simple & Elegant */}
            <motion.div
                className="absolute w-[600px] h-[600px] rounded-full blur-[100px] opacity-15 dark:opacity-10 bg-primary"
                style={{
                    left: smoothX,
                    top: smoothY,
                    x: "-50%",
                    y: "-50%",
                }}
            />
        </div>
    );
};
