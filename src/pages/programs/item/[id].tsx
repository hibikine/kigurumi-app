import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import nl2br from 'react-nl2br';
import { Button, majorScale, Spinner, TextInputField } from 'evergreen-ui';
import { useState, Fragment, useCallback } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { TrashIcon } from '@heroicons/react/20/solid';
import { KABadge } from '../../../components/KABadge';
import dayjs from '../../../lib/dayjs';
import EventUrl from '../../../components/EventUrl';
import {
  useDeleteProgramMutation,
  useProgramQuery,
  useProgramsQuery,
} from '../../../generated/request';
import Layout from '../../../components/Layout';

const Loading = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Spinner size={48} />
    </div>
  );
};

const ProgramsItem: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, refetch, isFetched, isLoadingError } = useProgramQuery({
    id: parseInt(id as string, 10),
  });
  const deleteProgramMutation = useDeleteProgramMutation();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const closeModal = useCallback(
    () => setIsOpenDeleteModal(false),
    [setIsOpenDeleteModal]
  );
  const openModal = useCallback(
    () => setIsOpenDeleteModal(true),
    [setIsOpenDeleteModal]
  );
  const [startDateReverse, setStartDateReverse] = useState('');
  if (isLoadingError) {
    return <div>Not Found</div>;
  }
  const { name, date, url, ownerUrl, detail, location } = data?.program ?? {};
  const calendarUrl = new URL('https://www.google.com/calendar/event');
  calendarUrl.searchParams.append('action', 'TEMPLATE');
  if (name) {
    calendarUrl.searchParams.append('text', name);
  }
  calendarUrl.searchParams.append(
    'dates',
    `${dayjs.tz(date, 'UTC').tz('Asia/Tokyo').format('YYYYMMDDTHHmmss')}/${dayjs
      .tz(date, 'UTC')
      .tz('Asia/Tokyo')
      .add(1, 'hour')
      .format('YYYYMMDDTHHmmss')}`
  );
  if (detail) {
    calendarUrl.searchParams.append('details', detail);
  }
  calendarUrl.searchParams.append('trp', 'false');
  if (url) {
    calendarUrl.searchParams.append('sprop', url);
  }

  return (
    <Layout>
      {isFetched && data ? (
        <>
          <div className="mb-10 flex flex-col items-center px-2">
            <div className="w-full max-w-full text-slate-700 lg:w-96 ">
              <div className="self-start py-2">
                <Link className=" text-blue-500 " href="/programs">
                  ◁合わせ一覧に戻る
                </Link>
              </div>
              <div className="flex flex-col rounded-xl bg-white px-4 pt-4 pb-8">
                <h1 className="text-2xl font-bold">{name}</h1>
                <div className="align-center mt-2 flex flex-wrap justify-between">
                  <KABadge className="mb-1" size="small">
                    {dayjs
                      .tz(date, 'UTC')
                      .tz('Asia/Tokyo')
                      .format('D日(dd) HH:mm')}
                    ～
                  </KABadge>
                  <Link legacyBehavior passHref href={calendarUrl}>
                    <Button is="a" size="small" marginRight={majorScale(1)}>
                      Googleカレンダーに追加
                    </Button>
                  </Link>
                </div>
                {location && (
                  <div className="mt-4">
                    <h2 className="mb-1 text-xl font-bold">場所</h2>
                    <p>{location}</p>
                  </div>
                )}
                {url && (
                  <div className="mt-4">
                    <h2 className="mb-1 text-xl font-bold">リンク</h2>
                    <EventUrl className=" block" url={url} />
                  </div>
                )}
                {ownerUrl && (
                  <div className="mt-4">
                    <h2 className="mb-1 text-xl font-bold">主催者</h2>
                    <EventUrl url={ownerUrl} />
                  </div>
                )}
                {detail && (
                  <div className="mt-4">
                    <h2 className="mb-1 text-xl font-bold">詳細</h2>
                    <p>{nl2br(detail)}</p>
                  </div>
                )}
                <div className="my-6 border-t" />
                <div className="flex justify-end">
                  <Link
                    className="flex items-center justify-center rounded border border-slate-400 px-2 py-0.5 text-2xs"
                    href={`/programs/edit/${id}`}
                  >
                    編集する
                  </Link>
                  <button
                    className="ml-4 flex items-center justify-center rounded border border-red-400 px-2 py-0.5 text-2xs text-red-500"
                    onClick={openModal}
                  >
                    削除する
                  </button>
                </div>
              </div>
            </div>
          </div>
          <Transition appear show={isOpenDeleteModal} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                      <Dialog.Title
                        as="h3"
                        className="flex items-center text-lg font-medium leading-6 text-gray-900"
                      >
                        <TrashIcon
                          className="inline h-5 w-5 text-red-700"
                          aria-hidden="true"
                        />
                        本当に削除しますか？
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          一度削除すると元には戻せません。
                        </p>
                        <p>
                          削除する場合は、以下のフォームに開始日時を以下の形式で入力してください。
                        </p>
                        <p className="text-center">59:23 31-12-2023</p>
                        <p className="mt-4">
                          開始日時:{' '}
                          <span className="font-bold">
                            {dayjs
                              .tz(date, 'UTC')
                              .tz('Asia/Tokyo')
                              .format('YYYY-MM-DD HH:mm')}
                          </span>
                        </p>
                        <div className="mt-2">
                          <TextInputField
                            label="開始日時"
                            description="スペースを含めすべて半角で、逆順で入力してください。"
                            placeholder="59:23 31-12-2023"
                            required
                            value={startDateReverse}
                            onChange={(e: any) =>
                              setStartDateReverse(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between">
                        <Button>キャンセル</Button>
                        <Button
                          appearance="primary"
                          intent="danger"
                          disabled={
                            dayjs
                              .tz(date, 'UTC')
                              .tz('Asia/Tokyo')
                              .format('mm:HH DD-MM-YYYY') !== startDateReverse
                          }
                          onClick={async () => {
                            if (
                              dayjs
                                .tz(date, 'UTC')
                                .tz('Asia/Tokyo')
                                .format('mm:HH DD-MM-YYYY') !== startDateReverse
                            ) {
                              return;
                            }
                            await deleteProgramMutation.mutateAsync({
                              id: parseInt(id as string, 10),
                            });
                            router.push('/programs');
                          }}
                        >
                          削除する
                        </Button>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>
        </>
      ) : (
        <Loading />
      )}
    </Layout>
  );
};

export default ProgramsItem;
