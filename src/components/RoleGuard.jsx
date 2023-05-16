import {Navigate, Outlet} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function RoleGuard({correctRole}){
    const {role, isLoading} = useContext(AuthContext)
    return role === correctRole ? <Outlet/> : isLoading ? <div>Загрузка</div> :<Navigate to={`/${role}`}/>
}