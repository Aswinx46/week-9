import { useSelector } from "react-redux";

function Home()
{

    const user=useSelector((state)=>state.signUp.user)

console.log(user)

}
export default Home
