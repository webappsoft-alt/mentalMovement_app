import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native';
import React from 'react';
fonts;
import { LoadingIndicator } from './LoadingIndicator';
import { colors, fonts } from '../constants';
import FocusAwareStatusBar from './FocusAwareStatusBar/FocusAwareStatusBar';
import { getStatusBarHeight } from 'react-native-status-bar-height';
const Container = ({ children, customStyle, loading = false }) => {
  return (
    <>
      <FocusAwareStatusBar
        animated={true}
        barStyle={'light-content'}
        backgroundColor={'black'}
        translucent={true}
      />
      <View style={[styles.container, customStyle]}>{children}</View>
      {loading && <LoadingIndicator />}
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    paddingTop: Platform.OS == 'ios' ? getStatusBarHeight() : 0,
    paddingHorizontal: 14,
    paddingBottom: 0,
    flexGrow: 1,
  },
});
