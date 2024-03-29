import {
  Card,
  Icon,
  majorScale,
  Heading,
  Paragraph,
  useTheme,
  IconComponent,
} from 'evergreen-ui';

type Props = {
  icon: IconComponent;
  title: string;
  description: string;
};
const ValueCard = ({ icon, title, description }: Props) => {
  const { colors } = useTheme() as any;

  return (
    <Card
      display="flex"
      flexDirection="column"
      marginX={majorScale(2)}
      alignItems="center"
      marginBottom={majorScale(4)}
      paddingBottom={majorScale(2)}
    >
      <Icon
        icon={icon}
        size={majorScale(3)}
        borderRadius="50%"
        padding={majorScale(2)}
        color={colors.blue500}
        backgroundColor={colors.blue50}
        marginBottom={majorScale(4)}
      />
      <Heading size={600} marginBottom={majorScale(1)}>
        {title}
      </Heading>
      <Paragraph size={500}>{description}</Paragraph>
    </Card>
  );
};
export default ValueCard;
