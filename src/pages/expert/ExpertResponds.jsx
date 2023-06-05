import '../../styles/Expert/ExpertResponds.scss'
import {useEffect, useState} from "react";

export default function ExpertResponds(){
    const [respondsType, setRespondsType] = useState('opened')
    const [responds, setResponds] = useState([])
    useEffect(() => {

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
                <ul className='responds__list'>
                    <li className='responds__item'>
                        <h2 className='responds__title'>Интегралы</h2>
                        <p className='responds__description'>Определенные и неопределенные интегралы, подготовка к контрольной работе. Учусь на втором курсе у Поторочиной.</p>
                        <p className='responds__learning-type'>Онлайн</p>
                        <p className='responds__price'>550 &#8381;</p>
                    </li>
                </ul>
            </div>

        </div>
    )
}