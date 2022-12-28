import { Switch } from '@headlessui/react';
import clsx from 'clsx';
import { ReactNode } from 'react';

export const KASwitch = ({
  id,
  checked,
  onChange,
  children,
}: {
  id: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  children: ReactNode;
}) => (
  <>
    <Switch
      id={id}
      checked={checked}
      onChange={onChange}
      className={clsx(
        checked ? `bg-pink-900` : 'bg-pink-500',
        'relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
      )}
    >
      <span className="sr-only">{children}</span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-9' : 'translate-x-0'}
            pointer-events-none inline-block h-[34px] w-[34px] rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
      />
    </Switch>
    <label className="ml-2 font-medium" htmlFor="is-remove-finished">
      {children}
    </label>
  </>
);
