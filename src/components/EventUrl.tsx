import Link from 'next/link';
import Image from 'next/image';
import { useCreateLinkMutation, useLinkQuery } from '../generated/request';
import { CameraIcon } from 'evergreen-ui';
import styles from '../styles/EventUrl.module.scss';
import clsx from 'clsx';

const EventUrl = ({ url, className }: { url: string; className?: string }) => {
  const { data, refetch } = useLinkQuery({ url });
  const createLinkMutation = useCreateLinkMutation();
  return (
    <Link className={className} href={data?.link?.url || url}>
      <div className="flex h-20 flex-nowrap justify-start overflow-hidden rounded-lg border border-slate-200 bg-white hover:bg-slate-100">
        {data?.link?.image ? (
          <picture className="grow-0">
            <img
              src={data.link.image}
              width={88}
              height={88}
              className="max-w-none rounded-l-lg border-r"
              alt=""
            />
          </picture>
        ) : (
          <div
            className={clsx(
              styles.cameraIconWrapper,
              'flex items-center justify-center bg-gray-100'
            )}
          >
            <CameraIcon size={32} />
          </div>
        )}
        <div className="flex w-auto flex-1 flex-col items-start overflow-hidden pt-3 pl-2">
          <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-bold">
            {data?.link?.title}
          </p>
          <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs">
            {data?.link?.description}
          </p>
          <p className="w-full max-w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-blue-500">
            {url}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default EventUrl;
