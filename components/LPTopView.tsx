import { Button, Heading, majorScale, Pane } from 'evergreen-ui';
import Image from 'next/image';
import gato from '../public/gato.png';
import Fade from 'react-reveal/Fade';

export default function LPTopView() {
  return (
    <Pane width="100vw" overflow="hidden">
      <Pane
        height="100vh"
        position="absolute"
        maxWidth="100%"
        width="100%"
        top="0"
        left="0"
        overflow="hidden"
      >
        <Fade left>
          <Image
            src={gato}
            objectFit="contain"
            style={{ maxHeight: '100vh', maxWidth: '100%' }}
            width={Math.round(2048 / 3)}
            height={Math.round(3000 / 3)}
            // height="100%"
            alt=""
          />
        </Fade>
        <Pane
          position="absolute"
          top="60vh"
          right={majorScale(3)}
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          height="40vh"
        >
          <Heading
            is="p"
            padding={majorScale(5)}
            size={900}
            fontSize="5rem"
            backgroundColor="rgba(255, 255, 255, 0.8)"
            borderRadius={majorScale(3)}
          >
            ケモノ関連イベントのお供に
          </Heading>
          <Button>持ち物リストを作る</Button>
        </Pane>
      </Pane>
    </Pane>
  );
}
