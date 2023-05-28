import {useState} from "react";
import ExpertOrders from "./ExpertOrders";
import ExpertResponds from "./ExpertResponds";

export default function ExpertMain(){
    const [state, setState] = useState('orders')

    return (
        <div className='main'>
            <div className="main__toggle">
                <p className={['main__changer', state === 'orders' && 'active'].join(' ')} onClick={() => setState('orders')}>Мои заказы</p>
                <p className={['main__changer', state === 'responds' && 'active'].join(' ')} onClick={() => setState('responds')}>Мои отклики</p>
            </div>
            {state === 'orders' ? <ExpertOrders/> : <ExpertResponds/>}
        </div>
    )
}