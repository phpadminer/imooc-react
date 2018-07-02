import React from 'react'
// 引入logo组件
import Logo from '../../component/logo/logo'
import {WhiteSpace,List,WingBlank,InputItem,Button} from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'

import { connect } from 'react-redux'
import { login } from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handChange = this.handChange.bind(this)
        this.DoLogin = this.DoLogin.bind(this)
    }
    // 跳转到对应的路由中
    register(){
        this.props.history.push('/register')
    }
    // 当输入有变化的时候 将输入的值赋值给state对应的字段
    handChange(name,val){
        this.setState({
            [name] : val
        })
    }
    DoLogin(){
        // console.log(this.props.login)
         this.props.login(this.state)
    }
    render(){
        return(
            <div>
                {this.props.url?<Redirect to={this.props.url}/>:null}

                <Logo></Logo>
                <WingBlank>
                    <List>
                        {this.props.msg?<p>{this.props.msg}</p>:null}
                        <InputItem
                            clear='true'
                            onChange={(v)=>this.handChange('user',v)}
                        >用户名</InputItem>
                        <InputItem
                            clear='true'
                            onChange = {
                                (v) => this.handChange('pwd', v)
                            }
                            placeholder='请输入6位以上的数字和字母'
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button
                        type="primary"
                        onClick={this.DoLogin}
                    >登录</Button>
                    <WhiteSpace />
                    <Button onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default connect(state=>state.user, {login})(Login)
