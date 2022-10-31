import { Text } from 'evergreen-ui';
import type { NextPage } from 'next';
import Layout from '../components/Layout';

const Belongings: NextPage = () => {
  const items = ['ケモ手', 'ケモ足', 'ボディ'].map((v) => ({
    name: v,
    checked: false,
  }));
  return (
    <Layout>
      <ul>
        {items.map(({ name, checked }) => (
          <li key={name}>
            <input type="checkbox" checked={checked} />
            <Text>{name}</Text>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Belongings;
