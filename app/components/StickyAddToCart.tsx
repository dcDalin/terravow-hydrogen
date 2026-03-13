import {useState, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {Image, Money} from '@shopify/hydrogen';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';
import {ShoppingBag} from 'lucide-react';
import type {ProductFragment} from 'storefrontapi.generated';

interface StickyAddToCartProps {
  product: ProductFragment;
  selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
}

export function StickyAddToCart({
  product,
  selectedVariant,
}: StickyAddToCartProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {open} = useAside();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollThreshold = 300; // Show after scrolling 300px

      // Show when scrolling down past threshold
      if (currentScrollY > scrollThreshold && currentScrollY > lastScrollY) {
        setIsVisible(true);
      }
      // Hide when scrolling up
      else if (currentScrollY < lastScrollY) {
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{y: 100, opacity: 0}}
          animate={{y: 0, opacity: 1}}
          exit={{y: 100, opacity: 0}}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border shadow-2xl"
        >
          <div className="max-w-7xl mx-auto px-4 py-3">
            <div className="flex items-center gap-4">
              {/* Product Image */}
              {selectedVariant?.image && (
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                  <Image
                    data={selectedVariant.image}
                    className="w-full h-full object-cover"
                    sizes="56px"
                  />
                </div>
              )}

              {/* Product Info */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm text-foreground truncate">
                  {product.title}
                </h3>
                {selectedVariant?.price && (
                  <div className="flex items-baseline gap-2">
                    <Money
                      data={selectedVariant.price}
                      className="text-sm font-bold text-foreground"
                    />
                    {selectedVariant?.compareAtPrice && (
                      <Money
                        data={selectedVariant.compareAtPrice}
                        className="text-xs text-muted-foreground line-through"
                      />
                    )}
                  </div>
                )}
              </div>

              {/* Add to Cart Button */}
              <AddToCartButton
                disabled={!selectedVariant || !selectedVariant.availableForSale}
                onClick={() => {
                  open('cart');
                }}
                lines={
                  selectedVariant
                    ? [
                        {
                          merchandiseId: selectedVariant.id,
                          quantity: 1,
                          selectedVariant,
                        },
                      ]
                    : []
                }
                className="flex-shrink-0 h-11 px-6"
              >
                <ShoppingBag className="mr-2" size={18} />
                <span className="hidden sm:inline">
                  {selectedVariant?.availableForSale ? 'Add to cart' : 'Sold out'}
                </span>
                <span className="sm:hidden">
                  {selectedVariant?.availableForSale ? 'Add' : 'Sold out'}
                </span>
              </AddToCartButton>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
