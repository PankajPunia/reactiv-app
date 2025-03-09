import Data from '../data.json';
import {Product} from '../types/product-types';

export const fetchProductList = (): Promise<Product[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(Data as Product[]);
    }, 1000);
  });
};
