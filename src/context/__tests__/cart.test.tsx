import React, {PropsWithChildren} from 'react';
import {renderHook, act} from '@testing-library/react-native';
import {CartProvider, useCart, CartItem} from '../cart';

const wrapper: React.FC<PropsWithChildren> = ({children}) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  it('should add item to cart', () => {
    const {result} = renderHook(() => useCart(), {wrapper});

    const item: CartItem = {
      id: '1',
      title: 'Test Product',
      price: '10.00',
      imageUrl: 'test.jpg',
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0]).toEqual({...item, quantity: 1});
  });

  it('should increase quantity if item already exists in cart', () => {
    const {result} = renderHook(() => useCart(), {wrapper});

    const item: CartItem = {
      id: '1',
      title: 'Test Product',
      price: '10.00',
      imageUrl: 'test.jpg',
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
      result.current.addToCart(item);
    });

    expect(result.current.cartItems).toHaveLength(1);
    expect(result.current.cartItems[0].quantity).toBe(2);
  });

  it('should remove item from cart', () => {
    const {result} = renderHook(() => useCart(), {wrapper});

    const item: CartItem = {
      id: '1',
      title: 'Test Product',
      price: '10.00',
      imageUrl: 'test.jpg',
      quantity: 1,
    };

    act(() => {
      result.current.addToCart(item);
      result.current.removeFromCart(item.id);
    });

    expect(result.current.cartItems).toHaveLength(0);
  });
});
