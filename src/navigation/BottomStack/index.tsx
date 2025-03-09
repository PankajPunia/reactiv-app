import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import CollectionStack from '../CollectionStack';
import CartScreen from '../../screens/Cart';
import {BottomTabParamList} from '../types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Collection"
        component={CollectionStack}
        options={{headerShown: false}}
      />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
