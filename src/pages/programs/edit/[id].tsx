import { useForm } from 'react-hook-form';
import ReCAPTCHA from 'react-google-recaptcha';
import {
  Button,
  FormField,
  Pane,
  Table,
  majorScale,
  TextInputField,
  Heading,
  Textarea,
  TextareaField,
} from 'evergreen-ui';
import Link from 'next/link';
import type { NextPage } from 'next';
import Layout from '../../../components/Layout';
import {
  useAddProgramMutation,
  useBelongingsQuery,
  useProgramQuery,
  useProgramsQuery,
  useTwiplaQuery,
  useUpdateProgramMutation,
} from '../../../generated/request';
import { useCallback, createRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import UTC from 'dayjs/plugin/utc';
import Timezone from 'dayjs/plugin/timezone';

dayjs.extend(Timezone);
dayjs.extend(UTC);

type FormData = {
  name: string;
  date: string;
  endDate?: string;
  detail: string;
  location: string;
  url: string;
  ownerUrl: string;
};

const Belongings: NextPage = () => {
  const router = useRouter();

  const updateProgramMutation = useUpdateProgramMutation();
  // 一時的に無効化
  const [recaptchaSuccess, setRecaptchaSuccess] = useState(true);

  const { id } = router.query;

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { data, refetch } = useProgramQuery(
    { id: parseInt(id as string, 10) },
    {
      enabled: !!id,
      onSuccess: (data) => {
        setValue('name', data?.program?.name ?? '');
        setValue(
          'date',
          data?.program?.date
            ? dayjs(data.program.date)
                .tz('Asia/Tokyo')
                .format('YYYY-MM-DDTHH:mm')
            : ''
        );
        setValue(
          'endDate',
          data?.program?.endDate
            ? dayjs(data.program.endDate)
                .tz('Asia/Tokyo')
                .format('YYYY-MM-DDTHH:mm')
            : ''
        );
        setValue('detail', data?.program?.detail ?? '');
        setValue('location', data?.program?.location ?? '');
        setValue('url', data?.program?.url ?? '');
        setValue('ownerUrl', data?.program?.ownerUrl ?? '');
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    if (!recaptchaSuccess) {
      return;
    }
    try {
      console.log('a');
      await updateProgramMutation.mutateAsync({
        ...data,
        date: dayjs.tz(data.date, 'Asia/Tokyo').toISOString(),
        endDate: data.endDate
          ? dayjs.tz(data.endDate, 'Asia/Tokyo').toISOString()
          : data.endDate,
        id: parseInt(id as string, 10),
      });
    } catch (e) {
      throw e;
    }
    console.log('updated');
    router.push(`/programs/item/${id}`);
  });

  if (typeof data === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Pane className="flex flex-col items-left max-w-2xl mt-8 mb-8 w-full">
          <Heading marginBottom={majorScale(2)} size={700} is="h1">
            合わせを追加する
          </Heading>
          <form onSubmit={onSubmit}>
            <TextInputField
              label="イベント名"
              description="合わせの名前を入力してください。"
              placeholder="○○合わせ"
              isRequired
              {...register('name', { required: true })}
            />
            <FormField
              marginBottom={24}
              label="開始日時"
              isRequired
              labelFor="date"
            >
              <input
                className="text-slate-900"
                type="datetime-local"
                id="date"
                {...register('date', { required: true })}
              />
            </FormField>
            <FormField marginBottom={24} label="終了日時" labelFor="endDate">
              <input
                className="text-slate-900"
                type="datetime-local"
                id="endDate"
                {...register('endDate')}
              />
              <Button
                type="button"
                marginLeft={majorScale(2)}
                size="small"
                onClick={() => reset({ endDate: undefined })}
              >
                終了日時を設定しない
              </Button>
            </FormField>
            <TextInputField
              label="開催場所"
              description="集合場所や撮影場所を記入してください。"
              placeholder="中庭"
              {...register('location')}
            />
            <TextInputField
              label="合わせのURL"
              description="TwiplaやツイートのURLを入力してください。"
              placeholder="https://twipla.jp/events/000000"
              type="url"
              {...register('url')}
            />
            <TextInputField
              label="主催者のURL"
              description="TwitterなどのURLを入力してください。"
              placeholder="https://twitter.com/hikageworks"
              type="url"
              {...register('ownerUrl')}
            />
            <TextareaField
              label="イベント詳細"
              {...register('detail')}
              inputHeight={200}
            />
            <div className="mb-4">
              {/*<ReCAPTCHA
                onChange={() => setRecaptchaSuccess(true)}
                onErrored={() => setRecaptchaSuccess(false)}
                onExpired={() => setRecaptchaSuccess(false)}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
  />*/}
            </div>
            <Button appearance="primary" alignSelf="center" display="block">
              更新
            </Button>
          </form>
        </Pane>
      </div>
    </Layout>
  );
};

export default Belongings;
