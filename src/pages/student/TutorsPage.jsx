import '../../styles/Student/Tutors.scss'
import '../../styles/Filters.scss'
import {useEffect, useState} from "react";
import $http from "../../http/http";
import {useNavigate} from "react-router-dom";
import {getCompetencies, getTrajectories} from "../../helpers/UserHelper";
import MultipleFilter from "../../components/MultipleFilter";

export default function TutorsPage(){
    const [tutors, setTutors] = useState([])
    const [subjects, setSubjects] = useState([])
    const [trajectories, setTrajectories] = useState([])
    const [filters, setFilters] = useState({
        subjects: [],
        trajectories: [],
        courses: [],
        learning_types: [],
        sex: []
    })
    const navigate = useNavigate()

    useEffect(() => {
        getCompetencies()
            .then((value) => setSubjects(value))
        getTrajectories()
            .then((value) => setTrajectories(value))
    }, [])

    useEffect(() => {
        $http.get('/api/experts')
            .then((value) => setTutors(value.data))
    }, [])

    return (
        <div className='tutors'>
            <div className="tutors__filters filters">
                <MultipleFilter options={subjects} onChangeSetter={setFilters} name={'subjects'} placeholder='По всем предметам'/>
                <MultipleFilter options={trajectories} onChangeSetter={setFilters} name={'trajectories'} placeholder='Направление подготовки репетитора'/>
                <MultipleFilter options={[1,2,3,4,5,6]} onChangeSetter={setFilters} name={'courses'} placeholder='Курс репетитора'/>
                <div className="filters__field">
                    <h3 className='filters__subtitle'>Формат взаимодействия</h3>
                    <label className='filters__label'>
                        <input type='checkbox'
                               value='full-time'
                               className='filters__checkbox'
                               onChange={(e) => {
                                   filters.learning_types.includes(e.target.value) ?
                                       setFilters({...filters, learning_types: [...filters.learning_types.filter((value) => value !== e.target.value)]}) :
                                       setFilters({...filters, learning_types: [...filters.learning_types, e.target.value]})
                               }}/> Очно
                    </label>
                    <label className='filters__label'>
                        <input type='checkbox'
                               value='online'
                               className='filters__checkbox'
                               onChange={(e) => {
                                   filters.learning_types.includes(e.target.value) ?
                                       setFilters({...filters, learning_types: [...filters.learning_types.filter((value) => value !== e.target.value)]}) :
                                       setFilters({...filters, learning_types: [...filters.learning_types, e.target.value]})
                               }}/>
                         Онлайн
                    </label>
                </div>
                <div className="filters__field">
                    <h3 className='filters__subtitle'>Пол репетитора</h3>
                    <label className='filters__label'>
                        <input type='checkbox'
                               value='male'
                               className='filters__checkbox'
                               onChange={(e) => {
                                   filters.sex.includes(e.target.value) ?
                                       setFilters({...filters, sex: [...filters.sex.filter((value) => value !== e.target.value)]}) :
                                       setFilters({...filters, sex: [...filters.sex, e.target.value]})
                               }}
                        /> Мужской
                    </label>
                    <label className='filters__label'>
                        <input type='checkbox'
                               value='female'
                               className='filters__checkbox'
                               onChange={(e) => {
                                   filters.sex.includes(e.target.value) ?
                                       setFilters({...filters, sex: [...filters.sex.filter((value) => value !== e.target.value)]}) :
                                       setFilters({...filters, sex: [...filters.sex, e.target.value]})
                               }}
                        /> Женский
                    </label>
                </div>
            </div>
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