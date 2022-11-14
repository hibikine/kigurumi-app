import { ReactNode } from 'react';
import PageFooter from './PageFooter';
import Head from './Head';
import TopNav from './TopNav';
import { Pane } from 'evergreen-ui';
import { backgroundColor } from '../styles/colors';
import styles from '../styles/Layout.module.scss';
type Props = {
  children?: ReactNode;
  title?: string;
};
const Layout = ({ children, title = '' }: Props) => (
  <div>
    <Head title={title} />
    <Pane
      width="100%"
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      backgroundColor={backgroundColor.light}
    >
      <TopNav />
      <Pane className={styles.main} flex={1} height="100%" color="background">
        {children}
        <PageFooter />
      </Pane>
    </Pane>
  </div>
);
export default Layout;
