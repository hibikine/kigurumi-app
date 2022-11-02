import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import LPTopView from '../components/LPTopView';
import LPUsages from '../components/LPUsages';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <Layout>
      <LPTopView />
      <LPUsages />
    </Layout>
  );
};

export default Home;
