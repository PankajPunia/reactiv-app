import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown as RNDropdown} from 'react-native-element-dropdown';

interface DropdownProps {
  data: {value: string; label: string}[];
  value: string;
  setValue: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({data, value, setValue}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <View style={styles.container}>
      <RNDropdown
        style={[styles.dropdown, isFocus && styles.border]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={200}
        labelField="label"
        valueField="value"
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default Dropdown;

const styles = StyleSheet.create({
  border: {
    borderColor: 'blue',
  },
  container: {
    backgroundColor: 'white',
    paddingVertical: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
