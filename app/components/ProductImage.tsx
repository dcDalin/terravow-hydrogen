import type {ProductVariantFragment} from 'storefrontapi.generated';
import {Image} from '@shopify/hydrogen';

export function ProductImage({
  image,
}: {
  image: ProductVariantFragment['image'];
}) {
  if (!image) {
    return (
      <div className="aspect-square overflow-hidden rounded-xl bg-muted flex items-center justify-center">
        <span className="text-muted-foreground text-sm">No image available</span>
      </div>
    );
  }
  return (
    <div className="aspect-square overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10">
      <Image
        alt={image.altText || 'Product Image'}
        aspectRatio="1/1"
        data={image}
        key={image.id}
        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        sizes="(min-width: 45em) 50vw, 100vw"
      />
    </div>
  );
}
