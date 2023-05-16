import $http from "../http/http";

export function createOrder(order){
    return $http.post('/api/order', order)
}