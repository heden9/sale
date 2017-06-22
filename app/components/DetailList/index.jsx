import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less';
import { Link } from 'react-router';
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

const Item  = (props) => {
    const data = props.data;
    let info = {
        background: `url(${data.pics[0]}) center center no-repeat /cover`,
    };
    return(
        <Link to={`/GoodsDetail/${data.id}`} className='Item'>
            <div className='img' style={info}></div>
            <h4 className='title'>{data.name}</h4>
        </Link>
    );
}