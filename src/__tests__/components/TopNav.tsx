import { render } from '../../utils/testUtils';
import { getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNav from '../../components/TopNav';
it('should show a menu イベント, ログイン', () => {
  const { getByText } = render(<TopNav />);
  //expect(getByText('持ち物')).not.toBeInTheDocument();
  //expect(getByText('制作')).not.toBeInTheDocument();
  expect(getByText('合わせ一覧')).toBeInTheDocument();
  // expect(getByText('ログイン')).toBeInTheDocument();
});
it('should show a top logo', () => {
  const { getByAltText } = render(<TopNav />);
  expect(getByAltText('きぐあぷり')).toBeInTheDocument();
});
