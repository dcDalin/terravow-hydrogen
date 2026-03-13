import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';
import {motion} from 'framer-motion';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  const calculateSavings = () => {
    if (!price || !compareAtPrice) return null;
    const savings = Number(compareAtPrice.amount) - Number(price.amount);
    const percentage = (savings / Number(compareAtPrice.amount)) * 100;
    return Math.round(percentage);
  };

  const savingsPercentage = calculateSavings();

  return (
    <div className="flex items-baseline gap-3 flex-wrap">
      {compareAtPrice ? (
        <>
          {price && (
            <Money data={price} className="text-2xl font-bold text-foreground" />
          )}
          <Money
            data={compareAtPrice}
            className="text-lg font-medium text-muted-foreground line-through"
          />
          {savingsPercentage && (
            <motion.span
              initial={{scale: 0, opacity: 0}}
              animate={{scale: 1, opacity: 1}}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 15,
                delay: 0.2,
              }}
              className="text-sm font-semibold text-primary bg-primary/10 px-2 py-1 rounded-full"
            >
              Save {savingsPercentage}%
            </motion.span>
          )}
        </>
      ) : price ? (
        <Money data={price} className="text-2xl font-bold text-foreground" />
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
