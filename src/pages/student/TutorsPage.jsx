import '../../styles/Student/Tutors.scss'
import '../../styles/Filters.scss'
import avatar from '../../img/avatar.jpg'
import {useEffect, useState} from "react";
import $http from "../../http/http";
import {useNavigate} from "react-router-dom";
import {getCompetencies, getTrajectories, RuEducationStage} from "../../helpers/UserHelper";
import MultipleFilter from "../../components/MultipleFilter";

export default function TutorsPage(){
    const [tutors, setTutors] = useState([])
    const [subjects, setSubjects] = useState([])
    const [trajectories, setTrajectories] = useState([])
    const [filters, setFilters] = useState({
        subjects: [],
        trajectories: [],
        courses: [],
        sex: ''
    })
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        getCompetencies()
            .then((value) => setSubjects(value))
        getTrajectories()
            .then((value) => setTrajectories(value))
        $http.get('/api/experts')
            .then((value) => setTutors(value.data))
            .finally(() => setIsLoading(false))
    }, [])

    return (
        <div className='tutors'>
            <div className="tutors__filters filters">
                <MultipleFilter options={subjects} onChangeSetter={setFilters} value={filters.subjects} name={'subjects'} placeholder='По всем темам'/>
                <MultipleFilter options={trajectories} onChangeSetter={setFilters} value={filters.trajectories} name={'trajectories'} placeholder='Направление подготовки репетитора'/>
                <MultipleFilter options={[1,2,3,4,5,6]} onChangeSetter={setFilters} value={filters.courses} name={'courses'} placeholder='Курс репетитора'/>
                <div className="filters__field">
                    <h3 className='filters__subtitle'>Пол репетитора</h3>
                    <label className='filters__label'>
                        <input type='radio'
                               name='sex'
                               value='male'
                               className='filters__checkbox'
                               onChange={(e) => setFilters({...filters, sex: e.target.value})}
                               checked={filters.sex && filters.sex === 'male'}
                        /> Мужской
                    </label>
                    <label className='filters__label'>
                        <input type='radio'
                               name='sex'
                               value='female'
                               className='filters__checkbox'
                               onChange={(e) => setFilters({...filters, sex: e.target.value})}
                               checked={filters.sex && filters.sex === 'female'}
                        /> Женский
                    </label>
                </div>
                <button className='filters__reset' onClick={() => setFilters({
                    subjects: [],
                    trajectories: [],
                    courses: [],
                    learning_type: '',
                    sex: ''
                })}>Сбросить фильтры</button>
            </div>
            {isLoading && <div className='loader'></div>}
            <ul className='tutors__list'>
                {tutors
                    .filter((value) => {
                        const subjectsFilter = filters.subjects.length === 0 || filters.subjects.some((v) => value.competencies.includes(v))
                        const trajectoryFilter = filters.trajectories.length === 0 || filters.trajectories.includes(value.learning_trajectory)
                        const courseFilter = filters.courses.length === 0 || filters.courses.includes(value.course_number)
                        const sexFilter = !filters.sex || filters.sex === value.sex
                        return subjectsFilter && trajectoryFilter && courseFilter && sexFilter
                    })
                    .map((v,i) =>
                    <li className='tutors__item' onClick={() => navigate(`/tutor/${v.id}`)} key={i}>
                        <div className="tutors__header">
                            <img src={v.image || avatar} alt="" className="tutors__icon"/>
                            <div className="tutors__personal">
                                <h3 className="tutors__name">{v.name}</h3>
                                <p className="tutors__specialty">{v.learning_trajectory}, {v.course_number} курс, {RuEducationStage[v.education_stage]}</p>
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