import '../../styles/Student/Tutors.scss'
import {useEffect, useState} from "react";
import $http from "../../http/http";
import {useNavigate} from "react-router-dom";

export default function TutorsPage(){
    const [tutors, setTutors] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        $http.get('/api/experts')
            .then((value) => setTutors(value.data))
    }, [])

    return (
        <div className='tutors'>
            <h3 className='tutors__subtitle'>Доступные репетиторы</h3>
            <ul className='tutors__list'>
                {tutors.map((v,i) =>
                    <li className='tutors__item' onClick={() => navigate(`/tutor/${v.id}`)} key={i}>
                        <div className="tutors__header">
                            <img src="../../img/profile.png" alt="" className="tutors__icon"/>
                            <div className="tutors__personal">
                                <h3 className="tutors__name">{v.name}</h3>
                                <p className="tutors__specialty">{v.learning_trajectory}</p>
                            </div>
                            <button className="tutors__message-btn"></button>
                        </div>
                        <ul className="tutors__competencies">
                            {v.competencies.map((competence, idx) => <li className="tutors__competence" key={idx}>{competence}</li>)}
                        </ul>
                        <p className="tutors__about-self">
                            {v.about_self}
                        </p>
                        <div className="tutors__footer">
                            <a className="tutors__reviews">18 отзывов</a>
                        </div>
                    </li>
                )}

            </ul>
        </div>
    )
}