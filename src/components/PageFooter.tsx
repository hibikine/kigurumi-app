import Link from 'next/link';

const PageFooter = () => {
  return (
    <small className="mt-auto mb-1 block w-full text-center text-slate-500">
      &copy; 2022{' '}
      <Link
        className="underline hover:text-slate-600"
        href="https://twitter.com/hikageworks"
      >
        Hikage Works
      </Link>
    </small>
  );
};
export default PageFooter;
