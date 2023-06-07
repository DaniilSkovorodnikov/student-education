import '../../styles/Expert/ExpertOrders.scss'
import '../../styles/Filters.scss'
import {useCallback, useEffect, useState} from "react";
import {getOrdersByPage, sendRespond} from "../../helpers/OrderHelper";
import {debounce} from "../../components/LazyLoader";
import Modal from "../../components/Modal";
import MultipleFilter from "../../components/MultipleFilter";
import {getCompetencies, getTrajectories} from "../../helpers/UserHelper";


export default function ExpertOrders({stageSetter}){
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState(false)
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
    })

    const scrollHandler = useCallback(() => {
        if (document.documentElement.offsetHeight - (window.scrollY + window.outerHeight) <= 70) {
            setPage(prevState => ++prevState)
        }
    }, [])
    const debouncedListener = useCallback(() => { debounce(scrollHandler) }, [])

    useEffect(() => {
        getCompetencies()
            .then((value) => setSubjects(value))
        getTrajectories()
            .then((value) => setTrajectories(value))
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
                .catch((err) => setError(true))
                .finally(() => setIsLoading(false))

    }, [page])

    return (
        <div className='expert'>
            <div className='orders'>
                <div className="orders__filters filters">
                    <MultipleFilter options={subjects} onChangeSetter={setFilters} value={filters.subjects} name={'subjects'} placeholder='По всем темам'/>
                    <MultipleFilter options={trajectories} onChangeSetter={setFilters} value={filters.trajectories} name={'trajectories'} placeholder='Направление подготовки репетитора'/>
                    <MultipleFilter options={[1,2,3,4,5,6]} onChangeSetter={setFilters} value={filters.courses} name={'courses'} placeholder='Курс студента'/>
                    <div className="filters__field">
                        <h3 className='filters__subtitle'>Формат взаимодействия</h3>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='learning_type'
                                   value='Очно'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, learning_type: e.target.value})}
                                   checked={filters.learning_type && filters.learning_type === 'Очно'}/> Очно
                        </label>
                        <label className='filters__label'>
                            <input type='radio'
                                   name='learning_type'
                                   value='Онлайн'
                                   className='filters__checkbox'
                                   onChange={(e) => setFilters({...filters, learning_type: e.target.value})}
                                   checked={filters.learning_type && filters.learning_type === 'Онлайн'}/>
                            Онлайн
                        </label>
                    </div>
                    <button className='filters__reset' onClick={() => setFilters({
                        subjects: [],
                        trajectories: [],
                        courses: [],
                        learning_type: '',
                        sex: ''
                    })}>Сбросить фильтры</button>
                </div>
                {(error || orders.length === 0) && !isLoading && <p>К сожалению, сейчас нет доступных заказов!</p>}
                <ul className='orders__list'>
                    {orders
                        .filter((value) => {
                            const subjectsFilter = filters.subjects.length === 0 || filters.subjects.some((v) => value.name === v)
                            const courseFilter = filters.courses.length === 0 || filters.courses.includes(value.course_number)
                            const learningTypeFilter = !filters.learning_type || filters.learning_type === value.learning_type
                            return subjectsFilter && courseFilter && learningTypeFilter
                        })
                        .map((v, i) =>
                        <li className='orders__item' key={i}>
                            <div className="orders__header">
                                <h3 className="orders__subtitle">{v.name}</h3>
                                <p className='orders__learning-type'>{v.learning_type}</p>
                            </div>
                            <p className="orders__description">{v.description}</p>
                            <div className="orders__footer">
                                <p className='orders__price'>{v.price} &#8381;</p>
                                <button className="orders__respond" onClick={() => {
                                    setVisible(true)
                                    setCurrentOrder(v.id)
                                }}>Откликнуться</button>
                            </div>
                        </li>
                    )}
                </ul>
                {isLoading && <div className='loader'></div>}
               <Modal visible={visible} setVisible={setVisible}>
                    <div className="respond" onClick={(event) => event.stopPropagation()}>
                        <h2 className="respond__title">Оставьте свои контакты</h2>
                        <textarea className='respond__field' value={respondMessage} onChange={(e) => setRespondMessage(e.target.value)}/>
                        <button className='respond__send' onClick={() => {
                            sendRespond(currentOrder, respondMessage)
                                .then(() => {
                                    setCurrentOrder(-1)
                                    setRespondMessage('')
                                    setVisible(false)
                                    stageSetter('responds')
                                })
                        }}>Отправить отклик</button>
                    </div>
                </Modal>
            </div>
        </div>
    )
}