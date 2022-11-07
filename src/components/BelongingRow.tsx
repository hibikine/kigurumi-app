import { Checkbox, Table, TextInput } from 'evergreen-ui';
import { useUpdateBelongingMutation } from '../generated/request';
import styles from '../styles/Belongings.module.scss';

export const BelongingRow = ({ id, name, checked, onAfterChange }: Props) => {
  const updateBelongingMutation = useUpdateBelongingMutation();
  const onChangeCheckBox = (id: number, checked: boolean) => async () => {
    await updateBelongingMutation.mutateAsync({
      belongingId: `${id}`,
      completed: !checked,
    });
    onAfterChange?.();
  };
  return (
    <Table.Row key={id}>
      <Table.TextCell
        flexBasis={70}
        flexShrink={0}
        flexGrow={0}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        verticalAlign="middle"
      >
        <Checkbox
          justifyContent="center"
          checked={checked}
          onChange={onChangeCheckBox(id, checked)}
        />
      </Table.TextCell>
      <Table.TextCell>
        <TextInput value={name} width="100%" className={styles.textInput} />
      </Table.TextCell>
    </Table.Row>
  );
};
type Props = {
  id: number;
  name: string;
  checked: boolean;
  onAfterChange?: () => void;
};
