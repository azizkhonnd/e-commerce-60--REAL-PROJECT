import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
const Private = () => {
    const auth = useSelector(state => state)

    return auth.token ? <h1>Dashboard</h1> : <Navigate to="/auth" />


}

export default Private