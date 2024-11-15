import { useSelector }  from "react-redux";
import { Navigate }  from "react-router"

function AdminProtected({children})
{
    const token=useSelector((state)=>state.token.token)

    return (
        token?children: <Navigate to='/admin'></Navigate> 
    )
}

export default AdminProtected