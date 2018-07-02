import React from 'react'
import ReactDom from 'react-dom'
import {createStore ,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import {counter} from './index.redux'
import {
    BrowserRouter,
    Route,
    Link
} from 'react-router-dom'

import combineReducers from './reducer'
import './config'
import Login from './container/login/login'
import Register from './container/register/register'
import AuthRoute from './component/authroute/authroute'


let store = createStore(combineReducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension?window.devToolsExtension():()=>{}
))

ReactDom.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                {/* 权限验证 */}
                <AuthRoute></AuthRoute>
                <Route path="/login" component={Login}>{Login}</Route>
                <Route path="/register" component={Register}>{Register}</Route>
            </div>
        </BrowserRouter>
    </Provider>)
    ,document.getElementById('root')
)