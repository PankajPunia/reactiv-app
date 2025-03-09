import React from 'react';
import {
  Text,
  Image,
  StyleSheet,
  Pressable,
  Dimensions,
  PressableProps,
} from 'react-native';
import {ProductStatus} from '../../services/types/product-types';

const {width} = Dimensions.get('window');

interface ProductCardProps extends Pick<PressableProps, 'onPress'> {
  title: string;
  imageUrl: string;
  price: string;
  comparePrice?: string;
  status: ProductStatus;
  variant?: 'default' | 'large';
}

const ProductCard: React.FC<ProductCardProps> = ({
  onPress,
  title,
  imageUrl,
  price,
  comparePrice,
  status,
  variant = 'default',
}) => {
  const isLargeVariant = variant === 'large';

  return (
    <Pressable
      style={[styles.itemContainer, isLargeVariant && styles.largeContainer]}
      onPress={onPress}>
      <Image
        resizeMode="contain"
        source={
          imageUrl
            ? {uri: imageUrl}
            : require('../../../assets/images/no-image.png')
        }
        style={[styles.image, isLargeVariant && styles.largeImage]}
      />
      {status && (
        <Text
          style={[
            status === 'Sale' ? styles.sale : styles.soldOut,
            isLargeVariant && styles.largeText,
          ]}>
          {status}
        </Text>
      )}
      <Text style={[styles.title, isLargeVariant && styles.largeText]}>
        {title}
      </Text>
      {comparePrice ? (
        <Text style={[styles.comparePrice, isLargeVariant && styles.largeText]}>
          {comparePrice}
        </Text>
      ) : null}
      <Text style={[styles.price, isLargeVariant && styles.largeText]}>
        {price}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginVertical: 8,
    width: width * 0.45,
  },
  largeContainer: {
    width: '100%',
  },
  image: {
    width: width * 0.4,
    height: width * 0.4,
    alignSelf: 'center',
  },
  largeImage: {
    width: width,
    height: width,
  },
  title: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 12,
  },
  largeText: {
    fontSize: 16,
  },
  comparePrice: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 12,
    textDecorationLine: 'line-through',
    color: 'grey',
  },
  price: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 14,
  },
  sale: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 12,
    color: 'green',
  },
  soldOut: {
    textAlign: 'left',
    marginTop: 4,
    fontSize: 12,
    color: 'red',
  },
});

export default ProductCard;
