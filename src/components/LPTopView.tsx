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
            <div className={clsx('h-36 w-36', styles.chatboxInner)}>
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
      <div className="width-full sm:width-auto sm:pr-[min(calc(100vw - 1400px), 15vw)] absolute inset-x-0 top-1/2 flex h-1/2 flex-col items-end sm:right-2 sm:pl-[10vw] md:top-[40vh] md:h-3/5">
        <div className="order-1 ml-auto mr-2 w-52 sm:w-80 md:w-96">
          <TextLogo
            alt="きぐあぷり"
            //width={427 * 2 * (is1400 ? 0.5 : 1)}
            //height={140 * 2 * (is1400 ? 0.5 : 1)}
          />
        </div>
        <p className="order-3 mx-2 rounded-xl bg-white bg-opacity-80 px-3 py-1 text-right text-3xl font-extrabold leading-10 text-slate-900">
          ○○合わせを登録して
          <wbr />
          チェックしよう。
        </p>
        <p className="order-4 mx-2 mt-2 hidden rounded-xl bg-white bg-opacity-80 px-2 text-slate-900 md:block md:text-lg md:font-medium">
          JMoFの合わせイベントを
          <wbr />
          見逃さないようにしよう。
        </p>
        <div className="order-2 mb-4 w-full px-2 md:w-80">
          <Link
            href="/programs"
            className="flex w-full items-center justify-center rounded-lg bg-blue-600 py-4 font-bold text-white shadow-md md:py-6 md:text-xl"
          >
            <NumberedListIcon className="mr-2" />
            ○○合わせ一覧を見る
          </Link>
        </div>
      </div>
    </Pane>
  );
}
