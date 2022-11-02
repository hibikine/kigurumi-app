import { useState } from 'react';
import {
  Button,
  Heading,
  majorScale,
  Pane,
  Paragraph,
  NumberedListIcon,
} from 'evergreen-ui';
import { useMediaQuery } from 'react-responsive';
import Image from 'next/image';
import gato from '../public/gato.png';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import TextLogo from '../public/kiguapp-logo-text.svg';
import styles from '../styles/Top.module.scss';
import { backgroundColor } from '../styles/colors';
import Link from 'next/link';

export default function LPTopView() {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Pane
      width="100%"
      height="100vh"
      overflow="hidden"
      borderBottom="1px solid #f0f0f0"
    >
      <Pane
        height="calc(100vh - 48px)"
        maxWidth="100%"
        width="100%"
        top="0"
        left="0"
        overflow="hidden"
        display="flex"
        alignItems="end"
        justifyContent="start"
      >
        <Fade left when={imageLoaded}>
          <Pane
            height="100vh"
            width={`${(100 * 2048) / 3000}vh`}
            position="relative"
          >
            <Image
              className={styles.gatoImage}
              src={gato}
              // objectFit="cover"
              //layout={isPortrait ? 'fill' : 'fixed'}
              //objectFit={isPortrait ? 'cover' : undefined}
              //layout="fill"
              priority
              fill
              // width={
              //   isPortrait
              //     ? 2048 / 1.5
              //     : isHeight1000Over
              //     ? Math.round((2048 / 3) * 1.5)
              //     : Math.round(2048 / 3)
              // }
              // height={
              //   isPortrait
              //     ? 3000 / 1.5
              //     : isHeight1000Over
              //     ? Math.round((3000 / 3) * 1.5)
              //     : Math.round(3000 / 3)
              // }
              // height="100%"
              alt=""
              onLoadingComplete={() => setImageLoaded(true)}
            />
          </Pane>
        </Fade>
        <Pane position="absolute" className={styles.chatbox}>
          <Rotate top left when={imageLoaded} delay={1000}>
            <Image
              src="/chatbox.svg"
              width={265}
              height={265}
              alt="がとーちゃん「明日のイベント準備よしっ！」"
            />
          </Rotate>
        </Pane>
      </Pane>
      <Pane
        className={styles.overlayPane}
        position="absolute"
        paddingLeft="10vw"
        paddingRight="min(calc(100vw - 1400px), 15vw)"
        right={majorScale(3)}
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
      >
        <TextLogo
          className={styles.mainLogo}
          alt="きぐあぷり"
          //width={427 * 2 * (is1400 ? 0.5 : 1)}
          //height={140 * 2 * (is1400 ? 0.5 : 1)}
        />
        <Heading
          is="p"
          padding={majorScale(2)}
          paddingRight={majorScale(5)}
          paddingLeft={majorScale(5)}
          textAlign="right"
          size={900}
          fontSize={'3.5rem'}
          backgroundColor="rgba(255, 255, 255, 0.8)"
          borderRadius={majorScale(3)}
          lineHeight="1.2"
        >
          ケモノ関連イベントの
          <wbr />
          お供に
        </Heading>
        <Pane display="flex" alignItems="center" marginTop={majorScale(3)}>
          <Paragraph
            marginRight={majorScale(4)}
            display="inline-block"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            borderRadius={majorScale(1)}
            paddingX={majorScale(2)}
          >
            持ち物や着ぐるみイベントの管理から、
            <wbr />
            着ぐるみ制作の進捗管理まで
          </Paragraph>
          <Link legacyBehavior href="/belongings" passHref>
            <Button
              is="a"
              className={styles.cptButton}
              flexShrink={0}
              iconBefore={NumberedListIcon}
              appearance="primary"
              height={majorScale(7)}
              marginRight={majorScale(4)}
            >
              持ち物リストを作る
            </Button>
          </Link>
        </Pane>
      </Pane>
    </Pane>
  );
}
