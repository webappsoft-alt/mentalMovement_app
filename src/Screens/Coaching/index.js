import {
  StyleSheet,
  View,
  Platform,
} from 'react-native';
import React from 'react';
import { WebView } from 'react-native-webview';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const Coaching = () => {
  const webviewBackgroundColorScript = `
  const style = document.createElement('style');
  style.innerHTML = 'body { background-color: black !important; }';
  document.head.appendChild(style);
`;
  return (
    <View style={{ flex: 1, backgroundColor: 'black', paddingTop: getStatusBarHeight(), paddingBottom: Platform.OS == 'ios' ? 0 : getStatusBarHeight() + 30, paddingHorizontal: 16 }}>
      <WebView
        source={{
          uri: 'https://www.mental-movement.de/high-performance-coaching/',
        }}
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 50,
          backgroundColor: 'black',
        }}
        injectedJavaScriptBeforeContentLoaded={webviewBackgroundColorScript}
      />
    </View>
  );
};

export default Coaching;

const styles = StyleSheet.create({});
