import '../../styles/Expert/ExpertResponds.scss'
import {useEffect, useState} from "react";
import {getLearningType, getRespondsByToken} from "../../helpers/OrderHelper";

export default function ExpertResponds(){
    const [respondsType, setRespondsType] = useState('opened')
    const [responds, setResponds] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        getRespondsByToken()
            .then((value) => setResponds(value))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className='responds'>
            <div className="responds__header">
                <ul className='responds__types'>
                    <li
                        className={['responds__type', respondsType === 'opened' && 'active'].join(' ')}
                        onClick={() => setRespondsType('opened')}
                    >Открытые</li>
                    <li
                        className={['responds__type', respondsType === 'accepted' && 'active'].join(' ')}
                        onClick={() => setRespondsType('accepted')}
                    >Принятые</li>
                    <li
                        className={['responds__type', respondsType === 'rejected' && 'active'].join(' ')}
                        onClick={() => setRespondsType('rejected')}
                    >Отклоненные</li>
                </ul>
                {isLoading && <div className='loader'></div>}
                <ul className='responds__list'>
                    {responds.filter((value) => value.status === respondsType).map((v,i) => <li className='responds__item' key={i}>
                        <h2 className='responds__title'>{v.order.name}</h2>
                        <p className='responds__description'>{v.order.description}</p>
                        <p className='responds__learning-type'>{getLearningType(v.order.learning_type)}</p>
                        <p className='responds__price'>{v.order.price} &#8381;</p>
                    </li>)}
                </ul>
            </div>

        </div>
    )
}