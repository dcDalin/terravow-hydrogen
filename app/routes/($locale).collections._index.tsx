import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/($locale).collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {motion} from 'framer-motion';

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
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <motion.div
        initial={{opacity: 0, y: 20}}
        animate={{opacity: 1, y: 0}}
        transition={{duration: 0.6}}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
          Collections
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collections of premium products
        </p>
      </motion.div>
      <PaginatedResourceSection<CollectionFragment>
        connection={collections}
        resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {({node: collection, index}) => (
          <CollectionItem
            key={collection.id}
            collection={collection}
            index={index}
          />
        )}
      </PaginatedResourceSection>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true}}
      transition={{duration: 0.5, delay: index * 0.1}}
    >
      <Link
        className="group block"
        key={collection.id}
        to={`/collections/${collection.handle}`}
        prefetch="intent"
      >
        <div className="relative overflow-hidden rounded-xl bg-card border border-border mb-4">
          {collection?.image && (
            <Image
              alt={collection.image.altText || collection.title}
              aspectRatio="1/1"
              data={collection.image}
              loading={index < 3 ? 'eager' : undefined}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(min-width: 45em) 400px, 100vw"
            />
          )}
        </div>
        <h5 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {collection.title}
        </h5>
      </Link>
    </motion.div>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
