import type {FeaturedCollectionFragment} from 'storefrontapi.generated';

interface FeaturedCollectionCardProps {
  collection: FeaturedCollectionFragment;
}

export default function FeaturedCollectionCard({
  collection,
}: FeaturedCollectionCardProps) {
  return (
    <section className="max-w-screen-lg mx-auto px-4 py-12">
      {/* Section Heading */}
      <div className="text-center mb-8">
        <h2 className="text-sm tracking-[0.25em] uppercase text-gray-500">
          Featured Collection
        </h2>
        <p className="mt-2 text-3xl md:text-4xl font-semibold text-black">
          {collection.title}
        </p>
      </div>

      {/* Card Content */}
      <div className="rounded-2xl border border-gray-200 p-8 shadow-sm bg-white">
        {/* Add collection content here */}
      </div>
    </section>
  );
}
