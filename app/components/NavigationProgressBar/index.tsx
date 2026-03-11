import {useEffect, useRef, useState} from 'react';
import {useNavigation} from 'react-router';

import {cx} from 'class-variance-authority';

export const NavigationProgressBar = () => {
  const navigation = useNavigation();
  const active = navigation.state !== 'idle';

  const ref = useRef<HTMLDivElement>(null);
  const [animationComplete, setAnimationComplete] = useState(true);
  const [prevActive, setPrevActive] = useState(active);

  // Sync animationComplete with active during render (avoids setState-in-effect lint error).
  // See: https://react.dev/learn/you-might-not-need-an-effect#adjusting-some-state-when-a-prop-changes
  if (prevActive !== active) {
    setPrevActive(active);
    if (active) {
      setAnimationComplete(false);
    }
  }

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    void Promise.allSettled(
      ref.current.getAnimations().map(({finished}) => finished),
    ).then(() => !active && setAnimationComplete(true));
  }, [active]);

  if (animationComplete && !active) {
    return null;
  }

  return (
    <div
      role="progressbar"
      aria-label="Navigation progress"
      aria-valuetext={active ? 'Loading' : undefined}
      className="fixed inset-x-0 top-0 left-0 z-100 h-1 animate-pulse"
    >
      <div
        ref={ref}
        className={cx(
          'from-secondary to-primary h-full rounded-e-sm bg-linear-to-r transition-all duration-500 ease-in-out',
          navigation.state === 'idle' &&
            animationComplete &&
            'w-0 opacity-0 transition-none',
          navigation.state === 'submitting' && 'w-4/12',
          navigation.state === 'loading' && 'w-10/12',
          navigation.state === 'idle' && !animationComplete && 'w-full',
        )}
      />
    </div>
  );
};
