import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import ParentContainer from '../../components/ParentContainer';
import ImgUpLoad from '../../components/ImgUpLoad';
import { upload,submit } from '../../fetch/Detail';
import { hashHistory } from 'react-router';
import './style.less';
export default class Publish extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            goodsName: '',
            goodsDes: '',
            filesID: [],
            canPublish: false
        };
    }
    publish(){
        if(!this.state.canPublish)
            return;
        const info = {
            name: this.state.goodsName,
            description: this.state.goodsDes,
            pics: this.state.filesID
        };
        const result = submit(info);
        result
            .then((res)=>res.json())
            .then((json)=>{
                console.log(json);
                alert('发布成功');
                hashHistory.push('/');
                })
            .catch((err)=>{
                alert('发布失败');
                   console.log(err);
                });
    }
    getFilesID(id){
        if(!id)
            return;
        this.setState({
            filesID: this.state.filesID.concat(id)
        });
    }
    deleteFilesID(index){
        let arr = this.state.filesID.filter((item, i) => {
            if(i != index){
                return item;
            }
        });
        this.setState({
           filesID: arr
        });
    }
    uploadImg(img,nowIndex,callback){
        if(!img)
            return;
        const formData = new FormData();
        formData.append('file[]', img);
        console.log(img);
        const result = upload(formData);
        result.then((res)=>{
            return res.json();
        }).then((json)=>{
            const data = json || false;
            callback && callback(data,nowIndex);
        }).catch(function(error) {
            console.log('request failed: ', error);
        });
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
                    <ImgUpLoad  upload={this.uploadImg} getID={this.getFilesID.bind(this)} delID={this.deleteFilesID.bind(this)}/>
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