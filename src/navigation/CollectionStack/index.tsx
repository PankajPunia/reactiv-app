import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductListScreen from '../../screens/ProductList';
import ProductDetailsScreen from '../../screens/ProductDetails';
import {CollectionStackParamList} from '../types';

const Stack = createNativeStackNavigator<CollectionStackParamList>();

const CollectionStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProductListScreen" component={ProductListScreen} />
      <Stack.Screen
        name="ProductDetailsScreen"
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
};

export default CollectionStack;
