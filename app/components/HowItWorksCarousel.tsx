import {useEffect} from 'react';
import {motion} from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '~/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface HowItWorksSlide {
  id: string;
  image: string;
  title: string;
  description: string;
  step: number;
}

// Placeholder data - replace with actual content
const slides: HowItWorksSlide[] = [
  {
    id: '1',
    step: 1,
    image: 'https://placehold.co/600x400/e0f2e9/2d5f3f?text=Step+1',
    title: 'Choose Your Product',
    description: 'Select from our range of sustainable, eco-friendly products.',
  },
  {
    id: '2',
    step: 2,
    image: 'https://placehold.co/600x400/e0f2e9/2d5f3f?text=Step+2',
    title: 'Place Your Order',
    description: 'Quick and secure checkout process with multiple payment options.',
  },
  {
    id: '3',
    step: 3,
    image: 'https://placehold.co/600x400/e0f2e9/2d5f3f?text=Step+3',
    title: 'We Ship Fast',
    description: 'Carbon-neutral shipping to your doorstep within days.',
  },
  {
    id: '4',
    step: 4,
    image: 'https://placehold.co/600x400/e0f2e9/2d5f3f?text=Step+4',
    title: 'Enjoy & Reorder',
    description: 'Love your purchase and easily reorder when you need more.',
  },
];

export function HowItWorksCarousel() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-green-50/30">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-50px'}}
          transition={{duration: 0.6, ease: 'easeOut'}}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-primary text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simple steps to start your sustainable journey
          </p>
        </motion.div>

        <motion.div
          initial={{opacity: 0, y: 30}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, margin: '-50px'}}
          transition={{duration: 0.6, delay: 0.2, ease: 'easeOut'}}
        >
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              slidesToScroll: 1,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {slides.map((slide, index) => (
                <CarouselItem
                  key={slide.id}
                  className="pl-2 md:pl-4 basis-full md:basis-1/3"
                >
                  <motion.div
                    initial={{opacity: 0, scale: 0.95}}
                    whileInView={{opacity: 1, scale: 1}}
                    viewport={{once: true}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1,
                      ease: 'easeOut',
                    }}
                    className="h-full"
                  >
                    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 h-full border border-green-100">
                      {/* Step number badge */}
                      <div className="relative">
                        <div className="absolute top-4 left-4 z-10">
                          <div className="bg-primary text-primary-foreground w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-lg">
                            {slide.step}
                          </div>
                        </div>
                        <div className="aspect-[3/2] overflow-hidden bg-green-50">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        <h3 className="text-xl font-bold font-primary text-foreground mb-2">
                          {slide.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {slide.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>

            {/* Navigation Arrows */}
            <CarouselPrevious
              className="hidden md:flex -left-4 lg:-left-6 bg-white hover:bg-green-50 border-green-200 text-primary hover:text-primary shadow-lg"
              aria-label="Previous slide"
            />
            <CarouselNext
              className="hidden md:flex -right-4 lg:-right-6 bg-white hover:bg-green-50 border-green-200 text-primary hover:text-primary shadow-lg"
              aria-label="Next slide"
            />

            {/* Mobile Navigation - Show arrows at bottom on small screens */}
            <div className="flex md:hidden justify-center gap-3 mt-6">
              <CarouselPrevious
                className="static transform-none bg-white hover:bg-green-50 border-green-200 text-primary"
                aria-label="Previous slide"
              />
              <CarouselNext
                className="static transform-none bg-white hover:bg-green-50 border-green-200 text-primary"
                aria-label="Next slide"
              />
            </div>
          </Carousel>
        </motion.div>
      </div>
    </section>
  );
}
