import $http, {API_URL} from "../http/http";
import axios from "axios";

export const getEducationStage = (value) => {
    if (value > 5 && value % 5 > 0){
        return'magistracy'
    }
    if (value % 5 === 0 ){
        return 'specialty'
    }
    return 'bachelor'
}
export const courses = [
    'Бакалавриат, специалитет - 1 курс',
    'Бакалавриат, специалитет - 2 курс',
    'Бакалавриат, специалитет - 3 курс',
    'Бакалавриат, специалитет - 4 курс',
    'Специалитет - 5 курс',
    'Магистратура - 1 курс',
    'Магистратура - 2 курс',
]

export const getCourse = (courseNumber, educationStage) => {
    return educationStage === 'magistracy' ? courseNumber + 5 : courseNumber
}


export const getCompetencies = async () => {
    const competencies = await axios.get(`${API_URL}/api/competencies`)
    return competencies.data.map((v) => v.name)
}

export const getTrajectories = async () => {
    const trajectories = await axios.get(`${API_URL}/api/trajectories`)
    return trajectories.data.map((v) => v.name)
}

export const getUserInfo = async () => {
    try {
        const response = await $http.get('/api/user')
        return response.data.user
    }
    catch (err){
        throw err
    }
}

export const getUserById = async (id) => {
    const user = await axios.get(`${API_URL}/api/user/${id}`)
    return user.data
}

export const getGender = (value) => {
    return value === 'male' ? 'Мужской': 'Женский'
}

export const RuEducationStage = {
    'bachelor': 'Бакалавр',
    'specialty': 'Специалитет',
    'magistracy': 'Магистратура'
}