import {
  LightbulbIcon,
  Pane,
  majorScale,
  NotificationsIcon,
  Heading,
  MobilePhoneIcon,
} from 'evergreen-ui';
import ValueCard from './ValueCard';
import styles from '../styles/Top.module.scss';

export default function LPUsages() {
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
          description="ブラウザで使えるから、どの端末からでもアクセスできます。"
        />
        <ValueCard
          icon={LightbulbIcon}
          title="着ぐるみに特化した使いやすさ"
          description="イベントに必要なものに厳選しているから、すっきりしていて使いやすい。"
        />
        <ValueCard
          icon={NotificationsIcon}
          title="通知で忘れ物をゼロに。"
          description="項目ごとに通知時間を設定できるから忘れない。"
        />
      </Pane>
    </Pane>
  );
}
