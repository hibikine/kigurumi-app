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
import gato from '../../public/gato.png';
import Fade from 'react-reveal/Fade';
import Rotate from 'react-reveal/Rotate';
import TextLogo from '../../public/kiguapp-logo-text.svg';
import styles from '../styles/Top.module.scss';
import { backgroundColor } from '../styles/colors';
import Link from 'next/link';
import clsx from 'clsx';

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
            <div className={clsx('w-36 h-36', styles.chatboxInner)}>
              <Image
                src="/chatbox.svg"
                width={265}
                height={265}
                alt="がとーちゃん「明日のイベント準備よしっ！」"
              />
            </div>
          </Rotate>
        </Pane>
      </Pane>
      <div className="absolute top-1/2 h-1/2 md:top-[40vh] md:h-3/5 right-0 left-0 sm:right-2 width-full sm:width-auto sm:pl-[10vw] sm:pr-[min(calc(100vw - 1400px), 15vw)] flex-col items-end flex">
        <div className="w-52 sm:w-80 md:w-96 ml-auto mr-2 order-1">
          <TextLogo
            alt="きぐあぷり"
            //width={427 * 2 * (is1400 ? 0.5 : 1)}
            //height={140 * 2 * (is1400 ? 0.5 : 1)}
          />
        </div>
        <p className="text-slate-900 text-3xl font-extrabold px-3 py-1 text-right bg-white bg-opacity-80 rounded-xl leading-10 mx-2 order-3">
          ケモノ関連イベントの
          <wbr />
          お供に
        </p>
        <p className="bg-white text-slate-900 rounded-xl px-2 mx-2 bg-opacity-80 order-4 mt-2 hidden">
          着ぐるみイベントの予定を
          <wbr />
          忘れないようにしよう
        </p>
        <div className="px-2 mb-4 w-full order-2">
          <Link
            href="/programs"
            className="bg-blue-600 text-white w-full flex justify-center items-center py-4 rounded-lg shadow-md"
          >
            <NumberedListIcon className="mr-2" />
            合わせ一覧を見る
          </Link>
        </div>
      </div>
    </Pane>
  );
}
