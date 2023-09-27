import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import style from '../../assets/css/style';
import { useNavigation } from '@react-navigation/native';

function MainHeader({ title = '', icon = <View /> }) {
     const navigation = useNavigation()
     return (
          <View style={[style.Headercontainer, style.AppPadding]}>
               <TouchableOpacity onPress={() => navigation.goBack()}>
                    {/* <Icon
                         name='arrowleft'
                         type='antdesign'
                    /> */}
               </TouchableOpacity>
               <Text style={style.headertext}>{title}</Text>
               {icon}
          </View>
     );
}

export default MainHeader;