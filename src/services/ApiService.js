import axios from 'axios';

const Headers = {
  Header: {
    'Content-Type': 'application/json',
  },
  Header2: {
    Accept: 'application/json',
    'Content-Type': 'multipart/form-data',
  },
};
const ApiRequest = async data => {
  // This will remove authorization and store id
  const result = await axios.post(
    'https://locatestudent.com/mental_movement/api.php',
    // 'https://7tracking.com/circle_charge/api.php',
    data,
    {
      headers: Headers.Header2,
    },
  );
  return result;
};

export const NewApiRequest = async (url, data) => {
  // This will remove authorization and store id
  const result = await axios.post(constants.baseUrl + url, data, {
    headers: Headers.Header2,
  });
  return result;
};

export default ApiRequest;
