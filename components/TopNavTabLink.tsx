import { ReactNode } from 'react';
import { majorScale, Link as EvergreenLink } from 'evergreen-ui';
import Link from 'next/link';
import { useRouter } from 'next/router';

type Props = { href: string; children: ReactNode };

const TopNavTabLink = ({ href, children }: Props) => {
  const { pathname } = useRouter();
  const parentPath = pathname.split('/')[1];
  const isActive = parentPath === href.split('/')[1];

  return (
    <Link href={href} passHref>
      <EvergreenLink
        color={isActive ? 'neutral' : undefined}
        marginRight={majorScale(3)}
      >
        {children}
      </EvergreenLink>
    </Link>
  );
};
export default TopNavTabLink;
