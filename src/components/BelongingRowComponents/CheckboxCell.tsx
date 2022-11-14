import { Table } from 'evergreen-ui';
import type { FC, ComponentProps } from 'react';

const CheckboxCell: FC<ComponentProps<typeof Table.TextCell>> = ({
  children,
  ...props
}) => (
  <Table.TextCell
    flexBasis={70}
    flexShrink={0}
    flexGrow={0}
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    verticalAlign="middle"
    {...props}
  >
    {children}
  </Table.TextCell>
);
export default CheckboxCell;
