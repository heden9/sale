import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less';
import Icon from '../../static/Icon/big.svg';
export default class Search extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        const search = this.refs.search;
        search.addEventListener('search',(e)=>{
            this.props.searchHandle(e.target.value);
        });
    }
    render(){
        return(
            <div className='search'>
                <form className='search-body' onSubmit={()=>false}>
                    <img src={Icon} alt=""/>
                    <input type="search" placeholder='搜索' ref='search'/>
                </form>
            </div>
        );
    }
}