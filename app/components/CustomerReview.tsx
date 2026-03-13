import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import TestimonialCard from './Cards/TestimonialCard';
import {Button} from './ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {testimonialsByProduct} from '~/data/testimonials';

interface CustomerReviewProps {
  productHandle: string;
}

export function CustomerReview({productHandle}: CustomerReviewProps) {
  // Get testimonials for this product, fallback to default
  const testimonials =
    testimonialsByProduct[productHandle] || testimonialsByProduct.default;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    const newIndex =
      (currentIndex + newDirection + testimonials.length) %
      testimonials.length;
    setDirection(newDirection);
    setCurrentIndex(newIndex);
  };

  // Don't show carousel controls if only one testimonial
  const showControls = testimonials.length > 1;

  return (
    <div className="pt-6 border-t border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground">
          Customer Reviews
        </h2>
        {showControls && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => paginate(-1)}
              aria-label="Previous review"
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
            </Button>
            <span className="text-xs text-muted-foreground">
              {currentIndex + 1} / {testimonials.length}
            </span>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => paginate(1)}
              aria-label="Next review"
              className="text-muted-foreground hover:text-foreground"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: {type: 'spring', stiffness: 300, damping: 30},
              opacity: {duration: 0.2},
            }}
            drag={showControls ? 'x' : false}
            dragConstraints={{left: 0, right: 0}}
            dragElastic={1}
            onDragEnd={(e, {offset, velocity}) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
          >
            <TestimonialCard {...testimonials[currentIndex]} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dot Indicators */}
      {showControls && (
        <div className="flex justify-center gap-1.5 mt-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'w-6 bg-primary'
                  : 'w-1.5 bg-muted hover:bg-muted-foreground/50'
              }`}
              aria-label={`View review ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
