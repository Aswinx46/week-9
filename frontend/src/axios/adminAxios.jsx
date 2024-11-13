import {SERVER_URL} from '../config/SERVER_URL'
import axios from 'axios'
import {store} from '../redux/store'
const instance = axios.create({
    baseURL: SERVER_URL,
  });

  instance.interceptors.request.use(
    (config)=>{
       const token=store.getState().token.token
       console.log(token)
       if(token)
       {
        config.headers['Authorization']=`Bearer ${token}`
       }
       console.log('request interception done on admin api')
       return config;
       (error)=>{
        return Promise.reject(error);
       }
    }
  )

  export default instance