export default function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah Mitchell',
      age: 42,
      location: 'Los Angeles, CA',
      rating: 5,
      text: "I've tried countless supplements over the years, but nothing compares to this. My energy levels are through the roof, my skin is glowing, and I genuinely feel 10 years younger. This isn't just marketing - it actually works.",
      result: 'More energy, radiant skin',
    },
    {
      name: 'Jennifer Park',
      age: 51,
      location: 'Austin, TX',
      rating: 5,
      text: "As someone going through perimenopause, I was skeptical. But within 3 weeks, my brain fog cleared, my sleep improved, and I feel like myself again. The science behind these formulas is legitimate.",
      result: 'Better sleep, mental clarity',
    },
    {
      name: 'Amanda Rodriguez',
      age: 38,
      location: 'Miami, FL',
      rating: 5,
      text: 'The premium quality is obvious from day one. No fillers, no junk - just pure, effective ingredients. My hair and nails are stronger, and people keep asking what my secret is. Worth every penny.',
      result: 'Stronger hair & nails',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-sm tracking-[0.25em] uppercase text-primary mb-4 font-semibold">
            Real Women, Real Results
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Join Thousands of Women Who Chose Vitality
          </h3>
          <div className="flex items-center justify-center gap-2 text-lg">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className="w-6 h-6 text-yellow-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="font-semibold text-foreground">
              4.9/5 from 12,000+ reviews
            </span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 border border-border hover:shadow-lg transition-all duration-300"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-500 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-muted-foreground leading-relaxed mb-6 italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Result Badge */}
              <div className="mb-6">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-muted rounded-full">
                  <svg
                    className="w-4 h-4 text-primary"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm font-medium text-foreground">
                    {testimonial.result}
                  </span>
                </div>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-6 border-t border-border">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-lg">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Age {testimonial.age} • {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-4 gap-8 pt-12 border-t border-border">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">98%</div>
            <div className="text-sm text-muted-foreground">
              Would recommend to a friend
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">30 Days</div>
            <div className="text-sm text-muted-foreground">
              Average time to feel results
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">12K+</div>
            <div className="text-sm text-muted-foreground">Verified 5-star reviews</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary mb-2">90 Days</div>
            <div className="text-sm text-muted-foreground">Money-back guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
}
