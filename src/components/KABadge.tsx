import { ReactNode } from 'react';
import clsx from 'clsx';

export const KABadge = ({
  className,
  children,
  size,
  color,
}: {
  className?: string;
  children: ReactNode;
  size?: 'large' | 'medium' | 'small' | 'xsmall';
  color?: 'purple' | 'fuchsia' | 'pink' | 'rose';
}) => (
  <div
    className={clsx(
      'self-start rounded-full font-bold text-white',
      size === 'small' && 'px-2 py-0.5 text-xs',
      (size === 'medium' || size === undefined) && 'px-2 text-base',
      size === 'large' && 'px-2 text-lg',
      size === 'xsmall' && 'px-2 text-2xs',
      typeof color === 'undefined'
        ? 'bg-pink-500'
        : color === 'purple'
        ? 'bg-purple-500'
        : color === 'fuchsia'
        ? 'bg-fuchsia-500'
        : color === 'pink'
        ? 'bg-pink-500'
        : color === 'rose'
        ? 'bg-rose-500'
        : 'bg-pink-500',
      className
    )}
  >
    {children}
  </div>
);
