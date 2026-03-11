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
  divider = <span className="mx-10">⚡</span>,
  className,
}: HomePageMarqueeProps) {
  return (
    <div className={clsx('bg-black/80 text-white', className)}>
      <Marquee
        autoFill
        pauseOnHover
        pauseOnClick
        speed={SPEED_MAP[speed]}
        className="py-6"
      >
        <div className="flex items-center">
          {items.map((item, index) => (
            <div key={`${item}`} className="flex items-center">
              <span className="px-6 text-sm font-medium tracking-[0.2em] uppercase text-white/80">
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
