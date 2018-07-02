import React from  'react'
import { connect } from 'react-redux'
import { Del_Gun_Async,Add_Gun,Del_Gun } from './index.redux'
import Button from 'antd/lib/button'
import 'antd/dist/antd.css'
let mapStateProps = (state) => {
    return {num:state}
}
let actionCreators = {Add_Gun,Del_Gun_Async,Del_Gun}

class App extends React.Component{
    render(){
        return (
            <div>
                <h1>num为{this.props.num}</h1>
                <Button type="primary" onClick={this.props.Add_Gun}>申请武器</Button>
                <Button type="danger" onClick={this.props.Del_Gun}>上交武器</Button>
                <Button type="default" onClick={this.props.Del_Gun_Async }>上交武器</Button>
            </div>
           
        )
    }
}

App = connect(mapStateProps,actionCreators)(App)
export default App