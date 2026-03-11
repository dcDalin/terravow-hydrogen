import Marquee from 'react-fast-marquee';
import clsx from 'clsx';
import {ReactNode} from 'react';

type MarqueeSpeed = 'superSlow' | 'slow' | 'normal' | 'fast';

const SPEED_MAP: Record<MarqueeSpeed, number> = {
  superSlow: 20,
  slow: 35,
  normal: 50,
  fast: 80,
};

interface HomePageMarqueeProps {
  items: string[];
  speed?: MarqueeSpeed;
  divider?: ReactNode;
  className?: string;
}

export default function HomePageMarquee({
  items,
  speed = 'normal',
  divider = <span className="mx-4 md:mx-8">⚡</span>,
  className,
}: HomePageMarqueeProps) {
  return (
    <div className={clsx('bg-black/80 text-white', className)}>
      <Marquee
        autoFill
        pauseOnHover
        pauseOnClick
        speed={SPEED_MAP[speed]}
        className="py-2 md:py-4"
      >
        <div className="flex items-center">
          {items.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center">
              <span className="px-2 md:px-4 text-xs md:text-sm font-medium tracking-[0.08em] md:tracking-[0.18em] uppercase text-white/80 whitespace-nowrap">
                {item}
              </span>
              {divider}
            </div>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
