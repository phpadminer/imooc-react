import React from 'react'
import { WhiteSpace,List,WingBlank,InputItem,Button,Radio } from 'antd-mobile'
import 'antd-mobile/dist/antd-mobile.css'
// 引入logo模块
import Logo from '../../component/logo/logo'
// 数据连接
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { register }  from '../../redux/user.redux'

// 单选按钮
const RadioItem = Radio.RadioItem;

class Register extends React.Component{
    constructor(props) {
        super(props);
        // 设置初始值
        this.state = {
            type:'niuren',
            user:'',
            pwd:'',
            repwd:'',
        }
        this.login = this.login.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.DoRegister = this.DoRegister.bind(this)
    }
    login(){
        this.props.history.push('/login')
    }
    DoRegister(){
        console.log(this.props)
        this.props.register(this.state)
    }
    handleChange(key,val){
        this.setState({
            [key]:val,
        })
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
                            onChange={v=>this.handleChange('user',v)}
                        >用户名</InputItem>
                        <InputItem
                            clear='true'
                            type='password'
                            onChange = {v => this.handleChange('pwd', v)}
                        > 密码 </InputItem>
                        <InputItem
                            clear='true'
                            type='password'
                            onChange = {v => this.handleChange('repwd', v)}
                        > 确认密码 </InputItem>
                        <WhiteSpace />
                        <RadioItem
                            checked={this.state.type=='niuren'}
                            onChange={()=>this.handleChange('type','niuren')}
                        >
                            牛人
                        </RadioItem>
                        <RadioItem
                            checked={this.state.type=='boss'}
                            onChange={()=>this.handleChange('type','boss')}
                        >
                            BOSS
                        </RadioItem>

                    </List>
                    <WhiteSpace />
                    <Button
                        type="primary"
                        onClick={this.DoRegister}
                    >注册</Button>
                    <WhiteSpace />
                    <Button onClick={this.login}>登录</Button>
                </WingBlank>
            </div>
        )
    }
}

export default connect(state => state.user, {register})(Register)
