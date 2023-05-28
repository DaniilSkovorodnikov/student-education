import {useState} from "react";
import StudentOrders from "./StudentOrders";
import TutorsPage from "./TutorsPage";

export default function StudentMain(){
    const [state, setState] = useState('tutors')

    return (
        <div className='main'>
            <div className="main__toggle">
                <p className={['main__changer', state === 'tutors' && 'active'].join(' ')} onClick={() => setState('tutors')}>Поиск репетитора</p>
                <p className={['main__changer', state === 'orders' && 'active'].join(' ')} onClick={() => setState('orders')}>Мои заказы</p>
            </div>
            {state === 'tutors' ? <TutorsPage/> : <StudentOrders/>}
        </div>
    )
}