import { Checkbox } from 'evergreen-ui';
import type { FC, ComponentProps } from 'react';
export const BelongingRowCheckbox: FC<ComponentProps<typeof Checkbox>> = (
  props
) => <Checkbox justifyContent="center" {...props} />;
export default BelongingRowCheckbox;
