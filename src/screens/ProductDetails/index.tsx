import React, {useState} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
} from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import {RouteProp, useRoute} from '@react-navigation/native';
import {CollectionStackParamList} from '../../navigation/types';
import {useProductList} from '../../services/api/hooks/useProductList';
import {
  getDropdownOptions,
  getPriceString,
  getProductById,
  getProductStatus,
  getVariantById,
} from '../../utils/helpers/product';
import ProductCard from '../../components/ProductCard';
import Button from '../../components/Button';
import {useCart} from '../../context/cartContext';
import Dropdown from '../../components/Dropdown';

const ProductDetailsScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<CollectionStackParamList, 'ProductDetailsScreen'>>();

  const [variantId, setVariantId] = useState<string>(route.params.variantId);

  const {addToCart} = useCart();

  const productId = route.params.productId;

  const {data: productList, isError, isLoading} = useProductList();

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
          <Text>Error loading product details</Text>
        </View>
      </ScreenContainer>
    );
  }

  const product = getProductById(productId, productList);
  const variant = getVariantById(variantId, product);

  if (!product || !variant) {
    return (
      <ScreenContainer>
        <View style={styles.loaderContainer}>
          <Text>Product not found</Text>
        </View>
      </ScreenContainer>
    );
  }

  const status = getProductStatus(variant);
  const price = getPriceString(variant);
  const dropdownOptions = getDropdownOptions(product);

  const handleAddToCart = () => {
    const cartItem = {
      id: variant.id,
      title: product.title,
      imageUrl: variant.image.url,
      price,
      quantity: 1,
    };

    addToCart(cartItem);
  };

  return (
    <ScreenContainer>
      <ScrollView>
        <ProductCard
          status={status}
          title={product.title}
          imageUrl={variant.image.url}
          price={price}
          variant="large"
        />
        <Dropdown
          data={dropdownOptions}
          value={variantId}
          setValue={setVariantId}
        />
        <Text style={styles.description}>{product.description}</Text>
      </ScrollView>
      <Button
        disabled={status === 'Sold Out'}
        title="Add to Cart"
        onPress={handleAddToCart}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  description: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 14,
    color: 'grey',
  },
});

export default ProductDetailsScreen;
