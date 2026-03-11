import {Await, Link} from 'react-router';
import {Suspense} from 'react';
import type {RecommendedProductsQuery} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import type {Route} from './+types/($locale)._index';
import {Button} from '~/components/ui/button';
import HomePageMarquee from '~/components/Marquee/HomePageMarquee';
import FeaturedCollectionCard from '~/components/Cards/FeaturedCollectionCard';
import TestimonialsSection from '~/components/Home/TestimonialsSection';
import TrustSection from '~/components/Home/TrustSection';
import ResultsSection from '~/components/Home/ResultsSection';
import NewsletterSection from '~/components/Home/NewsletterSection';
import {motion} from 'framer-motion';

export const meta: Route.MetaFunction = () => {
  return [{title: 'TerraVow | Home'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage({loaderData}: Route.ComponentProps) {
  return (
    <div className="bg-background">
      {/* Announcement Bar */}
      <HomePageMarquee
        items={[
          'Free Shipping on Orders Over $75',
          '90-Day Money-Back Guarantee',
          'Save 20% with Subscribe & Save',
        ]}
      />

      {/* Featured Products - First conversion point */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <FeaturedCollectionCard collection={loaderData.featuredCollection} />
      </motion.div>

      {/* Social Proof - Build credibility */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <TestimonialsSection />
      </motion.div>

      {/* Trust & Quality - Remove objections */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <TrustSection />
      </motion.div>

      {/* Results Timeline - Set expectations */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <ResultsSection />
      </motion.div>

      {/* Recommended Products - Additional options */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <RecommendedProducts products={loaderData.recommendedProducts} />
      </motion.div>

      {/* Newsletter - Capture leads */}
      <motion.div
        initial={{opacity: 0, y: 20}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, margin: '-100px'}}
        transition={{duration: 0.6, ease: 'easeOut'}}
      >
        <NewsletterSection />
      </motion.div>
    </div>
  );
}

function RecommendedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6, ease: 'easeOut'}}
          className="text-center mb-16"
        >
          <h2 className="text-sm tracking-[0.25em] uppercase text-primary mb-4 font-semibold">
            Complete Your Routine
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            More Ways to Thrive
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explore our curated collection of premium supplements designed to
            support every aspect of your wellness journey.
          </p>
        </motion.div>

        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-muted border-t-primary" />
            </div>
          }
        >
          <Await resolve={products}>
            {(response) => (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {response
                  ? response.products.nodes.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{opacity: 0, y: 20}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{
                          duration: 0.5,
                          delay: index * 0.1,
                          ease: 'easeOut',
                        }}
                      >
                        <ProductItem product={product} />
                      </motion.div>
                    ))
                  : null}
              </div>
            )}
          </Await>
        </Suspense>

        {/* View All CTA */}
        <motion.div
          initial={{opacity: 0, y: 20}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true}}
          transition={{duration: 0.6, delay: 0.4, ease: 'easeOut'}}
          className="mt-12 text-center"
        >
          <Link to="/collections/all">
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 text-base rounded-full"
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollectionProduct on Product {
    id
    title
    handle
    featuredImage {
      id
      url
      altText
      width
      height
    }
    images(first: 5) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
  }
  fragment FeaturedCollection on Collection {
    id
    title
    description
    image {
      id
      url
      altText
      width
      height
    }
    handle
    products(first: 4) {
      nodes {
        ...FeaturedCollectionProduct
      }
    }
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
