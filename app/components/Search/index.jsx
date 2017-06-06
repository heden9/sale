import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less';
import Icon from '../../static/Icon/big.svg';
export default class Search extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value: ''
        };
    }
    componentDidMount(){
        const search = this.refs.search;
        search.addEventListener('search',()=>{
            this.props.search(this.state.value);
        });
    }
    render(){
        return(
            <div className='search'>
                <form className='search-body' onSubmit={(e)=>{e.preventDefault();}}>
                    <img src={Icon} alt=""/>
                    <input id='search-input'
                           type="search"
                           placeholder='搜索'
                           ref='search'
                           value={this.state.value}
                           onChange={(e)=>this.setState({value: e.target.value})}/>
                </form>
            </div>
        );
    }
}