import '../../styles/Student/StudentEditProfile.scss'
import {useForm} from "react-hook-form";
import {getTrajectories} from "../../helpers/UserHelper";
import {useEffect, useMemo, useState} from "react";

export default function StudentEditProfilePage(){
    const {register, handleSubmit, formState: {errors, isValid, isDirty}} = useForm({
        mode: 'onBlur'
    })
    const [trajectories, setTrajectories] = useState([])
    const courses = useMemo(() => [
        'Бакалавриат, специалитет - 1 курс',
        'Бакалавриат, специалитет - 2 курс',
        'Бакалавриат, специалитет - 3 курс',
        'Бакалавриат, специалитет - 4 курс',
        'Специалитет - 5 курс',
        'Магистратура - 1 курс',
        'Магистратура - 2 курс',
    ], []);

    useEffect(() => {
        getTrajectories()
            .then((value) => setTrajectories(value))
    }, [])

    return (
        <form className='profile-edit'>
            <div className="profile-edit__control">
                <input type="text" className="profile-edit__input" {...register('name', {required: true})}/>
            </div>
            <div className="profile-edit__control">
                <input type="date" className="profile-edit__input" {...register('birth_date', {required: true})}/>
            </div>
            <div className="profile-edit__control">
                <h2 className="profile-edit__subtitle">Пол</h2>
                <label className='profile-edit__gender'>
                    <input className='profile-edit__radio' type="radio" value='male' {...register('sex')}/> Мужской
                </label>
                <label className='profile-edit__gender'>
                    <input className='profile-edit__radio' type="radio" value='female' {...register('sex')}/> Женский
                </label>
            </div>
            <div className="profile-edit__control">
                <input type="text" className="profile-edit__input" {...register('phone_number', {
                    pattern: /^(8|\+7)[0-9]{10}/
                })}/>
            </div>
            <div className="profile-edit__control">
                <input type="text" className="profile-edit__input" {...register('email', {
                    required: true,
                    pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
                })}/>
            </div>
            <div className="profile-edit__control">
                <select className='profile-edit__input' {...register('trajectory', {required: true})}>
                    {trajectories.map((v, i) => <option value={v} key={i}>{v}</option>)}
                </select>
            </div>
            <div className="profile-edit__control">
                <select className='profile-edit__input' {...register('course', {required: true})}>
                    {courses.map((v, i) => <option value={v} key={i}>{v}</option>)}
                </select>
            </div>
            {isDirty && <button type='submit' className='profile-edit__submit' disabled={!isValid}>Сохранить изменения</button>}
        </form>
    )
}