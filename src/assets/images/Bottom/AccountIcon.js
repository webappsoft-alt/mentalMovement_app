import * as React from 'react';
import Svg, {Path, Circle} from 'react-native-svg';
import {memo} from 'react';
import {colors} from '../../../constants';
const AccountIcon = ({focused = false}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={17} height={19} fill="none">
    <Path
      // stroke="#8C8C8C"
      stroke={focused ? colors.primaryColor : colors.gray}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.8 17.65V15.8a3.7 3.7 0 0 0-3.7-3.7H4.7A3.7 3.7 0 0 0 1 15.8v1.85"
    />
    <Circle
      cx={8.4}
      cy={4.7}
      r={3.7}
      stroke={focused ? colors.primaryColor : colors.gray}
      // stroke="#8C8C8C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
    />
  </Svg>
);

export default memo(AccountIcon);
