import React, {
  createContext,
  useState,
  useContext,
  PropsWithChildren,
} from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

const CartProvider: React.FC<PropsWithChildren> = ({children}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = React.useCallback((item: CartItem) => {
    setCartItems(prevCartItems => {
      const updatedCart = [...prevCartItems];
      const existingItemIndex = updatedCart.findIndex(
        cartItem => cartItem.id === item.id,
      );

      if (existingItemIndex !== -1) {
        updatedCart[existingItemIndex].quantity += 1;
      } else {
        updatedCart.push({...item, quantity: 1});
      }

      return updatedCart;
    });
  }, []);

  const removeFromCart = React.useCallback((itemId: string) => {
    setCartItems(prevCartItems =>
      prevCartItems.filter(item => item.id !== itemId),
    );
  }, []);

  const value = React.useMemo(
    () => ({cartItems, addToCart, removeFromCart}),
    [addToCart, cartItems, removeFromCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export {CartProvider, useCart};
