import React, { Component } from 'react'
import {NavBar,List,InputItem,WhiteSpace,TextareaItem,Button} from 'antd-mobile'
import AvatorSelector from '../../component/avator-selector/avator-selector';
import {connect} from 'react-redux'
import {update} from '../../redux/user.redux'
import { Redirect } from 'react-router-dom';

// @connect(
//   state=>state.user,
//   {update}
// )
class BossInfo extends Component {
  constructor(props) {
    super(props);
    this.handleChange= this.handleChange.bind(this)
  }

  handleChange(key,val){
    this.setState({
      [key]:val
    })
  }

  render() {
    const currentPath = this.props.location.pathname
    const directUrl = this.props.url
    return (

      <div>

        {(directUrl && directUrl!==currentPath)?<Redirect to={directUrl}/>:null}
        {/* 页眉 */}
        <NavBar mode="dark">牛人信息补充页</NavBar>
        {/* 选择头像 */}
        < AvatorSelector selectAvatar={(imagename)=>{
          this.setState(
            {avatar: imagename}
          )
        }}> </AvatorSelector>
        <List>
          <InputItem
            clear
            onChange={(v)=>{
              this.handleChange('company',v)
            }}
          >公司</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            clear
            onChange={(v)=>{
              this.handleChange('title',v)
            }}
          >职位</InputItem>
          <WhiteSpace></WhiteSpace>
          <InputItem
            clear
            onChange={(v)=>{
                this.handleChange('money',v)
              }}
          >薪酬</InputItem>
          <WhiteSpace></WhiteSpace>
          <TextareaItem
            title="职位要求"
            rows={3}
            autoHeight
            clear
            onChange={(v)=>{
                this.handleChange('desc',v)
              }}
          ></TextareaItem>
          <WhiteSpace></WhiteSpace>
          <Button
            type='primary'
            onClick={()=>{
              this.props.update(this.state)
            }}
          >保存</Button>
        </List>
      </div>
    )
  }
}
export default connect(state=>state.user, {update})(BossInfo)
// export default BossInfo