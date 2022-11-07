import { Pane, Table, Text, TextInput } from 'evergreen-ui';
import { useForm } from 'react-hook-form';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import {
  useAddBelongingMutation,
  useBelongingsQuery,
} from '../generated/request';
import { BelongingRow } from './BelongingRow';

const Belongings: NextPage = () => {
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
      <Pane className="flex flex-col items-center">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput {...register('name')} placeholder="持ち物を追加" />
          <button type="submit">追加</button>
        </form>
        <Table className="w-full" maxWidth="800px">
          <Table.Head>
            <Table.TextHeaderCell flexBasis={70} flexShrink={0} flexGrow={0} />
            <Table.TextHeaderCell>持ち物</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {items.map((item) => (
              <BelongingRow {...item} key={item.id} onAfterChange={refetch} />
            ))}
          </Table.Body>
        </Table>
        <ul>
          {items.map(({ name, checked, id }) => (
            <li key={id}>
              <input type="checkbox" defaultChecked={checked} />
              <Text>{name}</Text>
            </li>
          ))}
        </ul>
      </Pane>
    </Layout>
  );
};

export default Belongings;
