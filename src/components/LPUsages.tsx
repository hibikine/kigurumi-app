import {
  LightbulbIcon,
  Pane,
  majorScale,
  NotificationsIcon,
  Heading,
  MobilePhoneIcon,
  CalendarIcon,
} from 'evergreen-ui';
import Image from 'next/image';
import ValueCard from './ValueCard';
import styles from '../styles/Top.module.scss';
import Link from 'next/link';
import clsx from 'clsx';
import useSize from '../utils/hooks/useSize';

export default function LPUsages() {
  const size = useSize();
  return (
    <Pane
      borderTop="1px solid #efefef"
      paddingTop={majorScale(1)}
      paddingBottom={majorScale(20)}
      marginX="auto"
      maxWidth={majorScale(150)}
      paddingX={majorScale(3)}
    >
      <Heading size={800} marginY={majorScale(5)} marginLeft={majorScale(2)}>
        きぐあぷりの3つの特徴
      </Heading>
      <Pane display="grid" className={styles.gridPane}>
        <ValueCard
          icon={MobilePhoneIcon}
          title="PCでも、スマホでも"
          description="ブラウザで使えるから、どの端末からでもアクセスできます。ブラウザからアプリをインストールすればさらに便利に。"
        />
        <ValueCard
          icon={LightbulbIcon}
          title="TwiplaのURLから簡単登録"
          description="TwiplaのURLから一部の内容を自動で登録してくれるから、とっても簡単に登録できます。"
        />
        <ValueCard
          icon={CalendarIcon}
          title="カレンダー追加機能付き"
          description="行きたい合わせの予定をGoogleカレンダーに追加して、忘れないようにしよう。JMoFのスケジュール管理もバッチリ。"
        />
      </Pane>
      <div className="w-full px-3">
        <Link
          target="_blank"
          className="flex w-full items-center justify-center rounded-md bg-[#1DA1F2] p-4 font-bold text-white shadow-md"
          href="https://twitter.com/intent/tweet?text=JMoF%E3%81%AE%E2%97%8B%E2%97%8B%E5%90%88%E3%82%8F%E3%81%9B%E3%82%92%E3%81%BE%E3%81%A8%E3%82%81%E3%81%A6%E3%83%81%E3%82%A7%E3%83%83%E3%82%AF%EF%BC%81%20%7C%20%E3%81%8D%E3%81%90%E3%81%82%E3%81%B7%E3%82%8A%20%40kiguapp%20%23%E3%81%8D%E3%81%90%E3%81%82%E3%81%B7%E3%82%8A%0Ahttps%3A%2F%2Fkigu.app"
        >
          <Image
            className=""
            alt=""
            src="/Twitter_Logo_WhiteOnImage.svg"
            width={20}
            height={20}
          />
          <div>
            <p className={clsx(size !== 'xs' && 'inline')}>Twitterでみんなに</p>
            <p className={clsx(size !== 'xs' && 'inline')}>教えちゃおう！</p>
          </div>
        </Link>
      </div>
    </Pane>
  );
}
