import '../styles/EditProfile.scss'
import {useForm} from "react-hook-form";
import {courses, getCourse, getEducationStage, getTrajectories} from "../helpers/UserHelper";
import {useContext, useEffect, useMemo, useState} from "react";
import avatar_field from "../img/avatar.jpg";
import {AuthContext} from "../context/AuthContext";
import $http from "../http/http";
import {useNavigate, useParams} from "react-router-dom";



export default function EditProfilePage(){
    const {user} = useContext(AuthContext);
    const {register, handleSubmit, formState: {errors, isValid, isDirty, dirtyFields}} = useForm({
        mode: 'onBlur',
        defaultValues: {
            name: user.name,
            birth_date: user.birth_date,
            sex: user.sex,
            phone_number: user.phone_number,
            email: user.email,
            learning_trajectory: user.learning_trajectory,
            course: getCourse(user.course_number, user.education_stage),
        }
    })
    const [trajectories, setTrajectories] = useState([])
    const [img, setImg] = useState(null);
    const fileReader = useMemo(() => {
        const reader = new FileReader()
        reader.onloadend = (ev) => setImg(reader.result)
        return reader
    }, [])
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        getTrajectories()
            .then((value) => setTrajectories(value))
    }, [])

    function onSubmit(data){
        const updatedData = {}
        Object.keys(dirtyFields).forEach((value) => {
            if (value === 'course'){
                user['course_number'] = updatedData['course_number'] = data.course > 5 ? data.course % 5 : data.course
                user['education_stage'] = updatedData['education_stage'] = getEducationStage(data.course)
            }
            else {
                user[value] = updatedData[value] = data[value]
            }
        })
        if (img){
            user['image'] = updatedData['image'] = img
        }
        $http.patch('/api/user', updatedData)
        navigate(`/profile/${id}`)
    }

    return (
        <form className='profile-edit' onSubmit={handleSubmit(onSubmit)}>
            <label className='profile-edit__img-field'>
                <img src={img || user.image || avatar_field} className='registration__img'/>
                <input type="file"
                       className='profile-edit__img-input'
                       onChange={(e) => {
                           fileReader.readAsDataURL(e.target.files[0])
                       }}
                />
            </label>
            <div className="profile-edit__control">
                <h2 className="profile-edit__subtitle">Фамилия и имя</h2>
                <input type="text" className="profile-edit__input"{...register('name', {required: true, })}/>
            </div>
            <div className="profile-edit__control">
                <h2 className="profile-edit__subtitle">Дата рождения</h2>
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
                <h2 className="profile-edit__subtitle">Номер телефона</h2>
                <input type="text" className="profile-edit__input" {...register('phone_number', {
                    pattern: /^(8|\+7)[0-9]{10}/
                })}/>
            </div>
            <div className="profile-edit__control">
                <h2 className="profile-edit__subtitle">Электронная почта</h2>
                <input type="text" className="profile-edit__input" {...register('email', {
                    required: true,
                    pattern: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/
                })}/>
            </div>
            <div className="profile-edit__control">
                <select className='profile-edit__input' {...register('learning_trajectory', {required: true})}>
                    {trajectories.map((v, i) => <option value={v} key={i}>{v}</option>)}
                </select>
            </div>
            <div className="profile-edit__control">
                <select className='profile-edit__input' {...register('course', {required: true})}>
                    {courses.map((v, i) => <option value={i + 1} key={i}>{v}</option>)}
                </select>
            </div>
            {(isDirty || img) && <button type='submit' className='profile-edit__submit' disabled={!isValid && !img}>Сохранить изменения</button>}
        </form>
    )
}