import '../../styles/Student/StudentCreateOrder.scss'
import {useForm} from "react-hook-form";
import {createOrder} from "../../helpers/OrderHelper";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCompetencies} from "../../helpers/UserHelper";

export default function StudentCreateOrder(){
    const {register, handleSubmit, formState: {errors, isValid}} = useForm({
        mode: 'onBlur'
    })
    const navigate = useNavigate()
    const [error, setError] = useState(false)
    const [availibleThemes, setAvailibleThemes] = useState([])

    useEffect(() => {
        getCompetencies()
            .then((value) => {
                setAvailibleThemes(value)
            })
    }, [])

    function onSubmitForm(data) {
        const order = {
            ...data,
            learning_type: data.learning_type.join(' ')
        }
        createOrder(order)
            .then(() => navigate('/student/orders'))
            .catch(() => setError(true))
    }

    return (
        <form className='create-order' onSubmit={handleSubmit(onSubmitForm)}>
            <div className="create-order__control">
                <select defaultValue='Тема заказа...' className='create-order__select' {...register('name', {required: true, validate: (value) => value !== 'Тема заказа...'})}>
                    <option disabled>Тема заказа...</option>
                    {availibleThemes.map((v, i) => <option value={v} key={i}>{v}</option>)}
                </select>
                {errors.name && <p className='create-order__alert'>Введите название заказа</p>}
            </div>
            <div className="create-order__control">
                <textarea placeholder='Описание заказа...' {...register('description')}/>
            </div>
            <div className="create-order__control">
                <p className="create-order__subtitle">Мне удобно заниматься...</p>
                <label>
                    <input type="checkbox" value='full-time' {...register('learning_type', {required: true})}/> Очно
                </label>
                <label>
                    <input type="checkbox" value='online' {...register('learning_type', {required: true})}/> Онлайн
                </label>
            </div>
            <div className="create-order__control">
                <p className="create-order__subtitle">Стоимость заказа в рублях</p>
                <input type='number'{...register('price', {required: true})}/>
            </div>
            <button type='submit' className='create-order__create' disabled={!isValid}>Создать заказ</button>
            {error && <p className='create-order__error'>Что-то пошло не так...</p>}
        </form>
    )
}