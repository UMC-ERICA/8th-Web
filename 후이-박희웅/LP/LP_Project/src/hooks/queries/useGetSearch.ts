import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const getLpList = async () => {
  const res = await axios.get('/v1/lps');
  return res.data.data;
};

const useGetSearch = () => {
  return useQuery({
    queryKey: ['searchList'],
    queryFn: getLpList,
  });
};

export default useGetSearch;
