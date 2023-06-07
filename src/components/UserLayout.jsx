import '../styles/Layout.scss'
import { Outlet, useNavigate} from "react-router-dom";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

export default function UserLayout(){
    const {user} = useContext(AuthContext)
    const navigate = useNavigate()

    return (<div className='layout'>
        <header className="header">
            <nav className="header__navigation">
                <button className='header__logo' onClick={() => navigate(`/`)}/>
                <ul className="header__links">
                    <li className="header__link">
                        <button className="header__btn message-btn"></button>
                    </li>
                    <li className="header__link">
                        <button className='header__btn profile-btn' onClick={() => navigate(`/profile/${user.id}`)}>
                            <img className='header__avatar' src={user.image}/>
                        </button>
                    </li>
                </ul>
            </nav>
        </header>
        <Outlet/>
    </div>)
}