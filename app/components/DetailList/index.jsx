import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less';
export default class DetailList extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render(){
        return(
            <div className='detail-list'>
                {
                    this.props.List.map((item, index)=>{
                        return (
                            <Item key={index} data={item}/>
                        );
                    })
                }
            </div>
        );
    }
}

class Item extends React.Component{
    render(){
        const data = this.props.data;
        let info = {
            background: `url(${data.pics[0]}) center center no-repeat /cover`,
        };
        return(
            <div className='Item'>
                <div className='img' style={info}></div>
                <h4 className='title'>{this.props.data.name}</h4>
            </div>
        );
    }
}