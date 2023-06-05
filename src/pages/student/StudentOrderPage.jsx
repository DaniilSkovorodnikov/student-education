import '../../styles/Student/StudentOrderPage.scss'
import avatar from '../../img/avatar.jpg'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOrderById, getRespondsByOrderId} from "../../helpers/OrderHelper";

export default function StudentOrderPage(){
    const [order, setOrder] = useState({})
    const [responds, setResponds] = useState([])
    const {id} = useParams()
    useEffect(() => {
        getOrderById(id)
            .then((value) => setOrder(value))
        getRespondsByOrderId(id)
            .then(value => setResponds(value))
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
                    {responds.map((v, i) => <li className="experts__item" key={v.id}>
                        <div className="experts__header">
                            <img src={v.expert.image || avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>{v.expert.name}</h3>
                                <p className='experts__trajectory'>{v.expert.learning_trajectory}</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>{v.comment}</p>
                        <button className="experts__choose">Принять</button>
                        <button className="experts__choose">Отклонить</button>
                    </li>)}
                </ul>
            </div>
        </div>
    )
}