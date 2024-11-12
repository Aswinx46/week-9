import {SERVER_URL} from '../config/SERVER_URL'
import {useSelector} from 'react-redux'
import axios from 'axios'

const instance = axios.create({
  baseURL: SERVER_URL,
});
function axioss()
{
    instance.interceptors.request.use(
    (config)=>{
      const token=useSelector(state=>state.token.token)
      if(token)
      {
        config.headers['Authorization']=`Bearer ${token}`
      }
      console.log('request interception done')
      return config;
      (error)=>
      {
        return Promise.reject(error);
      }
    }
  )
}


  export default instance