import ReactLoading from 'react-loading';
import styles from './spinner.module.css'
function Loading (){
    return <ReactLoading className={styles.Loading} type={'spin'} color={'#ffffff'} height={40} width={40} />
  }

  export default Loading