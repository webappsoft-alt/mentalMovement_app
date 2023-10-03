import { Platform } from "react-native";

export const ANNUAL_SUBSCRIPTION = Platform.select({ ios: '', android: 'com.beyouid.001' });
export const MONTHLY_SUBSCRIPTION = Platform.select({ ios: '', android: 'com.beyouid.002' });

export const ITEM_SKUS = ['com.mentalmovement.001c', 'com.mentalmovement.002c'];

export const formatAMPM = date => {
     var hours = date.getHours();
     var minutes = date.getMinutes();
     var ampm = hours >= 12 ? 'PM' : 'AM';
     hours = hours % 12;
     hours = hours ? hours : 12; // the hour '0' should be '12'
     minutes = minutes < 10 ? '0' + minutes : minutes;
     var strTime = hours + ':' + minutes + ' ' + ampm;
     return strTime;
};

