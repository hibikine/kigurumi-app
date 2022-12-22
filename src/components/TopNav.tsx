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
import clsx from 'clsx';
import useSize from '../utils/hooks/useSize';

const logoHeight: { [key in ReturnType<typeof useSize>]: number } = {
  xs: 48,
  sm: 48,
  md: 72,
  lg: 72,
  xl: 72,
  '2xl': 72,
};

const TopNav = () => {
  const { data: session } = useSession();
  const size = useSize();
  const isLogin = !!session;
  return (
    <nav
      className={
        'w-full sticky top-0 bg-white z-10 shrink-0 flex justify-center sm:justify-start items-center pr-4 pl-4 h-16 sm:h-16 lg:h-16'
      }
    >
      <Link href={isLogin ? '/dashboard' : '/'}>
        <div
          className={clsx(
            styles.logoWrapper,
            'h-full w-fit sm:w-40 flex items-center justify-center'
          )}
        >
          <Image
            alt="きぐあぷり"
            src="/logo.svg"
            height={logoHeight[size]}
            width={(logoHeight[size] * 394) / 105}
            className={clsx(
              'mr-auto ml-auto  sm:pr-2 sm:mr-2',
              `h-[${logoHeight[size]}]`
            )}
          />
        </div>
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
        <TopNavTabLink href="/programs" icon={NumberedListIcon}>
          合わせ一覧
        </TopNavTabLink>
        {/*<TopNavTabLink href="/belongings" icon={NumberedListIcon}>
          持ち物
        </TopNavTabLink>*/}
        {/*<TopNavTabLink href="/making" icon={BuildIcon}>
          制作
        </TopNavTabLink>*/}
        {/* 後で戻す

        session ? (
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
            paneClassName={styles.loginPane}
            icon={LogInIcon}
            onClick={signIn}
          >
            ログイン
          </TopNavTabLink>
        )*/}
      </Pane>
    </nav>
  );
};
export default TopNav;
