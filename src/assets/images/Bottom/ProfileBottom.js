import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {memo} from 'react';
import {colors} from '../../../constants';
const ProfileBottom = ({focused = false}) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="red">
    <Path
      stroke={focused ? colors.primaryColor : colors.gray}
      strokeWidth={0.75}
      d="M11.635 4a3.625 3.625 0 1 1-7.25 0 3.625 3.625 0 0 1 7.25 0ZM15.635 15.5c0 1.275-.02 2.206-.862 2.891-.435.355-1.12.667-2.212.888-1.091.22-2.564.346-4.551.346s-3.46-.125-4.55-.346c-1.093-.221-1.778-.533-2.213-.888-.842-.685-.862-1.616-.862-2.891 0-1.047.758-2.071 2.152-2.855 1.382-.777 3.316-1.27 5.473-1.27s4.091.493 5.473 1.27c1.394.784 2.152 1.808 2.152 2.855Z"
    />
  </Svg>
);
const Memo = memo(ProfileBottom);
export default Memo;
