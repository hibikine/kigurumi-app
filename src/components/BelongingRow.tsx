import { Table } from 'evergreen-ui';
import {
  ChangeEventHandler,
  EventHandler,
  FocusEvent,
  FocusEventHandler,
  KeyboardEventHandler,
  useCallback,
} from 'react';
import {
  useAddBelongingMutation,
  useDeleteBelongingMutation,
  useUpdateBelongingMutation,
} from '../generated/request';
import CheckboxCell from './BelongingRowComponents/CheckboxCell';
import BelongingRowCheckbox from './BelongingRowComponents/BelongingRowCheckbox';
import BelongingRowTextInput from './BelongingRowComponents/BelongingRowTextInput';

type FormValues = { name: string };
export const BelongingRow = ({ id, name, checked, onAfterChange }: Props) => {
  const updateBelongingMutation = useUpdateBelongingMutation();
  const addBelongingMutation = useAddBelongingMutation();
  const deleteBelongingMutation = useDeleteBelongingMutation();
  const onChangeCheckBox: ChangeEventHandler<HTMLInputElement> =
    useCallback(async () => {
      if (id) {
        await updateBelongingMutation.mutateAsync({
          belongingId: `${id}`,
          completed: !checked,
        });
        onAfterChange?.();
      }
    }, [checked, id, onAfterChange, updateBelongingMutation]);

  const onBlur = useCallback<FocusEventHandler<HTMLInputElement>>(
    async (e) => {
      const name = e.target.value;
      if (id === undefined) {
        if (name === '') return;
        await addBelongingMutation.mutateAsync({
          name,
        });
        e.target.value = '';
      } else {
        await updateBelongingMutation.mutateAsync({
          belongingId: `${id}`,
          name,
        });
      }
      onAfterChange?.();
    },
    [updateBelongingMutation, onAfterChange, id, addBelongingMutation]
  );
  const onKeyDown = useCallback<KeyboardEventHandler<HTMLInputElement>>(
    async (e) => {
      if (
        e.key === 'Backspace' &&
        (e.target as any).value === '' &&
        id !== undefined
      ) {
        e.preventDefault();
        (e.target as any)?.blur();
        await deleteBelongingMutation.mutateAsync({
          belongingId: `${id}`,
        });
        onAfterChange?.();
      } else if (e.key === 'Enter' && id === undefined) {
        e.preventDefault();
        await addBelongingMutation.mutateAsync({
          name: (e.target as any).value,
        });
        onAfterChange?.();
      }
    },
    [deleteBelongingMutation, id, onAfterChange, addBelongingMutation]
  );
  return (
    <Table.Row>
      <CheckboxCell>
        <BelongingRowCheckbox
          checked={checked}
          onChange={onChangeCheckBox}
          disabled={id === undefined}
        />
      </CheckboxCell>
      <Table.TextCell>
        <BelongingRowTextInput
          defaultValue={name}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
        />
      </Table.TextCell>
    </Table.Row>
  );
};
type Props = {
  id?: number;
  name: string;
  checked: boolean;
  onAfterChange?: () => void;
};
