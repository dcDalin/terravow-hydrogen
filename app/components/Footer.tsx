import {Suspense, useState} from 'react';
import {Await, Link} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';
import {motion} from 'framer-motion';
import {Mail, Facebook, Instagram, Twitter} from 'lucide-react';
import {Button} from './ui/button';
import {Input} from './ui/input';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <FooterContent
            footer={footer}
            header={header}
            publicStoreDomain={publicStoreDomain}
          />
        )}
      </Await>
    </Suspense>
  );
}

function FooterContent({
  footer,
  header,
  publicStoreDomain,
}: {
  footer: FooterQuery | null;
  header: HeaderQuery;
  publicStoreDomain: string;
}) {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="bg-primary text-primary-foreground border-t border-primary-foreground/10">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold font-serif">TerraVow</h2>
            </Link>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Premium supplements crafted with science-backed ingredients to
              support your wellness journey.
            </p>
            {/* Social Media */}
            <div className="flex gap-3 pt-2">
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={16} />
              </motion.a>
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{scale: 1.1}}
                whileTap={{scale: 0.95}}
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={16} />
              </motion.a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/collections/all"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Collections
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/policies/shipping-policy"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link
                  to="/policies/refund-policy"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Refund Policy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@terravow.com"
                  className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Stay Connected
            </h3>
            <p className="text-sm text-primary-foreground/70 mb-4">
              Get exclusive offers and wellness tips.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40 focus:border-primary-foreground/40"
              />
              <Button
                type="submit"
                variant="secondary"
                className="w-full"
                size="sm"
              >
                <Mail className="mr-2" size={16} />
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Legal Links */}
            <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-xs text-primary-foreground/60">
              <Link
                to="/policies/privacy-policy"
                className="hover:text-primary-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/policies/terms-of-service"
                className="hover:text-primary-foreground transition-colors"
              >
                Terms of Service
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-xs text-primary-foreground/60">
              © {new Date().getFullYear()} TerraVow. All rights reserved.
            </p>
          </div>

          {/* Payment Methods / Trust Badges */}
          <div className="mt-6 flex justify-center md:justify-end">
            <div className="flex items-center gap-2 text-primary-foreground/40">
              <span className="text-xs">Secure payments</span>
              <div className="flex gap-2">
                {/* Payment icons placeholder - you can add actual payment method logos */}
                <div className="h-6 px-2 bg-primary-foreground/10 rounded flex items-center justify-center text-[10px] font-semibold">
                  VISA
                </div>
                <div className="h-6 px-2 bg-primary-foreground/10 rounded flex items-center justify-center text-[10px] font-semibold">
                  MC
                </div>
                <div className="h-6 px-2 bg-primary-foreground/10 rounded flex items-center justify-center text-[10px] font-semibold">
                  AMEX
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
