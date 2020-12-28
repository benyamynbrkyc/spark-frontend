import axios from 'axios';

export default (AUTH_TOKEN: string) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${AUTH_TOKEN}`;
  console.log(
    'axios.defaults.headers.common["Authorization"]',
    axios.defaults.headers.common['Authorization']
  );
};
