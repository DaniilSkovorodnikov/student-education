import {useParams} from "react-router-dom";
import '../../styles/Student/TutorPage.scss'
import {useEffect, useState} from "react";
import {getUserById, RuEducationStage} from "../../helpers/UserHelper";

export default function StudentTutorPage(){
    const {id} = useParams()
    const [tutor, setTutor] = useState({})

    useEffect(() => {
        getUserById(id)
            .then((value) => setTutor(value))
    })

    return (
        <div className='tutor'>
            <div className="tutor__header">
                <img src="../../img/profile.png" alt="" className="tutors__icon"/>
                <div className="tutor__personal">
                    <h3 className="tutor__name">{tutor.name}</h3>
                </div>
                <p className="tutor__reviews">0 отзывов</p>
                <p className='tutor__rate'>0.0</p>
            </div>
            <p className="tutor__about-self">
                {tutor.about_self}
            </p>
            <ul className="tutor__competencies">
                {tutor.competencies?.map((v, i) => <li className="tutor__competence" key={i}>{v}</li>)}
            </ul>
            <div className="tutor__field">
                <div className="tutor__subtitle">Направление обучения</div>
                <div className="tutor__value">{tutor.learning_trajectory}</div>
            </div>
            <div className="tutor__field">
                <div className="tutor__subtitle">Курс</div>
                <div className="tutor__value">{RuEducationStage[tutor.education_stage]}, {tutor.course_number}</div>
            </div>
            <div className="tutor__reviews-list reviews">
                <div className="reviews__header">
                    <h2 className="reviews__title">Отзывы</h2>
                    <p className='reviews__count'>0</p>
                </div>
                <div className='reviews__divider'/>
            </div>
        </div>
    )
}