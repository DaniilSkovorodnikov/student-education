import '../../styles/Student/StudentOrders.scss'
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const initialOrders = [
    {title: 'Интегралы', description: 'Определенные и неопределенные интегралы, подготовка к контрольной работе. Учусь на втором курсе у Поторочиной.'},
    {title: 'Теория вероятностей экзамен', description: 'Хочу повторить все темы третьего семестра по теории вероятности. Особенно интересно про формулу Байеса и Бернулли.'}
]

export default function StudentOrders(){
    const [orders, setOrders] = useState(initialOrders)
    const [titleFilter, setTitleFilter] = useState('')
    const navigate = useNavigate()

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
                    .filter((value) => value.title.toLowerCase().includes(titleFilter.toLowerCase()))
                    .map((v, i) =>
                    <li className='orders__item' key={i} onClick={() => navigate(`/student/order/${i}`)}>
                        <h2 className='orders__subtitle'>{v.title}</h2>
                        <p className='orders__description'>{v.description}</p>
                    </li>
                )}
            </ul>
        </div>
    )
}