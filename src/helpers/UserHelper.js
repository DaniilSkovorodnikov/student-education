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
    const user = await $http.get(`/api/user/${id}`)
    return user.data
}

export const getGender = (value) => {
    return value === 'male' ? 'Мужской': 'Женский'
}