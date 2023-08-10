import '../../styles/Student/StudentOrderPage.scss'
import '../../styles/Student/StudentCreateOrder.scss'
import avatar from '../../img/avatar.jpg'
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {
    deleteOrder,
    editOrder,
    getLearningType,
    getOrderById,
    getRespondsByOrderId,
    setStatus
} from "../../helpers/OrderHelper";
import Modal from "../../components/Modal";
import {getCompetencies} from "../../helpers/UserHelper";

export default function StudentOrderPage(){
    const [order, setOrder] = useState(null)
    const [responds, setResponds] = useState([])
    const [isChangedStatus, setIsChangedStatus] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [editMode, setEditMode] = useState(false)
    const [updatedOrder, setUpdatedOrder] = useState({})
    const [availableThemes, setAvailableThemes] = useState([])
    const {id} = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getOrderById(id)
            .then((value) => setOrder(value))
            .finally(() => setIsLoading(false))
        getRespondsByOrderId(id)
            .then(value => setResponds(value))
        getCompetencies()
            .then((value) => {
                setAvailableThemes(value)
            })
    }, [isChangedStatus])

    useEffect(() => {
        if (order) {
            setUpdatedOrder({
                ...order, learning_type: order.learning_type.split(', ').map((v) =>
                    ({
                        'Очно': 'full-time',
                        'Онлайн': 'online'
                    }[v])
                )
            })
        }
    }, [editMode])

    const handleEdit = (e) => {
        e.preventDefault()
        const updated = {...updatedOrder, learning_type: updatedOrder.learning_type.map((v) => v === 'full-time' ? 'Очно' : 'Онлайн').join(', ')}
        setOrder(updated)
        editOrder(updated)
            .then(() => setEditMode(false))
            .catch((err) => console.log(err))
    }

    return (
        <div className='order'>
            {isLoading ? <div className="loader"/> :
            <div className="order__main">
                <div className="order__header">
                    <h2 className="order__title">{order.name}</h2>
                    <button className='order__edit' onClick={() => setEditMode(true)}/>
                </div>
                <p className="order__description">{order.description}</p>
                <div className="order__footer">
                    <p className='order__learning-type'>{getLearningType(order.learning_type)}</p>
                    <p className='order__price'>{order.price} &#8381;</p>
                </div>
                <button className='order__delete' onClick={() => {
                    deleteOrder(id).then(() => navigate('/student/orders'))
                }}>Закрыть задание</button>
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
            <Modal setVisible={setEditMode} visible={editMode}>
                <form className='edit-order' onClick={(e) => e.stopPropagation()}>
                    <h2 className='edit-order__title'>Изменить заказ</h2>
                    <div className="edit-order__control">
                        <p>Тема заказа</p>
                        <select value={updatedOrder.name} className='create-order__select'
                                onChange={(e) => setUpdatedOrder({...updatedOrder, name: e.target.value})}>
                            {availableThemes.map((v, i) => <option value={v} key={i}>{v}</option>)}
                        </select>
                    </div>
                    <div className="edit-order__control">
                        <p>Описание</p>
                        <textarea value={updatedOrder.description}
                                  placeholder='Описание заказа...'
                                  onChange={(e) => setUpdatedOrder({...updatedOrder, description: e.target.value})}
                        />
                    </div>
                    <div className="edit-order__control">
                        <p className="edit-order__subtitle">Мне удобно заниматься...</p>
                        <label>
                            <input type="checkbox"
                                   checked={updatedOrder.learning_type?.includes('full-time')}
                                   name='learning_type'
                                   onChange={(e) => {
                                       if (updatedOrder.learning_type.includes(e.target.value)){
                                           setUpdatedOrder({...updatedOrder, learning_type: updatedOrder.learning_type.filter((v) => v !== e.target.value)})
                                       }
                                       else {
                                           setUpdatedOrder({...updatedOrder, learning_type: [...updatedOrder.learning_type, e.target.value]})
                                       }
                                   }}
                                   value='full-time'/> Очно
                        </label>
                        <label>
                            <input type="checkbox"
                                   checked={updatedOrder.learning_type?.includes('online')}
                                   name='learning_type'
                                   onChange={(e) => {
                                       if (updatedOrder.learning_type.includes(e.target.value)){
                                           setUpdatedOrder({...updatedOrder, learning_type: updatedOrder.learning_type.filter((v) => v !== e.target.value)})
                                       }
                                       else {
                                           setUpdatedOrder({...updatedOrder, learning_type: [...updatedOrder.learning_type, e.target.value]})
                                       }
                                   }}
                                   value='online'/> Онлайн
                        </label>
                    </div>
                    <div className="edit-order__control">
                        <p className="edit-order__subtitle">Стоимость заказа в рублях</p>
                        <input type='number' value={updatedOrder.price} onChange={(e) => setUpdatedOrder({...updatedOrder, price: e.target.value})}/>
                    </div>
                    <button className='edit-order__send' onClick={handleEdit}>Изменить заказ</button>
                </form>
            </Modal>
        </div>
    )
}