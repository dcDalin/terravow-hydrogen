import {motion} from 'framer-motion';
import {FlaskConical, ShieldCheck, Leaf, Flag} from 'lucide-react';
import {Card, CardContent} from './ui/card';

const benefits = [
  {
    icon: FlaskConical,
    title: 'Clinically Studied Formula',
    description:
      'Crafted using science-backed ingredients at research-supported dosages for real, measurable results.',
  },
  {
    icon: Leaf,
    title: 'Pure Premium Ingredients',
    description:
      'Made with clean, high-quality ingredients — no fillers, artificial additives, or unnecessary compounds.',
  },
  {
    icon: ShieldCheck,
    title: 'Third-Party Tested Quality',
    description:
      'Every batch is produced in GMP-certified facilities and independently tested for purity and potency.',
  },
  {
    icon: Flag,
    title: 'Made in the USA',
    description:
      'Formulated and manufactured in the United States under strict quality and safety standards.',
  },
];

export function KeyBenefits() {
  return (
    <div className="py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {benefits.map((benefit, index) => (
          <motion.div
            key={benefit.title}
            initial={{opacity: 0, y: 18}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-40px'}}
            transition={{duration: 0.45, delay: index * 0.08, ease: 'easeOut'}}
          >
            <Card className="h-full border border-border/60 bg-background/70 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary shrink-0">
                    <benefit.icon size={22} strokeWidth={2} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold tracking-tight text-foreground mb-1">
                      {benefit.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
