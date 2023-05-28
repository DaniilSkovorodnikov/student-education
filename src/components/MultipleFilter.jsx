import '../styles/Multifilter.scss'
import {useState} from "react";

export default function MultipleFilter({options, onChangeSetter, name, placeholder}){
    const [values, setValues] = useState([])
    const [isActive, setIsActive] = useState(false)

    return (
        <div className='multifilter' onClick={() => setIsActive(!isActive)}>
            <div className="multifilter__values">{values.length > 0 ? values.join(', '): placeholder}</div>
            <div className={["multifilter__dropdown", isActive && 'active'].join(' ')}>
                <ul className="multifilter__list">
                    {options.map((v,i) => <li key={i} className={['multifilter__value', values.includes(v) && 'selected'].join(' ')} onClick={(e) => {
                        e.stopPropagation()
                        const updatedValues = values.includes(v) ?
                            [...values.filter((value) => value !== v)] :
                            [...values, v]
                        setValues(updatedValues)
                        onChangeSetter(prev => ({
                            ...prev,
                            [name]: updatedValues
                        }))
                    }
                    }>{v}</li>)}
                </ul>
            </div>
        </div>
    )
}