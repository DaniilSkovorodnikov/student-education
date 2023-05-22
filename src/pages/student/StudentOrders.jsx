import '../../styles/Student/StudentOrders.scss'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getOrdersByToken} from "../../helpers/OrderHelper";

export default function StudentOrders(){
    const [orders, setOrders] = useState([])
    const [titleFilter, setTitleFilter] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        getOrdersByToken()
            .then((value) => {
                setOrders(value)
            })
    }, [])

    return (
        <div className='orders'>
            <input className='orders__filter'
                   placeholder='Введите название заказа...'
                   type="text"
                   value={titleFilter}
                   onChange={(event) => setTitleFilter(event.target.value)}
            />
            <div className="orders__header">
                <h1 className="orders__title">Мои заказы</h1>
                <button className='orders__create' onClick={() => navigate('/student/order/create')}>Создать заказ</button>
            </div>
            <ul className='orders__list'>
                {orders
                    .filter((value) => value.name.toLowerCase().includes(titleFilter.toLowerCase()))
                    .map((v, i) =>
                    <li className='orders__item' key={i} onClick={() => navigate(`/student/order/${v.id}`)}>
                        <h2 className='orders__subtitle'>{v.name}</h2>
                        <p className='orders__description'>{v.description}</p>
                        <p className='orders__learning-type'>{v.learning_type}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}