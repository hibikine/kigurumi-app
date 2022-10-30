import {
  Pane,
  Heading,
  Paragraph,
  majorScale,
  Tablist,
  Tab,
} from 'evergreen-ui';
import { useRouter } from 'next/router';

type TabProps = {
  label: string;
  to: string;
};
type Props = {
  title: string;
  description?: string;
  tabs?: TabProps[];
};
const PageHeader = ({ title, description, tabs }: Props) => {
  const router = useRouter();
  return (
    <Pane
      display="flex"
      width="100%"
      justifyContent="space-between"
      flexDirection="column"
      alignItems="flex-start"
    >
      <Pane
        display="flex"
        width="100%"
        justifyContent="space-between"
        marginBottom={majorScale(4)}
      >
        <Pane>
          <Heading size={900} marginBottom={majorScale(1)}>
            {title}
          </Heading>
          {description && <Paragraph>{description}</Paragraph>}
        </Pane>
      </Pane>
      {tabs && (
        <Tablist
          width="100%"
          borderBottom="1px solid #efefef"
          marginBottom={majorScale(2)}
          paddingTop={majorScale(1)}
        >
          {tabs.map(({ label, to }, i) => (
            <Tab
              appearance="primary"
              isSelected={router.asPath === to}
              key={i}
              onSelect={() => router.push(to)}
            >
              {label}
            </Tab>
          ))}
        </Tablist>
      )}
    </Pane>
  );
};
export default PageHeader;
