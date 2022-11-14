import { TextInput } from 'evergreen-ui';
import { FC, ComponentProps } from 'react';
import clsx from 'clsx';
import styles from '../../styles/Belongings.module.scss';
const BelongingRowTextInput: FC<ComponentProps<typeof TextInput>> = ({
  className,
  ...props
}) => (
  <TextInput
    width="100%"
    className={clsx(styles.textInput, className)}
    {...props}
  />
);

export default BelongingRowTextInput;
