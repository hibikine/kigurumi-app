import { useQuery } from '@tanstack/react-query';
import { Text, TextInput } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import type {
  ResponseData as BelongingsResponseData,
  ErrorResponseData,
} from './api/belongings';
import {
  useAddBelongingMutation,
  useBelongingsQuery,
} from '../generated/request';

const Belongings: NextPage = () => {
  /*const items = ['ケモ手', 'ケモ足', 'ボディ'].map((v) => ({
    name: v,
    checked: false,
  }));*/
  //const { data } = useQuery(['belongings'], fetchBelongings);
  const { data, refetch } = useBelongingsQuery();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const addBelongingsMutation = useAddBelongingMutation();
  const onSubmit = async (data: any) => {
    await addBelongingsMutation.mutateAsync({
      ...data,
      eventId: 1,
    });
    refetch();
  };
  if (typeof data === 'undefined') {
    return null;
  }
  const items = data.belongings.map(({ name, completed, id }) => ({
    name,
    checked: completed,
    id,
  }));
  return (
    <Layout>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput {...register('name')} placeholder="持ち物を追加" />
        <button type="submit">追加</button>
      </form>
      <ul>
        {items.map(({ name, checked, id }) => (
          <li key={id}>
            <input type="checkbox" defaultChecked={checked} />
            <Text>{name}</Text>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Belongings;
