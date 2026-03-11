import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

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
  const image = product.featuredImage;

  return (
    <motion.div
      initial={{opacity: 0, y: 12}}
      animate={{opacity: 1, y: 0}}
      transition={{duration: 0.5, ease: 'easeOut'}}
    >
      <motion.div
        whileHover={{
          y: -6,
        }}
        transition={{
          type: 'spring',
          stiffness: 120,
          damping: 16,
        }}
      >
        <Link
          className="group block space-y-3"
          key={product.id}
          prefetch="intent"
          to={variantUrl}
        >
          {image && (
            <div className="relative overflow-hidden rounded-xl bg-neutral-100">
              <motion.div
                whileHover={{scale: 1.06}}
                transition={{duration: 0.6, ease: 'easeOut'}}
              >
                <Image
                  alt={image.altText || product.title}
                  aspectRatio="1/1"
                  data={image}
                  loading={loading}
                  sizes="(min-width: 45em) 400px, 100vw"
                  className="object-cover w-full h-full"
                />
              </motion.div>

              {/* subtle gradient hover overlay */}
              <motion.div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0"
                whileHover={{opacity: 1}}
                transition={{duration: 0.4}}
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-1">
            <motion.h4
              className="text-sm font-medium text-foreground"
              whileHover={{opacity: 0.9}}
              transition={{duration: 0.2}}
            >
              {product.title}
            </motion.h4>

            <motion.small
              className="text-sm text-muted-foreground font-medium"
              whileHover={{opacity: 1}}
            >
              <Money data={product.priceRange.minVariantPrice} />
            </motion.small>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
