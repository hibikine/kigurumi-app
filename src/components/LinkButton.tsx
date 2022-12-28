import React, { FC } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import {
  buttonStyle,
  buttonSizeStyle,
  buttonColorStyle,
  ButtonStyleParameters,
} from './Button';
const LinkButton: FC<Parameters<typeof Link>[0] & ButtonStyleParameters> = ({
  className,
  size = 'medium',
  fullWidth = false,
  color = 'default',
  ...props
}) => {
  return (
    <Link
      {...props}
      className={clsx(
        buttonStyle,
        buttonSizeStyle[size].className,
        fullWidth ? 'w-full' : buttonSizeStyle[size].width,
        buttonColorStyle[color],
        className
      )}
    />
  );
};
export default LinkButton;
