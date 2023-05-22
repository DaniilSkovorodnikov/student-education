import '../styles/Student/StudentLayout.scss'
import {Link, Outlet, useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

export default function UserLayout(){
    const {role, user} = useContext(AuthContext)
    const navigate = useNavigate()
    const [topMenuActive, setTopMenuActive] = useState(false)

    return (<div className='layout'>
        <header className="header">
            <nav className="header__navigation">
                <button className='header__logo' onClick={() => navigate(`/`)}/>
                <ul className="header__links">
                    <li className="header__link">
                        <button className="header__btn message-btn"></button>
                    </li>
                    <li className="header__link">
                        <button className='header__btn profile-btn' onClick={() => navigate(`/profile/${user.id}`)}></button>
                    </li>
                    <li className='header__link'>
                       <button className={['header__menu-btn', topMenuActive && 'active'].join(' ')} onClick={() => setTopMenuActive(!topMenuActive)}></button>
                    </li>
                </ul>
                {topMenuActive &&
                <ul className="header__top-menu top-menu">
                    <li onClick={() => setTopMenuActive(false)}>
                        <Link className='top-menu__link' to='/student/orders'>Мои заказы</Link>
                    </li>
                    <li onClick={() => setTopMenuActive(false)}>
                        <Link className='top-menu__link' to='/tutors'>Репетиторы</Link>
                    </li>
                    <li onClick={() => setTopMenuActive(false)}>
                        <Link className='top-menu__link' to='/student'>Главная</Link>
                    </li>
                </ul>}
            </nav>
        </header>
        <Outlet/>
    </div>)
}