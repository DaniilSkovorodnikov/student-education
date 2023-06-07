import '../styles/Profile.scss'
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";
import {useNavigate} from "react-router-dom";
import avatar from "../img/avatar.jpg";
import {getGender} from "../helpers/UserHelper";

export default function ProfilePage(){
    const {user, role, logout} = useContext(AuthContext)
    const navigate = useNavigate()

    return (
        <div className="profile">
            <div className="profile__main">
                <img src={user.image || avatar} alt="" className="profile__avatar"/>
                <div className="profile__personal">
                    <h2 className="profile__name">{user.name}</h2>
                    <p className="profile__faculty">{user.learning_trajectory}</p>
                </div>
                {/*<button className='profile__edit-btn' onClick={() => navigate('/student/profile/edit')}/>*/}
            </div>
            <div className="profile__personal">
                <div className="profile__field">
                    <h3 className="profile__subtitle">Дата рождения</h3>
                    <p className="profile__value">{user.birth_date}</p>
                </div>
                <div className="profile__field">
                    <h3 className="profile__subtitle">Пол</h3>
                    <p className="profile__value">{getGender(user.sex)}</p>
                </div>
                <div className="profile__field">
                    <h3 className="profile__subtitle">Номер телефона</h3>
                    <p className="profile__value">{user.phone_number}</p>
                </div>
                <div className="profile__field">
                    <h3 className="profile__subtitle">Электронная почта</h3>
                    <p className="profile__value">{user.email}</p>
                </div>
                {role === 'expert' && <div className='profile__field'>
                    <h3 className="profile__subtitle">О себе</h3>
                    <p className="profile__value">{user.about_self}</p>
                </div> }
            </div>
            <div className="profile__divider"></div>
            <div className="profile__study-info">
                <div className="profile__field">
                    <h3 className="profile__subtitle">Направление обучения</h3>
                    <p className="profile__value">{user.learning_trajectory}</p>
                </div>
                <div className="profile__field">
                    <h3 className="profile__subtitle">Курс</h3>
                    <p className="profile__value">{user.course_number}</p>
                </div>
                {role === 'expert' && <div className="profile__field">
                    <h3 className="profile__subtitle">Ваши компетенции</h3>
                    <ul className='profile__competencies'>
                        {user?.competencies?.map((v, i) => <li className='profile__competence' key={i}>{v}</li>)}
                    </ul>
                </div> }
            </div>
            <p className='profile__exit'>Вы можете <span className='profile__link' onClick={logout}>выйти из аккаунта</span></p>
        </div>
    )
}