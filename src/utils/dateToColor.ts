import type { Dayjs } from 'dayjs';
const dateToColor = (date: Dayjs): 'purple' | 'fuchsia' | 'pink' | 'rose' => {
  if (date.isSame('2023-01-05', 'day')) {
    return 'purple';
  }
  if (date.isSame('2023-01-06', 'day')) {
    return 'fuchsia';
  }
  if (date.isSame('2023-01-07', 'day')) {
    return 'pink';
  }
  if (date.isSame('2023-01-08', 'day')) {
    return 'rose';
  }
  return 'pink';
};
export default dateToColor;
