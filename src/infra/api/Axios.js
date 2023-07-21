import Axios from 'axios';

export default Axios.create({ 
    baseURL: 'http://172.22.2.22:3030/api'
});