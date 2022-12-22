import Link from 'next/link';

const PageFooter = () => {
  return (
    <small className="text-slate-500 text-center w-full block mt-auto mb-1">
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
