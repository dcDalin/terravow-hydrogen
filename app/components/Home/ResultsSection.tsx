import {Link} from 'react-router';
import {Button} from '~/components/ui/button';

export default function ResultsSection() {
  const timeline = [
    {
      week: 'Week 1-2',
      title: 'Initial Absorption',
      description:
        'Your body begins absorbing premium nutrients. Some women notice improved digestion and initial energy boost.',
    },
    {
      week: 'Week 3-4',
      title: 'Visible Changes',
      description:
        'Skin starts to glow, energy levels stabilize, and mental clarity improves. Sleep quality enhances.',
    },
    {
      week: 'Week 6-8',
      title: 'Deep Transformation',
      description:
        'Noticeable improvements in skin elasticity, hair thickness, and sustained vitality throughout the day.',
    },
    {
      week: 'Week 12+',
      title: 'Full Benefits',
      description:
        'Complete cellular rejuvenation. Feel your best self - energized, radiant, and confident.',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-white via-rose-50/20 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-sm tracking-[0.25em] uppercase text-rose-600 mb-4 font-semibold">
            Your Transformation Journey
          </h2>
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What to Expect Month by Month
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Real transformation takes time. Here's what thousands of women have
            experienced on their journey to renewed vitality.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-rose-200 via-rose-300 to-rose-200 hidden lg:block" />

          <div className="space-y-16">
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex flex-col lg:flex-row gap-8 items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'
                  }`}
                >
                  <div
                    className={`bg-white rounded-2xl p-8 shadow-lg border border-rose-100 hover:shadow-2xl hover:shadow-rose-500/20 transition-all duration-300 ${
                      index % 2 === 0
                        ? 'lg:ml-auto lg:mr-8'
                        : 'lg:mr-auto lg:ml-8'
                    } max-w-md`}
                  >
                    <div
                      className={`inline-block px-4 py-1.5 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full text-sm font-bold text-rose-700 mb-4`}
                    >
                      {item.week}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-3">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Dot */}
                <div className="relative flex-shrink-0 hidden lg:block">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50 z-10 relative">
                    <span className="text-white font-bold text-lg">
                      {index + 1}
                    </span>
                  </div>
                </div>

                {/* Spacer */}
                <div className="flex-1 hidden lg:block" />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20 text-center bg-gradient-to-br from-rose-600 to-pink-600 rounded-3xl p-12 shadow-2xl shadow-rose-500/30">
          <h4 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Start Your Transformation Today
          </h4>
          <p className="text-rose-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of women who chose to invest in their vitality. Try
            it risk-free with our 90-day money-back guarantee.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/collections/all">
              <Button
                size="lg"
                className="h-14 px-8 text-base bg-white text-rose-600 hover:bg-rose-50 shadow-xl"
              >
                Shop Premium Collection
              </Button>
            </Link>
            <Link to="/pages/quiz">
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base border-2 border-white text-white hover:bg-white/10"
              >
                Take the 2-Minute Quiz
              </Button>
            </Link>
          </div>
          <p className="text-rose-100 text-sm mt-6">
            ✓ Free shipping on orders over $75 • ✓ Subscribe & save 20%
          </p>
        </div>
      </div>
    </section>
  );
}
