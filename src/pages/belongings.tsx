import { Pane, Table } from 'evergreen-ui';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useBelongingsQuery } from '../generated/request';
import { BelongingRow } from '../components/BelongingRow';
import useIsLogin from '../utils/hooks/useIsLogin';
import { useNeedToLogin } from '../utils/hooks/useNeedToLogin';

const Belongings: NextPage = () => {
  useNeedToLogin();
  const isLogin = useIsLogin();
  const { data, refetch } = useBelongingsQuery({}, { enabled: isLogin });

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
        <Table className="w-full" maxWidth="800px">
          <Table.Head>
            <Table.TextHeaderCell flexBasis={70} flexShrink={0} flexGrow={0} />
            <Table.TextHeaderCell>持ち物</Table.TextHeaderCell>
          </Table.Head>
          <Table.Body>
            {items.map((item) => (
              <BelongingRow {...item} key={item.id} onAfterChange={refetch} />
            ))}
            <BelongingRow name="" checked={false} onAfterChange={refetch} />
          </Table.Body>
        </Table>
      </Pane>
    </Layout>
  );
};

export default Belongings;
