import { Platform } from "react-native";

export const ANNUALLY_REPORT = Platform.select({ ios: 'com.mentalmovement.002c', android: 'com.mentalmovement.002' });
export const MONTHLY_REPORT = Platform.select({ ios: 'com.mentalmovement.001c', android: 'com.mentalmovement.001' });

// export const ITEM_SKUS = ['com.mentalmovement.001', 'com.mentalmovement.002'];
export const ITEM_SKUS = [MONTHLY_REPORT, ANNUALLY_REPORT];

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

