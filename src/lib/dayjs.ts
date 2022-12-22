import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import UTC from 'dayjs/plugin/utc';
import Timezone from 'dayjs/plugin/timezone';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import CustomParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(UTC);
dayjs.extend(Timezone);
dayjs.extend(LocalizedFormat);
dayjs.extend(CustomParseFormat);

dayjs.locale('ja');

export default dayjs;
