import {useEffect, useState} from 'react';
import {motion} from 'framer-motion';
import {ShoppingBag} from 'lucide-react';

interface AnimatedCartIconProps {
  className?: string;
  size?: number;
}

export function AnimatedCartIcon({className, size}: AnimatedCartIconProps) {
  const [shouldShake, setShouldShake] = useState(false);

  useEffect(() => {
    // Initial shake after 4 seconds
    const initialTimeout = setTimeout(() => {
      setShouldShake(true);
    }, 4000);

    // Repeat shake every 4 seconds after the first one
    const interval = setInterval(() => {
      setShouldShake(true);
    }, 4000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const shakeVariants = {
    shake: {
      x: [0, -3, 3, -3, 3, 0],
      rotate: [0, -5, 5, -5, 5, 0],
      transition: {
        duration: 0.5,
        ease: 'easeInOut',
      },
    },
    idle: {
      x: 0,
      rotate: 0,
    },
  };

  return (
    <motion.div
      variants={shakeVariants}
      animate={shouldShake ? 'shake' : 'idle'}
      onAnimationComplete={() => setShouldShake(false)}
      className="inline-flex"
    >
      <ShoppingBag className={className} size={size} />
    </motion.div>
  );
}
