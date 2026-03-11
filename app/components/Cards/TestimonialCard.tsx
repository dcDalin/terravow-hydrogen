import {useState} from 'react';
import {Star, Quote, BadgeCheck} from 'lucide-react';
import {Card} from '../ui/card';
import {cn} from '~/lib/utils';
import {motion} from 'framer-motion';

const HalfStar = ({fill = 'full'}) => (
  <span className="relative inline-flex w-3 h-3">
    <Star size={12} className="text-gray-300 fill-gray-200 absolute inset-0" />
    {fill === 'full' && (
      <Star
        size={12}
        className="text-yellow-500 fill-yellow-500 absolute inset-0"
      />
    )}
    {fill === 'half' && (
      <span className="absolute inset-0 overflow-hidden w-[50%]">
        <Star size={12} className="text-yellow-500 fill-yellow-500" />
      </span>
    )}
  </span>
);

const StarRating = ({rating}: {rating: number}) => {
  const clamped = Math.min(5, Math.max(0, rating));
  return (
    <div
      className="flex items-center gap-0.5"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({length: 5}).map((_, i) => {
        const diff = clamped - i;
        const fill = diff >= 1 ? 'full' : diff >= 0.25 ? 'half' : 'empty';
        return <HalfStar key={i} fill={fill} />;
      })}
      <span className="ml-1.5 text-[0.65rem] text-muted-foreground font-serif italic">
        {rating.toFixed(1)}
      </span>
    </div>
  );
};

interface TestimonialCardProps {
  imageUrl?: string;
  name?: string;
  starRating?: number;
  review?: string;
}

const TestimonialCard = ({
  imageUrl = 'https://i.pravatar.cc/150?img=47',
  name = 'Isabelle Fontaine',
  starRating = 4.3,
  review = "Absolutely divine. The texture is unlike anything I've ever tried — my skin has never felt more luminous. Worth every penny.",
}: TestimonialCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.6, ease: 'easeOut'}}
    >
      <motion.div
        animate={{
          y: hovered ? -4 : 0,
          scale: hovered ? 1.01 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 18,
        }}
      >
        <Card
          className={cn(
            'relative overflow-hidden w-full p-4 rounded-xl border border-border bg-card cursor-default select-none',
          )}
        >
          {/* Top Accent Line */}
          <motion.div
            className="absolute top-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-40"
            animate={{opacity: hovered ? 0.9 : 0.4}}
            transition={{duration: 0.4}}
          />

          {/* Quote Icon */}
          <motion.div
            className="w-9 h-9 rounded-full bg-primary flex items-center justify-center mb-4"
            animate={{
              scale: hovered ? 1.05 : 1,
              opacity: hovered ? 1 : 0.9,
            }}
            transition={{duration: 0.3}}
          >
            <Quote size={16} className="text-primary-foreground fill-current" />
          </motion.div>

          {/* Review Text */}
          <motion.p
            className="text-sm leading-relaxed text-foreground italic mb-4"
            animate={{opacity: hovered ? 1 : 0.92}}
            transition={{duration: 0.3}}
          >
            &ldquo;{review}&rdquo;
          </motion.p>

          {/* Divider */}
          <div className="h-px bg-linear-to-r from-transparent via-border to-transparent mb-4" />

          {/* Author Info */}
          <motion.div
            className="flex items-center gap-3"
            animate={{y: hovered ? -1 : 0}}
            transition={{duration: 0.3}}
          >
            <div className="relative shrink-0">
              <motion.div
                className="w-12 h-12 rounded-full p-0.5 bg-linear-to-br from-primary to-primary/70"
                animate={{scale: hovered ? 1.05 : 1}}
                transition={{duration: 0.35}}
              >
                <img
                  src={imageUrl}
                  alt={name}
                  className="w-full h-full rounded-full object-cover block"
                />
              </motion.div>

              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-card flex items-center justify-center">
                <BadgeCheck size={8} className="text-white" />
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground tracking-wide truncate mb-1">
                {name}
              </p>
              <StarRating rating={starRating} />
            </div>

            <span className="text-[0.6rem] tracking-widest uppercase text-muted-foreground self-end pb-0.5">
              Verified
            </span>
          </motion.div>

          {/* Bottom Accent */}
          <motion.div
            className="absolute bottom-0 left-[10%] right-[10%] h-px bg-linear-to-r from-transparent via-primary to-transparent opacity-40"
            animate={{opacity: hovered ? 0.9 : 0.4}}
            transition={{duration: 0.4}}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
