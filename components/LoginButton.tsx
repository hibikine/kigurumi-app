import { Pane, Button, majorScale } from 'evergreen-ui';

type Props = {
  name: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  logo?: any;
  logoSize?: number;
};
const LoginButton = ({ name, onClick, type, logo: Logo, logoSize }: Props) => (
  <Button
    width="100%"
    backgroundColor="#ffffff" // Googleのブランドガイドラインのため
    onClick={onClick}
    size="large"
    type={type}
    marginBottom={majorScale(1)}
  >
    {Logo && (
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="absolute"
        left={majorScale(1)}
        width="40px"
        top="0"
        bottom="0"
      >
        <Logo width={logoSize ?? '28'} height={logoSize ?? '28'} />
      </Pane>
    )}
    {name}でログイン
  </Button>
);
export default LoginButton;
