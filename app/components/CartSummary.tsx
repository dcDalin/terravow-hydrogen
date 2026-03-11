import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import {Button} from '~/components/ui/button';
import {ArrowRight, Tag, Gift, X} from 'lucide-react';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart}: CartSummaryProps) {
  return (
    <div
      aria-labelledby="cart-summary"
      className="border-t border-border px-4 py-4 space-y-4"
    >
      {/* Discounts and Gift Cards */}
      <CartDiscounts discountCodes={cart?.discountCodes} />
      <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />

      {/* Subtotal */}
      <div className="flex items-center justify-between py-3 border-t border-border">
        <span className="text-sm font-semibold text-foreground">Subtotal</span>
        <span className="text-lg font-bold text-foreground">
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </span>
      </div>

      <p className="text-xs text-muted-foreground">
        Taxes and shipping calculated at checkout
      </p>

      {/* Checkout Button */}
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <a href={checkoutUrl} target="_self" className="block">
      <Button
        variant="default"
        size="lg"
        className="w-full rounded-full"
      >
        Continue to Checkout
        <ArrowRight className="ml-2" />
      </Button>
    </a>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="space-y-2">
      {/* Have existing discount, display it with a remove option */}
      {codes.length > 0 && (
        <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
          <Tag className="size-4 text-primary" />
          <span className="flex-1 text-sm font-medium text-foreground">
            {codes.join(', ')}
          </span>
          <UpdateDiscountForm>
            <Button
              variant="ghost"
              size="icon-sm"
              type="submit"
              aria-label="Remove discount"
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="size-4" />
            </Button>
          </UpdateDiscountForm>
        </div>
      )}

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2">
          <label htmlFor="discount-code-input" className="sr-only">
            Discount code
          </label>
          <input
            id="discount-code-input"
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <Button
            type="submit"
            variant="outline"
            size="default"
            aria-label="Apply discount code"
          >
            Apply
          </Button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});

  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current!.value = '';
    }
  }, [giftCardAddFetcher.data]);

  return (
    <div className="space-y-2">
      {/* Applied Gift Cards */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-foreground">Applied Gift Cards</p>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                <Gift className="size-4 text-primary" />
                <span className="flex-1 text-sm font-mono text-foreground">
                  ***{giftCard.lastCharacters}
                </span>
                <Money
                  data={giftCard.amountUsed}
                  className="text-sm font-medium text-foreground"
                />
                <Button
                  variant="ghost"
                  size="icon-sm"
                  type="submit"
                  aria-label="Remove gift card"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <X className="size-4" />
                </Button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </div>
      )}

      {/* Add Gift Card */}
      <AddGiftCardForm fetcherKey="gift-card-add">
        <div className="flex gap-2">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Gift card code"
            ref={giftCardCodeInput}
            className="flex-1 h-9 rounded-lg border border-border bg-background px-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <Button
            type="submit"
            variant="outline"
            size="default"
            disabled={giftCardAddFetcher.state !== 'idle'}
            aria-label="Apply gift card"
          >
            Apply
          </Button>
        </div>
      </AddGiftCardForm>
    </div>
  );
}

function AddGiftCardForm({
  fetcherKey,
  children,
}: {
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesAdd}
    >
      {children}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}
