import { Pane, Table } from 'evergreen-ui';
import type { NextPage } from 'next';
import Layout from '../components/Layout';
import { useBelongingsQuery, useProgramsQuery } from '../generated/request';
import { BelongingRow } from '../components/BelongingRow';
import useIsLogin from '../utils/hooks/useIsLogin';
import { useNeedToLogin } from '../utils/hooks/useNeedToLogin';

const Belongings: NextPage = () => {
  const { data, refetch } = useProgramsQuery();
  if (typeof data === 'undefined') {
    return null;
  }

  const items = data.programs.map(({ name, id }) => ({
    name,
    id,
  }));

  return (
    <Layout>
      <Pane className="flex flex-col items-center">
        <button className=" border-1 border-slate-900 text-slate-900">
          イベントを追加する
        </button>
        <div className="flex">
          {items.map((item) => (
            <div className="flex" key={item.id}>
              {item.name}
            </div>
          ))}
        </div>
      </Pane>
    </Layout>
  );
};

export default Belongings;
