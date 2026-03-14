import {redirect, useLoaderData} from 'react-router';
import type {Route} from './+types/($locale).products.$handle';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import {motion} from 'framer-motion';
import {ProductPrice} from '~/components/ProductPrice';
import {ProductImage} from '~/components/ProductImage';
import {ProductForm} from '~/components/ProductForm';
import {SafeHtml} from '~/components/SafeHtml';
import {CustomerReview} from '~/components/CustomerReview';
import {ProductFAQ} from '~/components/ProductFAQ';
import {TrustBadges} from '~/components/TrustBadges';
import {KeyBenefits} from '~/components/KeyBenefits';
import {StickyAddToCart} from '~/components/StickyAddToCart';
import {ProductComparison} from '~/components/ProductComparison';
import {HowItWorksCarousel} from '~/components/HowItWorksCarousel';
import {redirectIfHandleIsLocalized} from '~/lib/redirect';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `TerraVow | ${data?.product.title ?? ''}`},
    {
      rel: 'canonical',
      href: `/products/${data?.product.handle}`,
    },
  ];
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
async function loadCriticalData({context, params, request}: Route.LoaderArgs) {
  const {handle} = params;
  const {storefront} = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  const [{product}] = await Promise.all([
    storefront.query(PRODUCT_QUERY, {
      variables: {handle, selectedOptions: getSelectedProductOptions(request)},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  // The API handle might be localized, so redirect to the localized handle
  redirectIfHandleIsLocalized(request, {handle, data: product});

  return {
    product,
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context, params}: Route.LoaderArgs) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  return {};
}

export default function Product() {
  const {product} = useLoaderData<typeof loader>();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const {title, descriptionHtml} = product;

  return (
    <>
      <div className="max-w-5xl mx-auto px-4 pt-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <motion.div
            className="lg:sticky lg:top-4 lg:self-start"
            initial={{opacity: 0, y: 20}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.5, ease: 'easeOut'}}
          >
            <ProductImage
              image={selectedVariant?.image}
              images={product.images?.nodes || []}
            />
          </motion.div>

          {/* Product Details */}
          <div className="space-y-6">
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.1, ease: 'easeOut'}}
            >
              <h1 className="text-3xl md:text-4xl font-bold font-primary text-foreground mb-2">
                {title}
              </h1>
              <ProductPrice
                price={selectedVariant?.price}
                compareAtPrice={selectedVariant?.compareAtPrice}
              />
            </motion.div>

            {descriptionHtml && (
              <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, margin: '-50px'}}
                transition={{duration: 0.5, ease: 'easeOut'}}
              >
                <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground mb-4">
                  Description
                </h2>
                <SafeHtml html={descriptionHtml} className="wysiwyg" />
              </motion.div>
            )}

            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.2, ease: 'easeOut'}}
            >
              <ProductForm
                productOptions={productOptions}
                selectedVariant={selectedVariant}
              />
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              animate={{opacity: 1, y: 0}}
              transition={{duration: 0.5, delay: 0.3, ease: 'easeOut'}}
            >
              <TrustBadges />
            </motion.div>

            {/* Customer Reviews Carousel */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.5, ease: 'easeOut'}}
            >
              <CustomerReview productHandle={product.handle} />
            </motion.div>

            {/* FAQ Section */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.5, ease: 'easeOut'}}
            >
              <ProductFAQ productHandle={product.handle} />
            </motion.div>
          </div>
        </div>
        <Analytics.ProductView
          data={{
            products: [
              {
                id: product.id,
                title: product.title,
                price: selectedVariant?.price.amount || '0',
                vendor: product.vendor,
                variantId: selectedVariant?.id || '',
                variantTitle: selectedVariant?.title || '',
                quantity: 1,
              },
            ],
          }}
        />
      </div>

      <div>
        {/* Key Benefits Grid */}
        <section className="bg-secondary">
          <div className="max-w-5xl mx-auto px-4">
            <KeyBenefits />
          </div>
        </section>

        <section className="bg-green-50 pb-16">
          <div className="max-w-5xl mx-auto px-4">
            {/* Comparison Table */}
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.5, ease: 'easeOut'}}
            >
              <ProductComparison productHandle={product.handle} />
            </motion.div>
          </div>
        </section>

        {/* How it works carousel */}
        <HowItWorksCarousel />
      </div>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCart product={product} selectedVariant={selectedVariant} />
    </>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
` as const;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    images(first: 10) {
      nodes {
        id
        url
        altText
        width
        height
      }
    }
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
` as const;

const PRODUCT_QUERY = `#graphql
  query Product(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
` as const;
