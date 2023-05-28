import '../styles/Multifilter.scss'
import {useEffect, useRef, useState} from "react";

function useOutsideClick(elementRef, handler, attached = true){
    useEffect(() => {
        if (!attached) return
        const handleClick = (e) => {
            if (!elementRef.current) return;
            if (!elementRef.current.contains(e.target)){
                handler();
            }
        }
        document.addEventListener('click', handleClick)
        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [elementRef, handler, attached])
}

export default function MultipleFilter({options, onChangeSetter, value, name, placeholder}){
    const [isActive, setIsActive] = useState(false)
    const elementRef = useRef(null)

    useOutsideClick(elementRef, () => setIsActive(false), isActive)

    return (
        <div className='multifilter' onClick={() => setIsActive(!isActive)} ref={elementRef}>
            <div className="multifilter__values">{value.length > 0 ? value.join(', '): placeholder}</div>
            <div className={["multifilter__dropdown", isActive && 'active'].join(' ')}>
                <ul className="multifilter__list">
                    {options.map((v,i) => <li key={i} className={['multifilter__value', value.includes(v) && 'selected'].join(' ')} onClick={(e) => {
                        e.stopPropagation()
                        const updatedValues = value.includes(v) ?
                            [...value.filter((value) => value !== v)] :
                            [...value, v]
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