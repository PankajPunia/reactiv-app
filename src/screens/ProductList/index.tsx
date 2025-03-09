import React, {useCallback} from 'react';
import {
  FlatList,
  Text,
  Dimensions,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

import ScreenContainer from '../../components/ScreenContainer';
import ProductCard from '../../components/ProductCard';
import {useNavigation} from '@react-navigation/native';
import {useProductList} from '../../services/api/hooks/useProductList';
import {Product} from '../../services/types/product-types';
import {
  getComparePrice,
  getDefaultVariant,
  getPrice,
  getProductStatus,
} from '../../utils/helpers/product';

const {width} = Dimensions.get('window');

const ProductListScreen = () => {
  const navigation = useNavigation();
  const {data: productList, isError, isLoading} = useProductList();

  const renderItem = useCallback(
    ({item}: {item: Product}) => {
      const defaultVariant = getDefaultVariant(item);
      const productStatus = getProductStatus(defaultVariant);
      const price = getPrice(defaultVariant, item);
      const comparePrice = getComparePrice(defaultVariant);

      return (
        <ProductCard
          status={productStatus}
          title={item.title}
          imageUrl={defaultVariant.image.url}
          price={price}
          comparePrice={comparePrice}
          onPress={() =>
            navigation.navigate('Collection', {
              screen: 'ProductDetailsScreen',
              params: {productId: item.id, variantId: defaultVariant.id},
            })
          }
        />
      );
    },
    [navigation],
  );

  if (isLoading) {
    return (
      <ScreenContainer>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
          <Text>Loading...</Text>
        </View>
      </ScreenContainer>
    );
  }

  if (isError) {
    return (
      <ScreenContainer>
        <View style={styles.loaderContainer}>
          <Text>Something went wrong</Text>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer>
      <FlatList
        contentContainerStyle={styles.flatListContentContainer}
        data={productList}
        renderItem={renderItem}
        numColumns={2}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    width: width * 0.45,
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
  },
  title: {
    textAlign: 'left',
    marginTop: 4,
  },
  flatListContentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductListScreen;
