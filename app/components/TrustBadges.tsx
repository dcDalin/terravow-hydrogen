import {motion} from 'framer-motion';
import {Shield, Truck, RotateCcw, Award, Lock} from 'lucide-react';

const badges = [
  {
    icon: Shield,
    title: '90-Day Guarantee',
    description: 'Money-back if not satisfied',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'On orders over $75',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'GMP certified facility',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: '256-bit SSL encryption',
  },
];

export function TrustBadges() {
  return (
    <div className="border-y border-border bg-muted/30 py-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge, index) => (
          <motion.div
            key={badge.title}
            initial={{opacity: 0, y: 10}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.4, delay: index * 0.1, ease: 'easeOut'}}
            className="flex flex-col items-center text-center gap-2"
          >
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <badge.icon className="text-primary" size={20} />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {badge.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {badge.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
