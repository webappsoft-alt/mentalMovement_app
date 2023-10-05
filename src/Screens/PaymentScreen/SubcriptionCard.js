import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import style from '../../assets/css/style';
import { colors, fonts } from '../../constants';
import { useTranslation } from 'react-i18next';

const SubcriptionCard = ({
  title,
  price,
  onPress = () => '',
  selected,
  item,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: colors.white,
        height: 100,
        marginVertical: 10,
        borderRadius: 10,
        borderColor: item == selected ? colors.primaryColor : '#CFBA00',
        borderWidth: item == selected ? 4 : 1,
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: '#CFBA00',
          width: 60,
          borderRadius: 10,
          height: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={[style.font8Re, { color: colors.black }]}>
          {t('save 30% off')}
        </Text>
        {/* <Text style={[style.font8Re, { color: colors.black }]}>save 30% off</Text> */}
      </View>
      <View
        style={{
          marginVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={[
            style.font12Re,
            { color: colors.black, fontFamily: fonts.bold },
          ]}>
          {title}
        </Text>
        <Text
          style={[
            style.font12Re,
            { color: colors.black, fontFamily: fonts.bold },
          ]}>
          {price}
        </Text>
      </View>
      <Text style={[style.font10Re, { color: colors.black }]}>
        {t('trial')}
      </Text>
    </TouchableOpacity>
  );
};

export default SubcriptionCard;

const styles = StyleSheet.create({});
