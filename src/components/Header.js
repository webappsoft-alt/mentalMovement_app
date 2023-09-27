import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import {colors, fonts} from '../constants';
import style from '../assets/css/style';
import {useNavigation} from '@react-navigation/native';

const Header = ({
  showShadow,
  showBorderRadius,
  title,
  transparentBackground,
}) => {
  const navigation = useNavigation();
  const containerStyles = [
    styles.container,
    showShadow && styles.shadow,
    showBorderRadius && styles.borderRadius,
    transparentBackground ? {backgroundColor: 'transparent'} : null,
  ];

  const iconColor = transparentBackground ? colors.white : colors.primaryColor;
  const titleColor = transparentBackground ? colors.white : colors.black;

  return (
    <View style={containerStyles}>
      <Text style={[style.subTitle, {color: titleColor}]}>{title}</Text>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Icon name="arrow-left" color={iconColor} size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
    marginLeft: -20,
  },
  shadow: {
    shadowColor: '#000',
    shadowOpacity: 0.18,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowRadius: 1.0,
    elevation: 4,
  },
  borderRadius: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconContainer: {
    position: 'absolute',
    left: 20,
    zIndex: 1,
    padding: 10,
  },
});

export default Header;
