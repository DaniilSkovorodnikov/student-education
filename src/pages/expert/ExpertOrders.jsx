import '../../styles/Expert/ExpertOrders.scss'
import '../../styles/Filters.scss'
import {useCallback, useEffect, useState} from "react";
import {getOrdersByPage, sendRespond} from "../../helpers/OrderHelper";
import {debounce} from "../../helpers/LazyLoader";
import Modal from "../../components/Modal";
import MultipleFilter from "../../components/MultipleFilter";
import {getCompetencies, getTrajectories} from "../../helpers/UserHelper";


export default function ExpertOrders(){
    const [isLoading, setIsLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [orders, setOrders] = useState([])

    const [visible, setVisible] = useState(false)
    const [currentOrder, setCurrentOrder] = useState(-1)
    const [respondMessage, setRespondMessage] = useState('')

    const [subjects, setSubjects] = useState(['matanchik', 'algebra', 'programmirovanie', 'zhopa'])
    const [trajectories, setTrajectories] = useState(['matanchik', 'algebra', 'programmirovanie', 'zhopa'])
    const [filters, setFilters] = useState({
        subjects: [],
        trajectories: [],
        courses: [],
        learning_type: '',
        sex: ''
    })

    const scrollHandler = useCallback(() => {
        if (document.documentElement.offsetHeight - (window.scrollY + window.outerHeight) <= 70) {
            setPage(prevState => ++prevState)
        }
    }, [])
    const debouncedListener = useCallback(() => { debounce(scrollHandler) }, [])

    useEffect(() => {
        // getCompetencies()
        //     .then((value) => setSubjects(value))
        // getTrajectories()
        //     .then((value) => setTrajectories(value))
        document.addEventListener('scroll', debouncedListener)
        return () => {
            document.removeEventListener('scroll', debouncedListener)
        }
    }, [])

    useEffect(() => {
            getOrdersByPage(page)
                .then((value) => {
                    setOrders([...orders, ...value])
                    if (value.length < 10){
                        document.removeEventListener('scroll', debouncedListener)
                    }
                })
                .finally(() => setIsLoading(false))

    }, [page])

    return (
        <div className='expert'>
            <div className='orders'>
                <div className="orders__filters filters">
                    <MultipleFilter options={subjects} onChangeSetter={setFilters} name={'subjects'} placeholder='По всем предметам'/>
                    <MultipleFilter options={trajectories} onChangeSetter={setFilters} name={'trajectories'} placeholder='Направление подготовки репетитора'/>
                    <MultipleFilter options={[1,2,3,4,5,6]} onChangeSetter={setFilters} name={'courses'} placeholder='Курс репетитора'/>
                    <div className="filters__field">
                        <h3 className='filters__subtitle'>Формат взаимодействия</h3>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='learning_type'
                                   value='full-time'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, learning_type: e.target.value})}/> Очно
                        </label>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='learning_type'
                                   value='online'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, learning_type: e.target.value})}/>
                            Онлайн
                        </label>
                    </div>
                    <div className="filters__field">
                        <h3 className='filters__subtitle'>Пол репетитора</h3>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='sex'
                                   value='male'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, sex: e.target.value})}
                            /> Мужской
                        </label>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='sex'
                                    value='female'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, sex: e.target.value})}
                            /> Женский
                        </label>
                    </div>
                    <button onClick={() => setFilters({
                        subjects: [],
                        trajectories: [],
                        courses: [],
                        learning_type: '',
                        sex: ''
                    })}>Сбросить фильтры</button>
                </div>
                <ul className='orders__list'>
                    {orders.map((v, i) =>
                        <li className='orders__item' key={i}>
                            <div className="orders__left">
                                <h3 className="orders__subtitle">{v.name}</h3>
                                <p className="orders__description">{v.description}</p>
                                <p>{v.price} &#8381;</p>
                            </div>
                            <button className="orders__respond" onClick={() => {
                                setVisible(true)
                                setCurrentOrder(v.id)
                            }}>Откликнуться</button>
                        </li>
                    )}
                </ul>
                {isLoading && <div className='orders__loader'></div>}
               <Modal visible={visible} setVisible={setVisible}>
                    <div className="respond" onClick={(event) => event.stopPropagation()}>
                        <h2 className="respond__title">Оставьте свои контакты</h2>
                        <textarea className='respond__field' value={respondMessage} onChange={(e) => setRespondMessage(e.target.value)}/>
                        <button className='respond__send' onClick={() => {
                            sendRespond(currentOrder, respondMessage)
                                .then((value) => console.log(value.data))
                            setCurrentOrder(-1)
                            setRespondMessage('')
                            setVisible(false)
                        }}>Отправить отклик</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}