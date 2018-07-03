// 这个文件是用来验证用户注册信息的
import axios from 'axios'
import { getRedirectPath } from '../util'
const ERROR_MSG = 'register_error'
const AUTH_SUCCESS = 'auth_success'
const LOAD_DATA = 'load_user_data'
const INIT_STATE = {
  msg: '',
  user: '',
  pwd: '',
  type: '',
  url:'',
}
// reducer
export function user(state=INIT_STATE, action) {
  switch (action.type) {
    case AUTH_SUCCESS:
    // 如果验证通过了后就继续就跳转到指定的位置
      return {...state,msg:'',url:getRedirectPath(action.payload),...action.payload};
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    case LOAD_DATA :
    console.log(action.payload)
      return {...state,...action.payload}
    default:
      return state;
  }
}
export function loadData(userinfo) {
  console.log(userinfo)
  return {type:LOAD_DATA,payload:userinfo}
}

// 当注册/登录/更新数据验证成功后的函数
function authSuccess(data){
  return {type:AUTH_SUCCESS,payload:data}
}

// 当报错的时候的函数
function errorMsg(msg) {
  return { msg,type: ERROR_MSG}
}

// 判断注册功能的模块
export function register({user,pwd,repwd,type})
{  // 首先先判断是否为空
  if (!user || !pwd || !type) {
    // console.log(user,pwd,type)
    // console.log(1111)
    return errorMsg('用户名或密码不能为空')
  }
  // 判断两次输入的密码是否都正确
  if (pwd !== repwd) {
    return errorMsg('两次密码输入不一致')
  }
  // 判断请求发送是否成功
  return dispatch => {
    axios.post('/user/register', {user,pwd,type})
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          dispatch(authSuccess({user,pwd,type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
// 登录验证函数
export function login({user,pwd}){
  // 首先验证用户名和密码是否为空格
  if(!user || !pwd){
    return errorMsg('用户名或密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login', {user,pwd})
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}
// 更新验证函数
export function update (data) {
  return dispatch=>{
    axios.post('/user/update',data)
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          dispatch(authSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}