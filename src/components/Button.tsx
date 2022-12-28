import clsx from 'clsx';
import React, { FC } from 'react';

export const buttonStyle =
  'flex items-center justify-center text-center font-bold';
export const buttonSizeStyle = {
  small: {
    className: 'h-8 rounded-sm text-sm',
    width: 'w-24',
  },
  medium: { className: 'h-10 rounded-md text-sm', width: 'w-40' },
  large: { className: 'h-12 rounded-lg', width: 'w-60' },
};
export const buttonColorStyle = {
  default: 'bg-white-600 text-slate-700',
  primary: 'bg-blue-600 text-white',
  secondary: 'bg-gray-600 text-white',
  danger: 'bg-red-600 text-white',
};

export type ButtonStyleParameters = {
  size?: keyof typeof buttonSizeStyle;
  fullWidth?: boolean;
  color?: keyof typeof buttonColorStyle;
};
const Button: FC<
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > &
    ButtonStyleParameters
> = ({
  className,
  size = 'medium',
  fullWidth = false,
  color = 'default',
  ...props
}) => {
  return (
    <button
      className={clsx(
        buttonStyle,
        buttonSizeStyle[size].className,
        fullWidth ? 'w-full' : buttonSizeStyle[size].width,
        buttonColorStyle[color],
        className
      )}
      {...props}
    >
      Button
    </button>
  );
};
export default Button;
