import {createContext, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {API_URL} from "../http/http";
import {getUserInfo} from "../helpers/UserHelper";

export const AuthContext = createContext({})
export const AuthProvider = ({children}) => {
    const [role, setRole] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        if (token){
            getUserInfo()
                .then((value) => {
                    setUser(value)
                    setRole(value.role)
                })
                .catch((err) => {
                    if (err.message === 'Authorization error'){
                        navigate('/login')
                    }
                })
                .finally(() => setIsLoading(false))
        }
    }, [])

    async function login(user){
        return axios.post(`${API_URL}/api/auth/login`, {user})
            .then((value) => {
                const user = value.data.user
                getUserInfo()
                    .then((userInfo) => setUser(userInfo))
                    .catch((err) => { throw err })
                setToken(user.token)
                setRole(user.role)
                localStorage.setItem('token', user.token)
                setIsLoading(false)
                navigate(`/${user.role}`)
            })
            .catch((err) => { throw err})
    }

    async function register(user){
        axios.post(`${API_URL}/api/auth/registration`, {user})
            .then(() => {
                navigate('/login')
            })
    }

    function logout() {
        localStorage.removeItem('token')
        setRole('')
        setToken('')
        setUser({})
        navigate('/login')
    }

    return (
        <AuthContext.Provider value={{isLoading, role, token, user, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    )
}