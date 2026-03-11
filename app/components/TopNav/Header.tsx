import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import logoImage from '~/assets/logo/logo.png';
import {Menu, Search, ShoppingCart, User} from 'lucide-react';
import {Button} from '~/components/ui/button';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

// Consistent icon styling
const ICON_CLASSES = 'h-5 w-5';
const ICON_STROKE_WIDTH = 2;

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="header">
      {/* Mobile menu toggle - far left on mobile */}
      <HeaderMenuMobileToggle />

      <NavLink prefetch="intent" to="/" end>
        <img
          src={logoImage}
          alt={shop.name}
          className="h-16 w-auto rounded-none bg-transparent"
        />
      </NavLink>
      <HeaderMenu
        menu={menu}
        viewport="desktop"
        primaryDomainUrl={header.shop.primaryDomain.url}
        publicStoreDomain={publicStoreDomain}
      />
      <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const className = `header-menu-${viewport}`;
  const {close} = useAside();

  return (
    <nav className={className} role="navigation">
      {viewport === 'mobile' && (
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          style={activeLinkStyle}
          to="/"
        >
          Home
        </NavLink>
      )}
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="header-ctas" role="navigation">
      <AccountLink isLoggedIn={isLoggedIn} />
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: Promise<boolean>}) {
  return (
    <NavLink prefetch="intent" to="/account" className="flex items-center">
      <Suspense
        fallback={
          <>
            <User
              className={`${ICON_CLASSES} lg:hidden`}
              strokeWidth={ICON_STROKE_WIDTH}
            />
            <span className="hidden lg:inline">Sign in</span>
          </>
        }
      >
        <Await
          resolve={isLoggedIn}
          errorElement={
            <>
              <User
                className={`${ICON_CLASSES} lg:hidden`}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <span className="hidden lg:inline">Sign in</span>
            </>
          }
        >
          {(isLoggedIn) => (
            <>
              <User
                className={`${ICON_CLASSES} lg:hidden`}
                strokeWidth={ICON_STROKE_WIDTH}
              />
              <span className="hidden lg:inline">
                {isLoggedIn ? 'Account' : 'Sign in'}
              </span>
            </>
          )}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="lg:hidden"
      onClick={() => open('mobile')}
    >
      <Menu className={ICON_CLASSES} strokeWidth={ICON_STROKE_WIDTH} />
      <span className="sr-only">Toggle menu</span>
    </Button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      onClick={() => open('search')}
    >
      <Search className={ICON_CLASSES} strokeWidth={ICON_STROKE_WIDTH} />
      <span className="sr-only">Search</span>
    </Button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="relative"
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
    >
      <ShoppingCart className={ICON_CLASSES} strokeWidth={ICON_STROKE_WIDTH} />
      {count !== null && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {count}
        </span>
      )}
      <span className="sr-only">Cart ({count ?? 0} items)</span>
    </Button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
