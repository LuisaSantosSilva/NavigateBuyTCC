import React from "react";
import { motion } from "framer-motion";
import { useInView } from 'react-intersection-observer';

interface LogoAnimationProps {
    children: React.ReactNode;
    initial?: object;
    animate?: object;
    transition?: object;
}

const LogoAnimation: React.FC<LogoAnimationProps> = ({ children, initial, animate, transition }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    return (
        <motion.div
            ref={ref}
            initial={initial}
            animate={inView ? animate : initial}
            transition={transition}
            style={{ position: 'relative', display: 'inline-block' }}
        >
            {children}
        </motion.div>
    );
};

export default LogoAnimation;
