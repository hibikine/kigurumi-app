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
      'text-white rounded-full font-bold pl-2 pr-2 self-start',
      size === 'small' && 'text-sm',
      size === 'medium' && 'text-base',
      size === 'large' && 'text-lg',
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
