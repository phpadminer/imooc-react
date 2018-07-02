const ADD_GUN = 'add'
const DEL_GUN = 'del'

// 根据老的state和action 生成新的state
function counter(state=0,action){
    switch (action.type) {
        case 'add':
            return state + 1
        case 'del':
            return state - 1
        default:
            return 10
        
    }
}
function Add_Gun(){
    return {type:ADD_GUN}
}
function Del_Gun(){
    return {type:DEL_GUN}
}
function Del_Gun_Async(){
    return dispatch =>{
        setTimeout(() => {
            dispatch(Del_Gun());
        }, 2000);
    }
}

export {counter,Add_Gun,Del_Gun,Del_Gun_Async}