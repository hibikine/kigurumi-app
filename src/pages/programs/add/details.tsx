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
  useProgramsQuery,
  useTwiplaQuery,
} from '../../../generated/request';
import { useCallback, createRef, useState } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';
import Timezone from 'dayjs/plugin/timezone';
import UTC from 'dayjs/plugin/utc';

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
  const { data, refetch } = useProgramsQuery();
  const router = useRouter();

  const addProgramMutation = useAddProgramMutation();
  // 一時的に無効化
  const [recaptchaSuccess, setRecaptchaSuccess] = useState(true);

  const { url } = router.query;
  const twiplaUrl =
    typeof url === 'string' &&
    url.match(/^https:\/\/twipla\.jp\/events\/(\d+)/);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const { data: twiplaData } = useTwiplaQuery(
    { id: twiplaUrl ? parseInt(twiplaUrl[1], 10) : -1 },
    {
      enabled: !!twiplaUrl,
      onSuccess: (data) => {
        if (data.twipla?.name) {
          setValue('name', data.twipla.name);
        }
        if (data.twipla?.date) {
          setValue(
            'date',
            dayjs(data.twipla.date).tz('Asia/Tokyo').format('YYYY-MM-DDTHH:mm')
          );
        }
        if (data.twipla?.detail) {
          setValue('detail', data.twipla.detail);
        }
        if (data.twipla?.url) {
          setValue('url', data.twipla.url);
        }
        if (data.twipla?.ownerUrl) {
          setValue('ownerUrl', data.twipla.ownerUrl);
        }
      },
    }
  );

  const onSubmit = handleSubmit(async (data) => {
    if (!recaptchaSuccess) {
      return;
    }
    try {
      await addProgramMutation.mutateAsync(data);
    } catch (e) {
      throw e;
    }
    router.push('/programs');
  });

  if (typeof data === 'undefined') {
    return null;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center">
        <Pane className="flex pl-2 pr-2 flex-col items-left max-w-2xl mt-8 mb-8 w-full">
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
            <Button
              className="w-full mb-16"
              appearance="primary"
              alignSelf="center"
              display="block"
              size="large"
            >
              追加
            </Button>
          </form>
        </Pane>
      </div>
    </Layout>
  );
};

export default Belongings;
