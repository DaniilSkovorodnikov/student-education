import $http from "../http/http";

export function createOrder(order){
    return $http.post('/api/order', order)
}

export async function getOrdersByToken(){
    try {
        const data = await $http.get('/api/user/orders')
        const orders = data.data
        return orders.map((v) => {
            v.learning_type = v.learning_type.split(' ').map((v) => v === 'full-time' ? 'Очно' : 'Онлайн').join(', ')
            return v
        })
    }
    catch (e){
        throw e
    }
}

export async function getOrderById(id){
    try {
        const data = await $http.get(`/api/order/${id}`)
        const order = data.data
        order.learning_type = order.learning_type.split(' ').map((v) => v === 'full-time' ? 'Очно' : 'Онлайн').join(', ')
        return order
    }
    catch (e){
        throw e
    }
}