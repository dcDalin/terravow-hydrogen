export default function TrustSection() {
  const trustBadges = [
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      title: 'Third-Party Tested',
      description: 'Every batch tested for purity, potency, and safety',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: '90-Day Guarantee',
      description: "Love it or your money back, no questions asked",
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
          />
        </svg>
      ),
      title: 'Clean Ingredients',
      description: 'Non-GMO, gluten-free, no artificial additives',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      title: 'Science-Backed',
      description: 'Formulated with clinical research and proven results',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
          />
        </svg>
      ),
      title: 'Made in USA',
      description: 'Manufactured in FDA-registered facilities',
    },
    {
      icon: (
        <svg
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
      title: 'Eco-Friendly',
      description: 'Sustainable packaging and carbon-neutral shipping',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.25em] uppercase text-primary mb-4 font-semibold">
            Quality You Can Trust
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Premium Standards, Exceptional Results
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We believe in complete transparency. Every ingredient is carefully
            sourced, rigorously tested, and backed by science.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {trustBadges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-card rounded-2xl border border-border hover:shadow-lg transition-all duration-300 group"
            >
              <div className="mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                {badge.icon}
              </div>
              <h4 className="text-lg font-bold text-foreground mb-2">
                {badge.title}
              </h4>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>

        {/* Bottom Certification Logos */}
        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Certified by leading organizations
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {/* Placeholder for certification logos */}
            {['GMP', 'NSF', 'Non-GMO', 'Vegan', 'Gluten-Free'].map(
              (cert, index) => (
                <div
                  key={index}
                  className="px-6 py-3 bg-muted rounded-lg font-semibold text-muted-foreground text-sm"
                >
                  {cert} Certified
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
