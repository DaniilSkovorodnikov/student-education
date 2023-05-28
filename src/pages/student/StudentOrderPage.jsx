import '../../styles/Student/StudentOrderPage.scss'
import avatar from '../../img/avatar.jpg'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOrderById} from "../../helpers/OrderHelper";

export default function StudentOrderPage(){
    const [order, setOrder] = useState({})
    const {id} = useParams()
    useEffect(() => {
        getOrderById(id)
            .then((value) => setOrder(value))
    }, [])

    return (
        <div className='order'>
            <div className="order__main">
                <div className="order__header">
                    <h2 className="order__title">{order.name}</h2>
                    <button className='order__edit'/>
                </div>
                <p className="order__description">{order.description}</p>
                <p className='order__learning-type'>{order.learning_type}</p>
                <button className='order__delete'>Закрыть задание</button>
            </div>
            <div className="order__experts experts">
                <h2 className='experts__title'>Отклики репетиторов</h2>
                <ul className='experts__list'>
                    <li className="experts__item">
                        <div className="experts__header">
                            <img src={avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>Максим Цветков</h3>
                                <p className='experts__trajectory'>ИРИТ-РТФ, Программная инженерия, 2 курс</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>Привет! Я неплохо разобрался в интегралах в прошлом семестре и могу на свежую голову все объяснить простым языком. </p>
                        <button className="experts__choose">Принять</button>
                        <button className="experts__choose">Отклонить</button>
                    </li>
                    <li className="experts__item">
                        <div className="experts__header">
                            <img src={avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>Максим Цветков</h3>
                                <p className='experts__trajectory'>ИРИТ-РТФ, Программная инженерия, 2 курс</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>Привет! Я неплохо разобрался в интегралах в прошлом семестре и могу на свежую голову все объяснить простым языком. </p>
                        <button className="experts__choose">Принять</button>
                        <button className="experts__choose">Отклонить</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}