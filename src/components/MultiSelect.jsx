import '../styles/Multiselect.scss'
import {useState} from "react";

export default function MultiSelect({options, setValue}){
    const [selected, setSelected] = useState([])
    const [currentChecked, setCurrentChecked] = useState(-1)

    return (
        <div className="multiselect">
            <div className="multiselect__container">
                <input type="text" className="multiselect__input" placeholder="Начните вводить компетенции..." />
                <ul className="multiselect__options">
                    {options.map((v, i) => <li className={['multiselect__option', currentChecked === i &&'checked'].join(' ')}
                                               key={i}
                                               onClick={() => {
                                                   if (currentChecked === i && !selected.includes(v)){
                                                       setSelected([...selected, v])
                                                       setCurrentChecked(-1)
                                                       setValue((prev) => [...prev, v])
                                                   }
                                                   else {
                                                       setCurrentChecked(i)
                                                   }
                                               }}
                    >{v}
                    </li>)}
                </ul>
            </div>
            <ul className="multiselect__values">
                {selected.map((v, i) => <li className="multiselect__value" key={i}>
                    {v}
                    <button type='button' className="multiselect__delete" onClick={() => {
                        setValue((prev) => [...prev.filter((v,idx) => idx !== i)])
                        setSelected((prev) => [...prev.filter((v,idx) => idx !== i)])
                    }}>x</button>
                </li>)}
            </ul>
        </div>
    )
}