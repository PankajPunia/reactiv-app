import React from 'react';
import {View, Text, FlatList, Image, StyleSheet, Alert} from 'react-native';
import {CartItem, useCart} from '../../context/cart';
import ScreenContainer from '../../components/ScreenContainer';
import Button from '../../components/Button';

const CartScreen = () => {
  const {cartItems, removeFromCart} = useCart();

  const handleRemoveItem = (itemId: string) => {
    Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item from your cart?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => removeFromCart(itemId),
        },
      ],
    );
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace('$', ''));
      return total + itemPrice * item.quantity;
    }, 0);
  };

  const renderCartItem = ({item}: {item: CartItem}) => {
    return (
      <View style={styles.cartItem}>
        <Image
          source={{uri: item.imageUrl}}
          style={styles.itemImage}
          resizeMode="contain"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemPrice}>
            {item.quantity} x {item.price}
          </Text>
        </View>
        <Button title="Remove" onPress={() => handleRemoveItem(item.id)} />
      </View>
    );
  };

  return (
    <ScreenContainer>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderCartItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}

      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>
            Total: ${calculateTotal().toFixed(2)}
          </Text>
        </View>
      )}
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 50,
  },
  listContainer: {
    paddingBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 14,
    color: 'grey',
  },
  totalContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'flex-end',
    marginTop: 20,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CartScreen;
