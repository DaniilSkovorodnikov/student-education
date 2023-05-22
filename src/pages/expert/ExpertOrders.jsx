import '../../styles/Expert/ExpertOrder.scss'
import {useEffect, useState} from "react";

export default function ExpertOrders(){
    const [isLoading, setIsLoading] = useState(false)
    const [orders, setOrders] = useState([1,2,3,4,5,6,7,8,9])

    useEffect(() => {
        const listener = () => {
            if (document.documentElement.offsetHeight - (window.scrollY + window.innerHeight) <= 70 && !isLoading) {
                setIsLoading(true)
                setTimeout(() => {
                    setOrders([...orders, ...orders])
                    setIsLoading(false)
                }, 5000)
            }
        }
        document.addEventListener('scroll', listener)
        return () => {
            document.removeEventListener('scroll', listener)
        }
    }, [])

    return (
        <div className='orders'>
            <ul>
                {orders.map((v) =>
                    <div className='orders__item'>
                        <h3 className="orders__title">{v}</h3>
                        <p className="orders__description">проверка лоадинга</p>
                    </div>
                )}
            </ul>


            <button className='orders__respond'>Откликнуться</button>
            {isLoading && <div className='orders__loader'></div>}
        </div>
    )
}