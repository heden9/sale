import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParentContainer from '../../components/ParentContainer';
import './style.less';
export default class Publish extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentWillMount(){
        this.windowHeight = window.screen.height;
    }
    render(){
        return(
            <ParentContainer>
                <div className='title'>
                    <label htmlFor="">商品名称</label>
                    <div>
                        <input type="text"/>
                    </div>
                </div>
                <textarea name="" id="" cols="50" rows="30" className='publish-txt' style={{height: .5*this.windowHeight}}
                    placeholder='请填写商品描述、心理价位、联系方式...'></textarea>
            </ParentContainer>
        );
    }
}