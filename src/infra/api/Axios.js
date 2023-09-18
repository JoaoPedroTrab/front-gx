import Axios from 'axios';

export default Axios.create({ 
    baseURL: 'http://172.16.1.244:3000/api'
});