import {useContext} from "react";
import {AuthContext} from "../../context/AuthContext";
import {Link} from "react-router-dom";
import {useForm} from "react-hook-form";

export default function LoginPage(){
    const {login} = useContext(AuthContext)
    const {register, formState: {errors, isValid}, handleSubmit} = useForm()
    const onSubmit = (data) => {
        login(data)
    }

    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="login__title">Войти в аккаунт</h2>
            <div className="login__control">
                <input type="text"
                       className="login__input"
                       placeholder="Email"
                       {...register('email', {required: true, pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/})}
                />
                    <div className="login__validation">
                        {errors.email && <p className="login__alert">Введите корректный email</p>}
                    </div>
            </div>
            <div className="login__control">
                <input type="password"
                       className="login__input"
                       placeholder="Пароль"
                       {...register('password', {required: true, minLength: 6})}
                />
                <div className="login__validation">
                    {errors.password && <p className="login__alert">Длина пароля должна быть больше 5 символов</p>}
                </div>
            </div>
             <button type='submit' className="login__submit" disabled={!isValid}>Войти</button>
             <p className="login__text">или <Link to='/registration' className="login__link">зарегистрироваться</Link></p>
            </form>
        </div>
)
}