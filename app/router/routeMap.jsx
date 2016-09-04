import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import App from '../containers'
import Home from '../containers/Home'

class RouterMap extends React.Component {
    render() {
        return (
            <Router history={this.props.history}>
                <Route path='/' component={App}>
                    <IndexRoute component={Home}/>

                    {/* 选择城市页面 */}
                    <Route path='/city' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                          cb(null, require('../containers/City'))
                        })
                    }}/>

                    {/* 个人中心页面 */}
                    <Route path='/user' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                          cb(null, require('../containers/User'))
                        })
                    }}/>

                    {/* 索索页面 */}
                    <Route path='/search/:type(/:keyword)' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                          cb(null, require('../containers/Search'))
                        })
                    }}/>
                    
                    {/* 商户详情页 */}
                    <Route path='/detail/:id' getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                          cb(null, require('../containers/Detail'))
                        })
                    }}/>

                    <Route path="*" getComponent={(nextState, cb) => {
                        require.ensure([], (require) => {
                          cb(null, require('../containers/404'))
                        })
                    }}/>
                </Route>
            </Router>
        )
    }
}

export default RouterMap
