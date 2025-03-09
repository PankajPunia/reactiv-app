import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

interface ScreenContainerProps {
  children: React.ReactNode;
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({children}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewContainer}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  viewContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
});

export default ScreenContainer;
