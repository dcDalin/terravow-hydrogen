import {useState} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {ChevronDown} from 'lucide-react';
import {faqsByProduct} from '~/data/faqs';
import {cn} from '~/lib/utils';

interface ProductFAQProps {
  productHandle: string;
}

export function ProductFAQ({productHandle}: ProductFAQProps) {
  // Get FAQs for this product, fallback to default
  const faqs = faqsByProduct[productHandle] || faqsByProduct.default;

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-6 border-t border-border">
      <div className="mb-6">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-foreground mb-1">
          Frequently Asked Questions
        </h2>
        <p className="text-xs text-muted-foreground">
          Everything you need to know about this product
        </p>
      </div>

      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border-b border-border rounded-none overflow-hidden bg-card"
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full px-4 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-medium text-sm text-foreground pr-4">
                {faq.question}
              </span>
              <motion.div
                animate={{rotate: openIndex === index ? 180 : 0}}
                transition={{duration: 0.2}}
                className="flex-shrink-0"
              >
                <ChevronDown className="size-4 text-muted-foreground" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {openIndex === index && (
                <motion.div
                  initial={{height: 0, opacity: 0}}
                  animate={{height: 'auto', opacity: 1}}
                  exit={{height: 0, opacity: 0}}
                  transition={{
                    height: {duration: 0.3, ease: 'easeInOut'},
                    opacity: {duration: 0.2},
                  }}
                >
                  <div className="px-4 pb-4 pt-2 text-sm text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
}
