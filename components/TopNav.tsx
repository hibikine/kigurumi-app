import { Pane, majorScale } from 'evergreen-ui';
import Link from 'next/link';
import TopNavTabLink from './TopNavTabLink';

const TopNav = () => {
  return (
    <Pane
      is="nav"
      width="100%"
      position="sticky"
      top={0}
      backgroundColor="white"
      zIndex={10}
      height={majorScale(8)}
      flexShrink={0}
      display="flex"
      alignItems="center"
      borderBottom="muted"
      paddingX={majorScale(5)}
    >
      <Link href="/">
        <Pane
          is="img"
          alt="きぐあぷり"
          display="flex"
          alignItems="center"
          src="/logo.svg"
          cursor="pointer"
          maxHeight={majorScale(6)}
          paddingRight={majorScale(2)}
          marginRight={majorScale(2)}
        />
      </Link>
      <Pane flex={1}>
        <TopNavTabLink href="/belongings">持ち物</TopNavTabLink>
        <TopNavTabLink href="/making">制作</TopNavTabLink>
      </Pane>
      <Pane display="flex" justifyContent="flex-end" width={236}>
        <TopNavTabLink href="/login">ログイン</TopNavTabLink>
      </Pane>
    </Pane>
  );
};
export default TopNav;
