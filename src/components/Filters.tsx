import { TextInput } from 'evergreen-ui';
import KAListbox from './KAListbox';
import { KASwitch } from './KASwitch';
import { orders } from '../pages/programs';

export const Filters: React.FC<{
  order: typeof orders[number];
  setOrder(order: typeof orders[number]): void;
  isRemoveFinished: boolean;
  setIsRemoveFinished(isRemoveFinished: boolean): void;
  searchText: string;
  setSearchText(searchText: string): void;
}> = ({
  order,
  setOrder,
  isRemoveFinished,
  setIsRemoveFinished,
  searchText,
  setSearchText,
}) => {
  return (
    <div className="flex flex-col items-center lg:flex-row lg:justify-center">
      <div className="mr-4 w-60">
        <KAListbox
          value={order}
          onChange={setOrder}
          options={orders as unknown as typeof orders[number][]}
        />
      </div>
      <div className="mt-4 flex items-center lg:mt-0">
        <KASwitch
          id="is-remove-finished"
          checked={isRemoveFinished}
          onChange={setIsRemoveFinished}
        >
          過去の合わせを表示しない
        </KASwitch>
      </div>
      <div className="mr-2 mt-2 lg:ml-4 lg:mt-0">
        <TextInput
          value={searchText}
          placeholder="検索キーワード"
          size="large"
          onChange={(e: any) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  );
};
