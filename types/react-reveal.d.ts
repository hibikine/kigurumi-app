declare module 'react-reveal/Fade' {
  declare function Fade(
    props: Partial<{
      children: React.ReactNode;
      out: boolean;
      left: boolean;
      right: boolean;
      top: boolean;
      bottom: boolean;
      big: boolean;
      mirror: boolean;
      opposite: boolean;
      duration: number;
      timeout: number;
      distance: string;
      delay: number;
      count: number;
      forever: boolean;
    }>
  ): JSX.Element;
  export default Fade;
}

declare module 'react-reveal/globals' {
  interface Config {
    ssrFadeout: boolean;
  }
  declare function config(reactRevealConfig: Config);
  export default config;
}
