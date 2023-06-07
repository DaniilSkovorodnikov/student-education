import '../../styles/Student/StudentOrderPage.scss'
import avatar from '../../img/avatar.jpg'
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getOrderById, getRespondsByOrderId, setStatus} from "../../helpers/OrderHelper";

export default function StudentOrderPage(){
    const [order, setOrder] = useState({})
    const [responds, setResponds] = useState([])
    const [isChangedStatus, setIsChangedStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()
    useEffect(() => {
        getOrderById(id)
            .then((value) => setOrder(value))
            .finally(() => setIsLoading(false))
        getRespondsByOrderId(id)
            .then(value => setResponds(value))
    }, [isChangedStatus])

    return (
        <div className='order'>
            {isLoading ? <div className="loader"/> :
            <div className="order__main">
                <div className="order__header">
                    <h2 className="order__title">{order.name}</h2>
                    <button className='order__edit'/>
                </div>
                <p className="order__description">{order.description}</p>
                <p className='order__learning-type'>{order.learning_type}</p>
                <button className='order__delete'>Закрыть задание</button>
            </div>}
            <div className="order__experts experts">
                <h2 className='experts__title'>Отклики репетиторов</h2>
                <ul className='experts__list'>
                    {responds.map((v) => <li className="experts__item" key={v.id}>
                        <div className="experts__header">
                            <img src={v.expert.image || avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>{v.expert.name}</h3>
                                <p className='experts__trajectory'>{v.expert.learning_trajectory}</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>{v.comment}</p>
                        {v.status === 'opened' && <>
                            <button className="experts__choose" onClick={() => setStatus(v.id, 'accepted').then(() => setIsChangedStatus(!isChangedStatus))}>Принять</button>
                            <button className="experts__choose" onClick={() => setStatus(v.id, 'rejected').then(() => setIsChangedStatus(!isChangedStatus))}>Отклонить</button>
                        </>}
                        {v.status === 'accepted' && <p className='experts__accepted'>Принят!</p>}
                        {v.status === 'rejected' && <p className='experts__rejected'>Отклонён!</p>}
                    </li>)}
                </ul>
            </div>
        </div>
    )
}