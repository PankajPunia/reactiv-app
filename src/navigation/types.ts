import {NavigatorScreenParams} from '@react-navigation/native';

export type BottomTabParamList = {
  Collection: NavigatorScreenParams<CollectionStackParamList>;
  Cart: undefined;
};

export type CollectionStackParamList = {
  ProductListScreen: undefined;
  ProductDetailsScreen: {productId: string; variantId: string};
};
