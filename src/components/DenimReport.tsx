import { DenimReport } from '../lib/graphql';

type Props = {
  denimReport: DenimReport;
};
const DenimReport: React.FC<Props> = ({ denimReport }) => {
  return <div>{denimReport.id}</div>;
};

export default DenimReport;
