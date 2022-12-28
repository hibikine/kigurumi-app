import {
  Pane,
  majorScale,
  NumberedListIcon,
  PanelStatsIcon,
  BuildIcon,
  LogInIcon,
  Avatar,
  CalendarIcon,
} from 'evergreen-ui';
import Link from 'next/link';
import Image from 'next/image';
import { signIn, useSession } from 'next-auth/react';
import clsx from 'clsx';
import TopNavTabLink from './TopNavTabLink';
import styles from '../styles/TopNav.module.scss';
import useSize from '../utils/hooks/useSize';
import {
  NAVIGATION_HEIGHT_PC,
  NAVIGATION_HEIGHT_SP,
} from '../styles/constants';

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
        'sticky top-0 z-10 flex h-12 w-full shrink-0 items-center justify-center bg-white sm:h-14 sm:justify-start sm:px-4 '
      }
    >
      <Link href={isLogin ? '/dashboard' : '/'}>
        <div
          className={clsx(
            styles.logoWrapper,
            'flex h-full w-fit items-center justify-center sm:w-40'
          )}
        >
          <Image
            alt="きぐあぷり"
            src="/logo.svg"
            height={logoHeight[size]}
            width={(logoHeight[size] * 394) / 105}
            className={clsx(
              'mx-auto sm:mr-2  sm:pr-2',
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
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        className={`h-${NAVIGATION_HEIGHT_SP} md:h-${NAVIGATION_HEIGHT_PC} fixed inset-x-0 bottom-0 flex w-full items-center justify-around bg-white md:static md:h-auto md:justify-start md:bg-transparent`}
      >
        {isLogin && (
          <TopNavTabLink href="/dashboard" icon={PanelStatsIcon}>
            ダッシュボード
          </TopNavTabLink>
        )}
        <TopNavTabLink href="/programs" icon={NumberedListIcon}>
          合わせ一覧
        </TopNavTabLink>
        <TopNavTabLink href="/programs/calendar" icon={CalendarIcon}>
          {size === 'xs' ? 'カレンダー' : '合わせカレンダー'}
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
      </div>
    </nav>
  );
};
export default TopNav;
