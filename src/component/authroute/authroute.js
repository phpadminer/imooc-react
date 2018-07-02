import React, { Component } from 'react'
// 引入axios
import axios from 'axios'
import { withRouter } from 'react-router-dom'
/**
 * 权限验证
 *
 */
@withRouter
class AuthRoute extends Component {
  // 首先先获取到用户的信息
  componentDidMount(){
    // console.log(this)
      // 判断当前的url地址 如果是login/login 是不需要跳转的
    const PublicPath = ['/login','/register']
    const CurrentPath = this.props.location.pathname
    if(PublicPath.indexOf(CurrentPath) > -1){
      return null
    }
    axios.get('/user/info')
      .then(res=>{
        // 首先观察看一下是否请求成功
        if(res.status == 200){
          if(res.data.code == 0){
            //说明当前是有登录信息的
          }else{
            this.props.history.push('./login')
          }
        }
      })

  }
  // 是否登录

  // 用户的type 是牛人还是boss
  // 用户是否完善信息
  render() {
    return (
      <div>

      </div>
    )
  }
}

export default AuthRoute
