import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface AnimatedProps {
  children: React.ReactNode;
  initial?: object;
  animate?: object;
  transition?: object;
}

const Animated: React.FC<AnimatedProps> = ({
  children,
  initial = { opacity: 0, y: 50 },
  animate = { opacity: 1, y: 0 },
  transition = { duration: 1 }
}) => {
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
    >
      {children}
    </motion.div>
  );
};

export default Animated;