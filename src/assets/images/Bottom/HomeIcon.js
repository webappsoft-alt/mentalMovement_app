import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
const HomeIcon = ({focused = false}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="red">
    <Path
      fill="#000FFF"
      stroke="#000FFF"
      //   fill={focused ? '#000' : colors.gray}
      //   stroke={focused ? '#000' : colors.gray}
      d="M9.608 1.365.922 10.052a.25.25 0 0 1-.354-.353l8.686-8.686L8.9.659l.354.354a1.75 1.75 0 0 1 2.475 0l8.689 8.69.006.006.006.006a.25.25 0 1 1-.353.353l-.006-.006-.006-.006-8.69-8.69a1.25 1.25 0 0 0-1.767 0Z"
    />
    <Path
      //   fill={focused ? '#000' : colors.gray}
      //   stroke={focused ? '#000' : colors.gray}
      fill="#000FFF"
      stroke="#000FFF"
      d="m2.741 11.768 7.75-7.75 7.75 7.75v5.986c0 .759-.616 1.375-1.375 1.375h-3.375a.25.25 0 0 1-.25-.25v-4.5a1.25 1.25 0 0 0-1.25-1.25h-3a1.25 1.25 0 0 0-1.25 1.25v4.5a.25.25 0 0 1-.25.25H4.116a1.375 1.375 0 0 1-1.375-1.375v-5.986Z"
    />
  </Svg>
);
const Memo = memo(HomeIcon);
export default Memo;
