import { useQuery } from '@tanstack/react-query';
import getAll from './service.js';
const Example = () => {
  const query = useQuery({
    queryKey: ['repoData'],
    queryFn: getAll.getAll(),
  });
  console.log('query', query);

  return <></>;
};

export default Example;
