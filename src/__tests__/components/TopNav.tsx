import { render } from '../../utils/testUtils';
import { getByText } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopNav from '../../components/TopNav';
it('should show a menu 持ち物, 制作, ログイン', () => {
  const { getByText } = render(<TopNav />);
  expect(getByText('持ち物')).toBeInTheDocument();
  expect(getByText('制作')).toBeInTheDocument();
});
it('should show a top logo', () => {
  const { getByAltText } = render(<TopNav />);
  expect(getByAltText('きぐあぷり')).toBeInTheDocument();
});
