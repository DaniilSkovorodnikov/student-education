import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function AuthGuard(){
    const {token, isLoading} = useContext(AuthContext)
    return (
        token ? isLoading ? <div>Загрузка...</div> : <Outlet/> : <Navigate to='/login'/>
    )
}