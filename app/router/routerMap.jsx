import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import App from '../containers';
import Home from '../containers/Home';
import NotFound from '../containers/404';
import Detail from '../containers/Detail';
import Publish from '../containers/Publish';
import nav from '../store/nav';
import GoodsDetail from '../containers/goodsDetail';
export default class RouterMap extends React.Component{
    render(){
        return (
            <Router history={ this.props.history }>
                <Route path='/' component={App}>
                    <IndexRoute component={Detail} onEnter={()=>{
                        nav.nowView = 'detail';
                    }}/>
                    <Route path='detail' component={Home} onEnter={()=>{
                        nav.nowView = 'home';
                    }}/>
                    <Route path='publish' component={Publish} onEnter={()=>{
                        nav.nowView = 'publish';
                    }}/>
                    <Route path='GoodsDetail/:id' component={GoodsDetail} onEnter={()=>{
                        nav.nowView = 'GoodsDetail';
                    }}/>
                    <Route path='*' component={NotFound} onEnter={()=>{
                        nav.nowView = '404';
                    }}/>
                </Route>
            </Router>
        );
    }
}