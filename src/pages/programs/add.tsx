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
import Layout from '../../components/Layout';
import {
  useAddProgramMutation,
  useBelongingsQuery,
  useProgramsQuery,
} from '../../generated/request';
import { useCallback, createRef, useState } from 'react';
import { useRouter } from 'next/router';

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
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>();
  const addProgramMutation = useAddProgramMutation();
  const [recaptchaSuccess, setRecaptchaSuccess] = useState(false);
  const [url, setUrl] = useState('');

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
        <Pane className="flex pr-2 pl-2 flex-col items-left max-w-2xl mt-8 mb-8 w-full">
          <Heading marginBottom={majorScale(2)} size={700} is="h1">
            合わせを追加する
          </Heading>
          <div className="flex w-full flex-col md:flex-row justify-between text-slate-800">
            <div className="flex w-full flex-col mb-2 lg:w-64 mr-1 ml-1 p-2 bg-white rounded-md flex-1">
              <Heading size={600} is="h2">
                TwiplaのURLから追加する
              </Heading>
              <TextInputField
                description="TwiplaのURLから直接追加できます。"
                placeholder="https://twipla.jp/events/000000"
                value={url}
                onChange={(e: any) => setUrl(e.target.value)}
              />
              <Button
                appearance="primary"
                disabled={!url.match(/https:\/\/twipla\.jp\/events\/\d+/)}
                onClick={() => {
                  router.push(`/programs/add/details?url=${url}`);
                }}
              >
                TwiplaのURLから追加
              </Button>
            </div>
            <div className="flex flex-col w-full lg:w-64 mr-1 ml-1 p-2 bg-white rounded-md flex-1">
              <Heading size={600} is="h2">
                直接入力する
              </Heading>
              <p>フォームに直接入力して実行できます。</p>
              <Link legacyBehavior passHref href="/programs/add/details">
                <Button is="a" alignSelf="center" width="100%" marginTop="auto">
                  直接入力する
                </Button>
              </Link>
            </div>
          </div>
        </Pane>
      </div>
    </Layout>
  );
};

export default Belongings;
