import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="flex items-baseline gap-3">
      {compareAtPrice ? (
        <>
          {price && (
            <Money data={price} className="text-2xl font-bold text-foreground" />
          )}
          <Money
            data={compareAtPrice}
            className="text-lg font-medium text-muted-foreground line-through"
          />
        </>
      ) : price ? (
        <Money data={price} className="text-2xl font-bold text-foreground" />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
