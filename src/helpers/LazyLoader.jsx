export function debounce(callback){
    clearTimeout(callback.tId)
    callback.tId = setTimeout(function(){
        callback()
    }, 400)
}
