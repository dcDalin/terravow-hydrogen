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

const ICON_CLASSES = 'h-[18px] w-[18px]';
const ICON_STROKE_WIDTH = 1.5;

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <nav className="flex h-16 w-full items-center border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-50 shadow-[0_1px_0_0_hsl(var(--border)/0.8)]">
      <div className="flex h-full w-full items-center justify-between container mx-auto px-6 md:px-8">
        {/* Mobile menu toggle */}
        <HeaderMenuMobileToggle />

        {/* Logo */}
        <NavLink prefetch="intent" to="/" end className="flex items-center">
          <img
            src={logoImage}
            alt={shop.name}
            className="h-10 md:h-15 w-auto"
          />
        </NavLink>

        {/* Desktop nav — centered */}
        <HeaderMenu
          menu={menu}
          viewport="desktop"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />

        {/* Right CTAs */}
        <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
      </div>
    </nav>
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
  const {close} = useAside();

  if (viewport === 'mobile') {
    return (
      <nav className="flex flex-col gap-1 py-4 px-2" role="navigation">
        <NavLink
          end
          onClick={close}
          prefetch="intent"
          to="/"
          className={({isActive}) =>
            `group relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${
              isActive
                ? 'text-foreground bg-accent'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            }`
          }
        >
          Home
        </NavLink>

        {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          return (
            <NavLink
              end
              key={item.id}
              onClick={close}
              prefetch="intent"
              to={url}
              className={({isActive}) =>
                `border border-red-500 group relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-[0.08em] uppercase transition-colors duration-200 ${
                  isActive
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                }`
              }
            >
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    );
  }

  // Desktop
  return (
    <nav className="hidden lg:flex items-center gap-8" role="navigation">
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
            className={({isActive}) =>
              `relative group text-[11px] font-semibold tracking-[0.18em] uppercase transition-colors duration-300 py-1 ${
                isActive
                  ? 'text-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`
            }
          >
            {({isActive}) => (
              <>
                {item.title}
                {/* Animated underline */}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-primary transition-all duration-300 ease-out ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </>
            )}
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
    <nav className="flex items-center gap-1" role="navigation">
      <AccountLink isLoggedIn={isLoggedIn} />
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function AccountLink({isLoggedIn}: {isLoggedIn: Promise<boolean>}) {
  return (
    <NavLink
      prefetch="intent"
      to="/account"
      className="group flex items-center gap-2 rounded-md px-3 py-2 transition-colors duration-200 hover:bg-accent"
    >
      <Suspense
        fallback={
          <IconLabel
            icon={
              <User className={ICON_CLASSES} strokeWidth={ICON_STROKE_WIDTH} />
            }
            label="Sign in"
          />
        }
      >
        <Await
          resolve={isLoggedIn}
          errorElement={
            <IconLabel
              icon={
                <User
                  className={ICON_CLASSES}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              }
              label="Sign in"
            />
          }
        >
          {(isLoggedIn) => (
            <IconLabel
              icon={
                <User
                  className={ICON_CLASSES}
                  strokeWidth={ICON_STROKE_WIDTH}
                />
              }
              label={isLoggedIn ? 'Account' : 'Sign in'}
            />
          )}
        </Await>
      </Suspense>
    </NavLink>
  );
}

function IconLabel({icon, label}: {icon: React.ReactNode; label: string}) {
  return (
    <>
      <span className="text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        {icon}
      </span>
      <span className="hidden lg:inline text-[11px] font-semibold tracking-[0.12em] uppercase text-muted-foreground group-hover:text-foreground transition-colors duration-200">
        {label}
      </span>
    </>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="lg:hidden text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
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
      className="text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
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
      className="relative text-muted-foreground hover:text-foreground hover:bg-accent transition-colors duration-200"
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
        <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[9px] font-bold tracking-tight rounded-full h-4 w-4 flex items-center justify-center leading-none">
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
