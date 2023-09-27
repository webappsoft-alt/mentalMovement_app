// // import {StyleSheet, TextInput, View, Text, Platform} from 'react-native';
// // import React, {useState} from 'react';
// // import {colors} from '../../constraints';

// // const AppTextInput = ({
// //   placeholder,
// //   placeholderTextColor = colors.neutralDarkThree,
// //   keyboardType = 'default',
// //   titleText,
// //   text,
// //   onChangeText,
// //   onChange,
// //   secureTextEntry,
// //   containerStyles,
// //   value,
// //   multiline = false,
// //   otherPops,
// //   editable = true,
// //   onSubmitEditing = () => '',
// // }) => {
// //   const [isFocused, setIsFocused] = useState(false);
// //   const handleFocus = () => {
// //     setIsFocused(true);
// //   };

// //   const handleBlur = () => {
// //     setIsFocused(false);
// //   };
// //   // isFocused ? 'yellow' : 'white';
// //   return (
// //     <View
// //       style={[
// //         styles.container,
// //         containerStyles,
// //         isFocused ? {borderBottomColor: colors.primaryColor} : {},
// //       ]}>
// //       {/* <Text style={{ paddingLeft: -2 }}>{titleText}</Text> */}
// //       <TextInput
// //         editable={editable}
// //         placeholder={placeholder}
// //         keyboardType={keyboardType}
// //         onChangeText={onChangeText}
// //         value={value}
// //         onFocus={handleFocus}
// //         onBlur={handleBlur}
// //         onChange={onChange}
// //         onSubmitEditing={onSubmitEditing}
// //         multiline={multiline}
// //         secureTextEntry={secureTextEntry}
// //         placeholderTextColor={placeholderTextColor}
// //         style={[styles.textInput, containerStyles]}
// //         {...otherPops}
// //       />
// //     </View>
// //   );
// // };

// // export default AppTextInput;

// // const styles = StyleSheet.create({
// //   container: {
// //     marginBottom: 10,
// //     //backgroundColor:"red",
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderBottomColor: colors.neutralDarkNine,
// //     borderBottomWidth: 1,
// //     width: '100%',
// //     paddingBottom: Platform.OS === 'ios' ? 5 : 0,
// //     paddingTop: Platform.OS === 'ios' ? 5 : 0,
// //   },
// //   textInput: {
// //     // padding: 5,
// //     fontSize: 16,
// //     // width: deviceWidth - 30,
// //     color: colors.white,
// //     // backgroundColor: 'red',
// //     paddingLeft: -4,
// //     width: '100%',
// //   },
// // });

// import React from 'react';
// import {
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   View,
// } from 'react-native';

// import Icon from 'react-native-vector-icons/Ionicons';
// import {colors, fonts} from '../../constraints';
// import style from '../../assets/css/style';

// const AppTextInput = ({
//   placeholderTextColor = colors.neutralDarkThree,
//   titleText,
//   keyboardType = 'default',
//   onChange,
//   error,
//   onChangeText,
//   value,
//   placeholder,
//   KT,
//   editable,
//   onEndEditing,
//   customStyle,
//   customInputStyle,
//   secureTextEntry,
//   isSecureText,
//   setIsSecureText,
//   setIsSecureText1,
//   password,
//   multiline,
//   otherPops,
// }) => {
//   return (
//     <View style={{width: '100%'}}>
//       <Text
//         style={[
//           style.font16Re,
//           customStyle,
//           {fontFamily: fonts.medium, marginBottom: 5},
//         ]}>
//         {titleText}
//       </Text>
//       <View
//         style={{
//           // flex: 1,
//           flexDirection: 'row',
//           alignItems: 'center',
//           marginBottom: 13,
//           paddingHorizontal: 15,
//           borderWidth: 1,
//           borderColor: '#E0E0E0',
//           // borderColor: colors.line,
//           backgroundColor: '#F5F5F5',
//           // backgroundColor: '#DADADA',
//           borderRadius: 10,
//           // height: multiline ? 100 : 55,
//         }}>
//         <TextInput
//           placeholder={placeholder}
//           onEndEditing={onEndEditing}
//           value={value}
//           onChangeText={onChangeText}
//           style={[
//             styles.textInput,
//             customInputStyle,
//             // {height: multiline ? 110 : 55, alignItems: 'flex-start'},
//           ]}
//           keyboardType={keyboardType}
//           secureTextEntry={secureTextEntry}
//           editable={editable}
//           multiline={multiline}

//           // placeholderTextColor={'black'}
//         />
//         {password ? (
//           <TouchableOpacity
//             onPress={() => setIsSecureText(prev => !prev)}
//             style={{position: 'absolute', right: 10}}>
//             <Icon
//               name={secureTextEntry ? 'eye-off' : 'eye'}
//               color={'black'}
//               size={24}
//             />
//           </TouchableOpacity>
//         ) : null}
//       </View>
//     </View>
//   );
// };

// export default AppTextInput;

// const styles = StyleSheet.create({
//   textInput: {
//     width: '100%',
//     // height: 50,
//     fontSize: 16,
//     paddingLeft: -10,
//     color: colors.gray,

//     fontFamily: fonts.regular,
//     // flex: 1,
//   },
//   label: {
//     fontFamily: fonts.bold,
//     fontSize: 12,
//     color: colors.gray3,
//     marginBottom: 7,
//   },
//   error: {
//     color: '#900',
//     fontFamily: fonts.regular,
//     fontSize: 14,
//     marginTop: -10,
//     marginBottom: 10,
//   },
// });

import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import style from '../../assets/css/style';
import {colors, fonts} from '../../constants';

const AppTextInput = ({
  placeholderTextColor = colors.neutralDarkThree,
  titleText,
  keyboardType = 'default',
  onChange,
  error,
  onChangeText,
  value,
  placeholder,
  KT,
  editable,
  onEndEditing,
  customStyle,
  customInputStyle,
  secureTextEntry,
  isSecureText,
  setIsSecureText,
  setIsSecureText1,
  password,
  multiline,
  otherPops,
}) => {
  return (
    <View style={{width: '100%'}}>
      {titleText && (
        <Text
          style={[
            style.font16Re,
            customStyle,
            {fontFamily: fonts.medium, marginBottom: multiline ? 25 : 2},
          ]}>
          {titleText}
        </Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 8,
          paddingHorizontal: 15,
          borderWidth: 1,
          borderColor: '#E0E0E0',
          backgroundColor: '#F5F5F5',
          borderRadius: 10,
        }}>
        <TextInput
          placeholder={placeholder}
          onEndEditing={onEndEditing}
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.textInput,
            customInputStyle,
            {
              textAlignVertical: multiline ? 'top' : 'center',
              height: multiline ? 150 : 45,
            },
          ]}
          // textAlignVertical={'top'}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          // numberOfLines={4}
          multiline={multiline}
        />
        {password && (
          <TouchableOpacity
            onPress={() => setIsSecureText(prev => !prev)}
            style={{position: 'absolute', right: 10}}>
            <Icon
              name={secureTextEntry ? 'eye-off' : 'eye'}
              color={'black'}
              size={24}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default AppTextInput;

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    fontSize: 16,
    paddingLeft: -10,
    color: colors.gray,
    fontFamily: fonts.regular,
  },
});
