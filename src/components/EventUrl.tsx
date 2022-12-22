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
      <div className="border border-slate-200 bg-white h-20 rounded-lg flex justify-start flex-nowrap overflow-hidden hover:bg-slate-100">
        {data?.link?.image ? (
          <picture className="grow-0">
            <img
              src={data.link.image}
              width={88}
              height={88}
              className="border-r rounded-l-lg max-w-none"
              alt=""
            />
          </picture>
        ) : (
          <div
            className={clsx(
              styles.cameraIconWrapper,
              'flex justify-center items-center bg-gray-100'
            )}
          >
            <CameraIcon size={32} />
          </div>
        )}
        <div className="pt-3 pl-2 w-auto flex-1 overflow-hidden flex flex-col items-start">
          <p className="font-bold text-sm text-ellipsis whitespace-nowrap overflow-hidden w-full max-w-full">
            {data?.link?.title}
          </p>
          <p className="text-xs text-ellipsis whitespace-nowrap overflow-hidden w-full max-w-full">
            {data?.link?.description}
          </p>
          <p className="text-blue-500 text-xs text-ellipsis whitespace-nowrap overflow-hidden w-full max-w-full">
            {url}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default EventUrl;
