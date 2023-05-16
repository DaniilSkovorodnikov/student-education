import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {Navigate} from "react-router-dom";

export default function RoleNavigation(){
    const {role} = useContext(AuthContext)
    return (
        <Navigate to={`/${role}`}/>
    )
}