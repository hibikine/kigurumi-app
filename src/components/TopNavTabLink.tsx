import { ReactNode } from 'react';
import { Pane, IconComponent } from 'evergreen-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/TopNav.module.scss';
import clsx from 'clsx';
import {
  NAVIGATION_HEIGHT_PC,
  NAVIGATION_HEIGHT_SP,
} from '../styles/constants';

type Props = {
  href?: string;
  children: ReactNode;
  className?: string;
  paneClassName?: string;
  onClick?: () => void;
  icon?: IconComponent;
};

const TopNavTabLinkComponent = ({
  icon: Icon,
  className,
  paneClassName,
  onClick,
  children,
}: {
  icon?: IconComponent;
  className?: string;
  paneClassName?: string;
  onClick?: () => void;
  children: ReactNode;
}) => (
  <button
    className={
      /* eslint-disable tailwindcss/no-custom-classname */
      clsx(
        'mx-6 flex-1 cursor-pointer text-lg md:flex-initial',
        `h-${NAVIGATION_HEIGHT_SP}`,
        !Icon && `leading-[${NAVIGATION_HEIGHT_SP}rem]`,
        `md:h-${NAVIGATION_HEIGHT_PC}`,
        !Icon && `md:leading-[${NAVIGATION_HEIGHT_PC}rem]`,
        Icon && 'leading-3',
        className
      )
      /* eslint-enable tailwindcss/no-custom-classname */
    }
    onClick={onClick}
  >
    {Icon ? (
      <Pane className="flex h-full flex-col items-center justify-around py-1">
        <Icon className="text-slate-500" size={20} />
        <p className="text-sm">{children}</p>
      </Pane>
    ) : (
      <p className="text-lg">{children}</p>
    )}
  </button>
);

const TopNavTabLink = ({
  href,
  children,
  className,
  onClick,
  icon,
  paneClassName,
}: Props) => {
  const { pathname } = useRouter();
  const parentPath = pathname.split('/')[1];
  const isActive = href ? parentPath === href.split('/')[1] : false;
  const fontWeight = isActive ? 'font-semibold' : 'font-normal';
  const color = isActive ? 'slate-900' : 'slate-600';

  if (href === undefined) {
    return (
      <TopNavTabLinkComponent
        icon={icon}
        className={clsx(fontWeight, color, className)}
        paneClassName={paneClassName}
        onClick={onClick}
      >
        {children}
      </TopNavTabLinkComponent>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <TopNavTabLinkComponent
        icon={icon}
        className={clsx(fontWeight, color, className)}
        paneClassName={paneClassName}
        onClick={onClick}
      >
        {children}
      </TopNavTabLinkComponent>
    </Link>
  );
};
export default TopNavTabLink;
