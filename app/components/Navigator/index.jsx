import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { Link } from 'react-router';
import './style.less';
import add from '../../static/Icon/add.svg';
import more from '../../static/Icon/more.svg';
import re from '../../static/Icon/re.svg';
export default class Navigator extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    _renderBtn(){
        switch(this.props.nowView){
            case 'home': return(<img src={re} alt="" onClick={()=>{window.history.back()}}/>);
            case 'detail': return(<Link to='/publish' className='add-btn'><img src={add} alt=""/></Link>);
            case '404': return(<img src={re} alt="" onClick={()=>{window.history.back()}}/>);
            case 'publish' : return(<img src={re} alt="" onClick={()=>{window.history.back()}}/>);
        }
    }
    render(){
        return(
            <div className='navigator'>
                {this._renderBtn()}
            </div>
        );
    }
}