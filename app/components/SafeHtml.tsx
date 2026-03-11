import {useEffect, useRef} from 'react';
import DOMPurify from 'dompurify';

interface SafeHtmlProps {
  html: string;
  className?: string;
}

/**
 * SafeHtml component for rendering sanitized HTML content
 * Uses DOMPurify to prevent XSS attacks while preserving WYSIWYG formatting
 * Recommended by Shopify for safely rendering descriptionHtml and other rich text
 */
export function SafeHtml({html, className}: SafeHtmlProps) {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (divRef.current) {
      // Sanitize HTML on the client side using DOMPurify
      const cleanHtml = DOMPurify.sanitize(html, {
        USE_PROFILES: {html: true},
        ALLOWED_TAGS: [
          'p',
          'br',
          'strong',
          'em',
          'u',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'ul',
          'ol',
          'li',
          'a',
          'img',
          'blockquote',
          'pre',
          'code',
          'span',
          'div',
        ],
        ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'class', 'style'],
      });

      divRef.current.innerHTML = cleanHtml;
    }
  }, [html]);

  return <div ref={divRef} className={className} />;
}
