import '../../styles/Authorization.scss'
import student_img from '../../img/student.png'
import tutor_img from '../../img/tutor.png'
import avatar_field from '../../img/avatar.jpg'
import {useForm} from "react-hook-form";
import {useContext, useEffect, useMemo, useState} from "react";
import MultiSelect from "../../components/MultiSelect";
import {getEducationStage, getCompetencies, getTrajectories} from "../../helpers/UserHelper";
import {AuthContext} from "../../context/AuthContext";

export default function RegistrationPage(){
    const {register} = useContext(AuthContext)
    const [registrationStage, setRegistrationStage] = useState('main');
    const [role, setRole] = useState('')
    const [trajectories, setTrajectories] = useState([])
    const [competencies, setCompetencies] = useState([]);
    const [selectedCompetencies, setSelectedCompetencies] = useState([]);
    const [img, setImg] = useState('')
    const fileReader = useMemo(() => {
        const reader = new FileReader()
        reader.onloadend = (ev) => setImg(reader.result)
        return reader
    }, [])
    const mainForm = useForm({
        mode: 'onBlur'
    });
    const onMainSubmit = (data) => {
        delete data['passwordConfirmation']
        const user = {
            ...data,
            role,
            image: img,
            course_number: data.course_number > 5 ? data.course_number % 5 : data.course_number,
            education_stage: getEducationStage(data.course_number)
        }
        if (registrationStage === 'expert'){
            user['competencies'] = selectedCompetencies
        }
        register(user)
    };

    useEffect(() => {
        getCompetencies()
            .then((value) => setCompetencies(value))
        getTrajectories()
            .then((value)=> setTrajectories(value))
    }, []);

    const courses = useMemo(() => [
        'Бакалавриат, специалитет - 1 курс',
        'Бакалавриат, специалитет - 2 курс',
        'Бакалавриат, специалитет - 3 курс',
        'Бакалавриат, специалитет - 4 курс',
        'Специалитет - 5 курс',
        'Магистратура - 1 курс',
        'Магистратура - 2 курс',
    ], []);

    return (
        <div className='registration'>
            <form className="registration__form" onSubmit={mainForm.handleSubmit(onMainSubmit)}>
                {registrationStage === 'main' &&
                <div className='registration__container'>
                    <h2 className="registration__title">Создать аккаунт</h2>
                    <p className="registration__part">1/3</p>
                    <div className="registration__control">
                        <input type="text"
                        className="login__input"
                        placeholder="Email"
                        {...mainForm.register('email', {
                            required: true,
                            pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
                        })
                        }
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors?.email && <p className="registration__alert">Введите корректный email</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <input type="password"
                        className="registration__input"
                        placeholder="Пароль"
                        {...mainForm.register('password', {
                            required: true,
                            minLength: 6
                        })
                        }
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors?.password && <p className="registration__alert">Длина пароля должна быть больше 5 символов</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <input type="password"
                        className="registration__input"
                        placeholder="Подтвердите пароль"
                        {...mainForm.register('passwordConfirmation', {
                            validate: (value, formValues) => formValues.password === value
                        })
                        }
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors?.passwordConfirmation && <p className="registration__alert">Пароли не совпадают</p>}
                        </div>
                    </div>
                    <div className="registration__nav">
                        <button className="registration__submit" onClick={() => setRegistrationStage('role')} disabled={!mainForm.formState.isValid}>Далее</button>
                    </div>
                </div>
                }

                {registrationStage === 'role' && <div className='registration__container role'>
                    <h2 className="registration__title">Выбери свою роль</h2>
                    <p className="registration__part">2/3</p>
                    <div className="registration__role-control">
                        <div className={["registration__role", "role-card", role === 'student' && 'active'].join(' ')} onClick={() => setRole('student')}>
                            <img src={student_img} className='role-card__img' alt=""/>
                            <h3 className="role-card__role">Ученик</h3>
                            <p className='role-card__description'>Нуждаюсь в помощи в освоении материала</p>
                        </div>
                        <div className={["registration__role", "role-card", role === 'expert' && 'active'].join(' ')} onClick={() => setRole('expert')}>
                            <img src={tutor_img} className='role-card__img' alt=""/>
                            <h3 className="role-card__role">Репетитор</h3>
                            <p className='role-card__description'>Могу помочь в обучении и подготовке к экзаменам</p>
                        </div>
                    </div>
                    <div className="registration__nav">
                        <button className="registration__submit" onClick={() => setRegistrationStage('main')}>Назад</button>
                        <button className="registration__submit" disabled={!role} onClick={() => setRegistrationStage(role)}>Далее</button>
                    </div>
                </div>
                }

                {(registrationStage === 'student' || registrationStage === 'expert') && <div className='registration__container'>
                    <h2 className="registration__title">Немного обо мне</h2>
                    <p className="registration__part">3/3</p>
                    <label className='registration__img-field'>
                        <img src={img || avatar_field} className='registration__img'/>
                        <input type="file"
                               className='registration__img-input'
                               onChange={(e) => {
                                   fileReader.readAsDataURL(e.target.files[0])
                               }}
                        />
                    </label>

                    <div className="registration__control">
                        <input type="text"
                               className="login__input"
                               placeholder="Имя и фамилия"
                            {...mainForm.register('name', {
                                required: true
                            })}
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors.name && <p className="registration__alert">Введите имя</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <input type="text" className="login__input"
                               placeholder="Номер телефона в формате +7..."
                               {...mainForm.register('phone_number', {
                                   pattern: /^(8|\+7)[0-9]{10}/
                               })
                               }
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors.phone_number && <p className="registration__alert">Неверный формат номера телефона</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <input type="date"
                               className="registration__input"
                            {...mainForm.register('birth_date', {
                                required: true
                            })}
                        />
                        <div className="registration__validation">
                            {mainForm.formState.errors.birth_date && <p className="registration__alert">Введите дату рождения</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <h3 className="registration__subtitle">Пол</h3>
                        <label className="registration__gender">
                            <input type="radio"
                                   value="male"
                                   className="registration__radio"
                                   checked
                                {...mainForm.register('sex')}
                            />
                            Мужской
                        </label>
                        <label className="registration__gender">
                            <input type="radio"
                                   value="female"
                                   className="registration__radio"
                                {...mainForm.register('sex')}
                            />
                            Женский
                        </label>
                    </div>
                    <div className="registration__control">
                        <h3 className="registration__subtitle">Выберите своё направление</h3>
                        <select className="registration__input" {...mainForm.register('learning_trajectory', {required: true})}>
                            {trajectories.map((v, i) => <option value={v} key={i}>{v}</option>)}
                        </select>
                        <div className="registration__validation">
                            {mainForm.formState.errors.learning_trajectory && <p className="registration__alert">Выберите направление</p>}
                        </div>
                    </div>
                    <div className="registration__control">
                        <h3 className="registration__subtitle">Укажите свой курс обучения</h3>
                        <select className="registration__input" {...mainForm.register('course_number', {required: true})}>
                            {courses.map((v,i) => <option value={i + 1} key={i}>{v}</option>)}
                            <option value='1'>1</option>
                        </select>
                        <div className="registration__validation">
                            {mainForm.formState.errors.course_number && <p className="registration__alert">Введите номер курса</p>}
                        </div>
                    </div>
                    {registrationStage === 'expert' && <>
                        <MultiSelect options={competencies} setValue={setSelectedCompetencies}/>
                        <div className="registration__control">
                            <textarea placeholder="Пара слов обо мне..." {...mainForm.register('about_self')}></textarea>
                        </div>
                    </>
                    }
                    <div className="registration__nav">
                        <button className="registration__submit" onClick={() => setRegistrationStage('role')}>Назад</button>
                        <button className="registration__submit" type='submit' disabled={!mainForm.formState.isValid}>Завершить регистрацию</button>
                    </div>
                </div>
                }
            </form>
        </div>
    )
}