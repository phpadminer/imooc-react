// 这个文件是用来验证用户注册信息的
import axios from 'axios'
import { getRedirectPath } from '../util'
const ERROR_MSG = 'register_error'
const REG_SUCCESS_MSG = 'register_success'
const LOG_SUCCESS_MSG ='login_success'
const INIT_STATE = {
  isAuth:false,
  msg: '',
  user: '',
  pwd: '',
  type: '',
  url:'',
}
// reducer
export function user(state=INIT_STATE, action) {
  switch (action.type) {
    case REG_SUCCESS_MSG:
      console.log(action.payload)
    // 如果验证通过了后就继续就跳转到指定的位置
      return {...state,msg:'',isAuth:true,url:getRedirectPath(action.payload),...action.payload};
      break;
    case ERROR_MSG:
      return {...state,isAuth:false,msg:action.msg}
    case LOG_SUCCESS_MSG:
      return {...state,isAuth:true,url:getRedirectPath(action.payload),...action.payload}
    default:
      return state;
  }
}

function registerSuccess(data){
  return {type:REG_SUCCESS_MSG,payload:data}
}

function loginSuccess(data) {
  return {
    type: LOG_SUCCESS_MSG,
    payload: data
  }
}

function errorMsg(msg) {
  return {
    msg,
    type: ERROR_MSG
  }
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
          dispatch(registerSuccess({user,pwd,type}))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }
}

export function login({user,pwd}){
  // 首先验证用户名和密码是否为空格
  if(!user || !pwd){
    return errorMsg('用户名或密码不能为空')
  }
  return dispatch => {
    axios.post('/user/login', {user,pwd})
      .then(res => {
        if (res.status == 200 && res.data.code === 0) {
          dispatch(loginSuccess(res.data.data))
        } else {
          dispatch(errorMsg(res.data.msg))
        }
      })
  }


}