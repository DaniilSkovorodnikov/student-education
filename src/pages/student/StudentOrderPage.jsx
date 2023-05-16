import '../../styles/Student/StudentOrderPage.scss'
import avatar from '../../img/avatar.jpg'

export default function StudentOrderPage(){
    return (
        <div className='order'>
            <div className="order__main">
                <div className="order__header">
                    <h2 className="order__title">Интегралы</h2>
                    <button className='order__edit'/>
                </div>
                <p className="order__description">Определенные и неопределенные интегралы, подготовка к контрольной работе. Учусь на втором курсе у Поторочиной.</p>
                <p className='order__learning-type'>Очно или онлайн</p>
                <button className='order__delete'>Закрыть задание</button>
            </div>
            <div className="order__experts experts">
                <h2 className='experts__title'>Предложения</h2>
                <ul className='experts__list'>
                    <li className="experts__item">
                        <div className="experts__header">
                            <img src={avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>Максим Цветков</h3>
                                <p className='experts__trajectory'>ИРИТ-РТФ, Программная инженерия, 2 курс</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>Привет! Я неплохо разобрался в интегралах в прошлом семестре и могу на свежую голову все объяснить простым языком. </p>
                        <button className="experts__choose">Выбрать эксперта</button>
                    </li>
                    <li className="experts__item">
                        <div className="experts__header">
                            <img src={avatar} alt="" className='experts__avatar'/>
                            <div className="experts__personal">
                                <h3 className='experts__name'>Максим Цветков</h3>
                                <p className='experts__trajectory'>ИРИТ-РТФ, Программная инженерия, 2 курс</p>
                            </div>
                            <button className='experts__write'/>
                        </div>
                        <p className='experts__description'>Привет! Я неплохо разобрался в интегралах в прошлом семестре и могу на свежую голову все объяснить простым языком. </p>
                        <button className="experts__choose">Выбрать эксперта</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}