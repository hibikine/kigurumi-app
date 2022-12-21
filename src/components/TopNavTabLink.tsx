import { ReactNode } from 'react';
import {
  majorScale,
  Link as EvergreenLink,
  Pane,
  IconComponent,
  Text,
  minorScale,
} from 'evergreen-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/TopNav.module.scss';
import clsx from 'clsx';

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
  fontWeight,
  color,
  children,
}: {
  icon?: IconComponent;
  className?: string;
  paneClassName?: string;
  onClick?: () => void;
  fontWeight: number;
  color?: string;
  children: ReactNode;
}) => (
  <EvergreenLink
    cursor="pointer"
    className={clsx(
      styles.topNavTabLink,
      Icon && styles.topNavTabLinkWithIcon,
      className
    )}
    fontSize="18px"
    onClick={onClick}
    fontWeight={fontWeight}
    color={color}
    marginRight={majorScale(3)}
  >
    {Icon ? (
      <Pane
        className={paneClassName}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="space-around"
        paddingY={minorScale(2)}
        height="100%"
      >
        <Icon size={20} />
        <Text fontSize="14px" fontWeight={fontWeight} color={color}>
          {children}
        </Text>
      </Pane>
    ) : (
      <Text fontSize="18px" fontWeight={fontWeight} color={color}>
        {children}
      </Text>
    )}
  </EvergreenLink>
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
  const fontWeight = isActive ? 600 : 400;
  const color = isActive ? 'neutral' : undefined;

  if (href === undefined) {
    return (
      <TopNavTabLinkComponent
        icon={icon}
        className={className}
        paneClassName={paneClassName}
        onClick={onClick}
        fontWeight={fontWeight}
        color={color}
      >
        {children}
      </TopNavTabLinkComponent>
    );
  }

  return (
    <Link href={href} passHref legacyBehavior>
      <TopNavTabLinkComponent
        icon={icon}
        className={className}
        paneClassName={paneClassName}
        onClick={onClick}
        fontWeight={fontWeight}
        color={color}
      >
        {children}
      </TopNavTabLinkComponent>
    </Link>
  );
};
export default TopNavTabLink;
