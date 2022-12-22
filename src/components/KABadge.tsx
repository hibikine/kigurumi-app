import { ReactNode } from 'react';
import clsx from 'clsx';

export const KABadge = ({
  children,
  size,
  color,
}: {
  children: ReactNode;
  size?: 'large' | 'medium' | 'small';
  color?: 'purple' | 'fuchsia' | 'pink' | 'rose';
}) => (
  <div
    className={clsx(
      'text-white rounded-full font-bold self-start',
      size === 'small' && 'text-sm px-1',
      (size === 'medium' || size === undefined) && 'text-base px-2',
      size === 'large' && 'text-lg px-2',
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
        : 'bg-pink-500'
    )}
  >
    {children}
  </div>
);
