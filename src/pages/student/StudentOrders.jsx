import '../../styles/Student/StudentOrders.scss'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getOrdersByToken} from "../../helpers/OrderHelper";

export default function StudentOrders(){
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        getOrdersByToken()
            .then((value) => {
                setOrders(value)
            })
            .finally(() => setLoading(false))
    }, [])

    return (
        <div className='student'>
            <div className='orders'>
                <div className="orders__header">
                    <button className='orders__create' onClick={() => navigate('/student/order/create')}>Создать заказ</button>
                </div>
                {loading ? <div>Загрузка...</div> : <ul className='orders__list'>
                    {orders.map((v, i) =>
                            <li className='orders__item' key={i} onClick={() => navigate(`/student/order/${v.id}`)}>
                                <h2 className='orders__subtitle'>{v.name}</h2>
                                <p className='orders__description'>{v.description}</p>
                                <p className='orders__learning-type'>{v.learning_type}</p>
                            </li>
                        )}
                </ul>}
            </div>
        </div>
    )
}