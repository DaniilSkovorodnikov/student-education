import {useState} from "react";
import StudentOrders from "./StudentOrders";
import TutorsPage from "./TutorsPage";

export default function StudentMain(){
    const [state, setState] = useState('tutors')

    return (
        <div>
            <p onClick={() => setState('tutors')}>Репетиторы</p>
            <p onClick={() => setState('orders')}>Заказы</p>
            {state === 'tutors' ? <TutorsPage/> : <StudentOrders/>}
        </div>
    )
}