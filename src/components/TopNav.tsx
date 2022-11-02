import {
  Pane,
  majorScale,
  NumberedListIcon,
  PanelStatsIcon,
  BuildIcon,
  LogInIcon,
  Avatar,
} from 'evergreen-ui';
import Link from 'next/link';
import Image from 'next/image';
import TopNavTabLink from './TopNavTabLink';
import styles from '../styles/TopNav.module.scss';
import { signIn, useSession } from 'next-auth/react';

const TopNav = () => {
  const { data: session } = useSession();
  const isLogin = !!session;
  return (
    <Pane
      className={styles.topNav}
      is="nav"
      width="100%"
      position="sticky"
      top={0}
      backgroundColor="white"
      zIndex={10}
      flexShrink={0}
      display="flex"
      alignItems="center"
      borderBottom="muted"
      paddingX={majorScale(5)}
    >
      <Link href={isLogin ? '/dashboard' : '/'}>
        <Pane
          className={styles.logoWrapper}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Image
            alt="きぐあぷり"
            src="/logo.svg"
            height={majorScale(6)}
            width={(majorScale(6) * 394) / 105}
            className={styles.logo}
          />
        </Pane>
        {/*<Pane
          is="img"
          alt="きぐあぷり"
          display="flex"
          alignItems="center"
          src="/logo.svg"
          cursor="pointer"
          maxHeight={majorScale(6)}
          paddingRight={majorScale(2)}
          marginRight={majorScale(2)}
  />*/}
      </Link>
      <Pane width="100%" display="flex" className={styles.bottomNav}>
        {isLogin && (
          <TopNavTabLink href="/dashboard" icon={PanelStatsIcon}>
            ダッシュボード
          </TopNavTabLink>
        )}
        <TopNavTabLink href="/belongings" icon={NumberedListIcon}>
          持ち物
        </TopNavTabLink>
        <TopNavTabLink href="/making" icon={BuildIcon}>
          制作
        </TopNavTabLink>
      </Pane>
      {session ? (
        <Link href="/user" className={styles.userLink}>
          <Pane
            height="100%"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Avatar name="test" size={majorScale(5)} />
          </Pane>
        </Link>
      ) : (
        <TopNavTabLink
          className={styles.login}
          icon={LogInIcon}
          onClick={signIn}
        >
          ログイン
        </TopNavTabLink>
      )}
    </Pane>
  );
};
export default TopNav;
