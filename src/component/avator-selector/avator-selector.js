import React, { Component } from 'react'
import { Grid ,List } from 'antd-mobile';

export default class AvatorSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const avators = 'meinv1,meinv2,shuaige,shamao'
                    .split(',')
                    .map((v) => ({
                      icon: require(`../../imgs/${v}.jpg`),
                      text: v,
                    }));
    const gridHeader = this.state.text
                      ?(<div>
                        <span>已选择头像</span>
                        <img  style={{width:20}} src={this.state.icon} alt=""/>
                      </div>)
                      :'请选择头像'
    return (
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid
            data={avators}
            onClick={elm=>{
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
            columnNum={5}
          />
        </List>

      </div>
    )
  }
}
