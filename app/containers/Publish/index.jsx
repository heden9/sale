import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParentContainer from '../../components/ParentContainer';
import ImgUpLoad from '../../components/ImgUpLoad';
import './style.less';
export default class Publish extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            goodsName: '',
            goodsDes: '',
            files: [],
            canPublish: false
        };
    }
    publish(){
        if(!this.state.canPublish)
            return;
        console.log(this.state.goodsName);
        console.log(this.state.files);
    }
    getFiles(files){
        this.setState({
            files: files
        })
    }
    render(){
        return(
            <ParentContainer>
                <div id='publish-btn' onClick={()=>this.publish()} style={this.state.canPublish ? {color: 'white'} : {color: 'rgba(255,255,255,.5)'}}>发布</div>
                <div className='publish-container'>
                    <textarea rows="8" className='publish-txt'
                          placeholder='请填写商品描述、心理价位、联系方式...'
                              value={this.state.goodsDes}
                              onChange={(e)=>{
                                    const val = e.target.value;
                                    let flag = val && this.state.goodsName;
                                    this.setState({
                                        goodsDes: val,
                                        canPublish: flag
                                    });
                                }}/>
                    <ImgUpLoad getFiles={this.getFiles.bind(this)} />
                </div>
                <div className='goodsName'>
                    <input type="text"
                           value={this.state.goodsName}
                           placeholder='请输入商品名称'
                           onChange={(e)=>{
                                const val = e.target.value;
                                let flag = val && this.state.goodsDes;
                                this.setState({
                                    goodsName: val,
                                    canPublish: flag
                                });
                            }}/>
                </div>
            </ParentContainer>
        );
    }
}