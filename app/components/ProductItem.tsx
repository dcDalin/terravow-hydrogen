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
import {useState} from 'react';

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

  return (
    <Card className="pt-0">
      {displayImages.length > 0 && (
        <div className="relative">
          <div className="relative aspect-square overflow-hidden rounded-t-xl">
            <Image
              data={displayImages[currentImageIndex]}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              loading={loading}
            />
          </div>
          {displayImages.length > 1 && (
            <div className="flex justify-center gap-1.5 py-2">
              {displayImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`h-1.5 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'w-6 bg-primary'
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`View image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
      <CardHeader className="pb-3">
        <CardTitle className="line-clamp-2 font-primary text-lg">
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
