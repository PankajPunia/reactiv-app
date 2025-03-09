import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTabs from './src/navigation/BottomStack';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {CartProvider} from './src/context/cartContext';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        animated={true}
        backgroundColor="white"
        barStyle={'dark-content'}
      />
      <CartProvider>
        <NavigationContainer>
          <BottomTabs />
        </NavigationContainer>
      </CartProvider>
    </QueryClientProvider>
  );
}

export default App;
