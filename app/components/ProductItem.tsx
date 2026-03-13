import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';
import {Button} from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import {ShoppingBag} from 'lucide-react';
import {useState, useEffect, useRef} from 'react';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const images = (product as any).images?.nodes || [];
  const displayImages = images.length > 0 ? images : product.featuredImage ? [product.featuredImage] : [];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringDots, setIsHoveringDots] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isHovering && !isHoveringDots && displayImages.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentImageIndex((prevIndex) =>
          (prevIndex + 1) % displayImages.length
        );
      }, 2000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isHovering, isHoveringDots, displayImages.length]);

  return (
    <Card className="pt-0">
      <div className="relative">
        {displayImages.length > 0 ? (
          <div
            className="relative aspect-square overflow-hidden rounded-t-xl group"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Image
              data={displayImages[currentImageIndex]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              loading={loading}
            />
            {displayImages.length > 1 && (
              <div
                className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5"
                onMouseEnter={() => setIsHoveringDots(true)}
                onMouseLeave={() => setIsHoveringDots(false)}
              >
                {displayImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-1.5 rounded-full transition-all ${
                      index === currentImageIndex
                        ? 'w-6 bg-white shadow-md'
                        : 'w-1.5 bg-white/60 hover:bg-white/80 hover:cursor-pointer'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="relative aspect-square overflow-hidden rounded-t-xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-2" strokeWidth={1.5} />
              <p className="text-sm text-gray-400 font-medium">No Image Available</p>
            </div>
          </div>
        )}
      </div>
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 font-primary text-lg min-h-[3.5rem]">
          {product.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <Money
            data={product.priceRange.minVariantPrice}
            className="text-sm font-bold text-gray-900"
          />
          {product.priceRange.minVariantPrice.amount !==
            product.priceRange.maxVariantPrice.amount && (
            <span className="text-sm text-muted-foreground">
              - <Money data={product.priceRange.maxVariantPrice} />
            </span>
          )}
        </div>
        <Link to={variantUrl}>
          <Button
            variant="secondary"
            size="lg"
            className="w-full rounded-full mt-2 hover:cursor-pointer"
          >
            <ShoppingBag />
            View Product
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
