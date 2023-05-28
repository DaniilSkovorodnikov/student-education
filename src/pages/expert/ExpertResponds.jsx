import '../../styles/Expert/ExpertResponds.scss'
import {useState} from "react";

export default function ExpertResponds(){
    const [respondsType, setRespondsType] = useState('opened')

    return (
        <div className='responds'>
            <div className="responds__header">
                <ul className='responds__types'>
                    <li className={['responds__type', respondsType === 'opened' && 'active'].join(' ')}>Открытые</li>
                    <li className={['responds__type', respondsType === 'accepted' && 'active'].join(' ')}>Принятые</li>
                    <li className={['responds__type', respondsType === 'rejected' && 'active'].join(' ')}>Отклоненные</li>
                </ul>
            </div>

        </div>
    )
}