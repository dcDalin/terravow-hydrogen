import {useState, useEffect, useMemo} from 'react';
import type {
  ProductVariantFragment,
  ProductFragment,
} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';
import {motion, AnimatePresence} from 'framer-motion';
import {Button} from '~/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {cn} from '~/lib/utils';

interface ProductImageProps {
  image: ProductVariantFragment['image'];
  images: ProductFragment['images']['nodes'];
}

export function ProductImage({image, images}: ProductImageProps) {
  const allImages = useMemo(
    () => (images.length > 0 ? images : image ? [image] : []),
    [images, image],
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Update current index when variant image changes
  useEffect(() => {
    if (image) {
      const index = allImages.findIndex((img) => img.id === image.id);
      if (index !== -1) {
        setCurrentIndex(index);
      }
    }
  }, [image, allImages]);

  if (allImages.length === 0) {
    return (
      <div className="aspect-square overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">
          No image available
        </span>
      </div>
    );
  }

  const currentImage = allImages[currentIndex];
  const hasMultipleImages = allImages.length > 1;

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image with Navigation */}
      <div className="relative aspect-square overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10 group">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImage.id}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3, ease: 'easeInOut'}}
            className="w-full h-full"
          >
            <Image
              alt={currentImage.altText || 'Product Image'}
              aspectRatio="1/1"
              data={currentImage}
              className="w-full h-full object-cover"
              sizes="(min-width: 45em) 50vw, 100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        {hasMultipleImages && (
          <>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:cursor-pointer transition-opacity duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft className="size-5" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 hover:cursor-pointer transition-opacity duration-300"
              aria-label="Next image"
            >
              <ChevronRight className="size-5" />
            </Button>
          </>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {hasMultipleImages && (
        <div className="grid grid-cols-4 gap-2">
          {allImages.map((img, index) => (
            <motion.button
              key={img.id}
              type="button"
              onClick={() => setCurrentIndex(index)}
              className={cn(
                'aspect-square overflow-hidden rounded-lg ring-1 transition-all',
                index === currentIndex
                  ? 'ring-2 ring-primary'
                  : 'ring-border hover:ring-foreground/20',
              )}
              aria-label={`View image ${index + 1}`}
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
              transition={{duration: 0.2}}
            >
              <Image
                alt={img.altText || `Product thumbnail ${index + 1}`}
                aspectRatio="1/1"
                data={img}
                className="w-full h-full object-cover"
                sizes="100px"
              />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
