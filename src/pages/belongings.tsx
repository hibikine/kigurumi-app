import { useQuery } from '@tanstack/react-query';
import { Text } from 'evergreen-ui';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import type {
  ResponseData as BelongingsResponseData,
  ErrorResponseData,
} from './api/belongings';

const fetchBelongings = async (): Promise<BelongingsResponseData> => {
  const res = await fetch('/api/belongings');
  return res.json();
};
const isError = (data: BelongingsResponseData): data is ErrorResponseData =>
  'error' in data;

const Belongings: NextPage = () => {
  /*const items = ['ケモ手', 'ケモ足', 'ボディ'].map((v) => ({
    name: v,
    checked: false,
  }));*/
  const { data } = useQuery(['belongings'], fetchBelongings);
  if (typeof data === 'undefined') {
    return null;
  }
  if (isError(data)) {
    return null;
  }
  const items = data.data.map(({ name }) => ({ name: name, checked: false }));
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
