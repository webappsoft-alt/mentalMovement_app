import * as React from 'react';
import {StatusBar} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

function FocusAwareStatusBar(props) {
  const isFocused = useIsFocused();

  return isFocused ? <StatusBar {...props} /> : null;
}

export default FocusAwareStatusBar;

// how to use.....
{
  /* <FocusAwareStatusBar
animated={true}
backgroundColor="{'required bg color'}"
barStyle={'dark-content'}
/> */
}
