import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParentContainer from '../../components/ParentContainer';
import { getGoodsInfo } from '../../fetch/Detail';
import ReactSwipe from 'react-swipe';
import './style.less';
export default class goodsDetail extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isOK: false,
            data: [],
            index: 0
        }
    }
    componentDidMount(){
        const result = getGoodsInfo(this.props.params.id);
        result.then((res)=>res.json())
            .then((json)=>{
                if(json == null || !json.name){
                    console.log('error');
                    return;
                }
                const data = json;
                this.setState({
                    isOK: true,
                    data
                })
            });
    }
    render(){
        const opt = {
            speed: 400,
            auto: 3000,
            continuous: true,
            disableScroll: false,
            stopPropagation: false,
            callback: (index) => {
                console.log(index);
                this.setState({
                    index
                })
            }
        };
        return(
            <ParentContainer>
                {
                    this.state.isOK ?
                        <div className="swipe-container">
                            <ReactSwipe className="carousel" swipeOptions={opt}>
                                {
                                    this.state.data.pics.map((item, index)=>{
                                        const info = {
                                            background: `url(${item}) center center no-repeat /cover`,
                                        };
                                        return(
                                            <div className='detail-img' style={info} key={index}></div>
                                        )
                                    })
                                }
                            </ReactSwipe>
                            <ul className="swipe-group">
                                {
                                    this.state.data.pics.map((item, index) => {
                                        return(
                                            <li className={this.state.index == index ? 'swipe-btn active' : 'swipe-btn'} key={index}></li>
                                        )
                                    })
                                }
                            </ul>
                            <h3>{this.state.data.name}</h3>
                            <hr/>
                            <p>{this.state.data.description}</p>
                        </div>
                        : <h5>LOADING...</h5>
                }
            </ParentContainer>
        );
    }
}