import {useQuery} from '@tanstack/react-query';
import {fetchProductList} from '../product-service';

export const useProductList = () => {
  const {data, isLoading, isError} = useQuery({
    queryKey: ['productList'],
    queryFn: fetchProductList,
  });

  return {
    data,
    isLoading,
    isError,
  };
};
