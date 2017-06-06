import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import photo from '../../static/Icon/photo.svg';
import './style.less';
export default class ImgUpLoad extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            files: []
        };
    }
    changeHandle(e){
        e.preventDefault();
        let target = e.target;
        let files = target.files;
        let count = files.length
        for(let i = 0;i < count;i++){
            files[i].url = URL.createObjectURL(files[i]);
        }
        //转换为真正的数组
        files = Array.from(files);
        files = files.filter(file=>{
            return /image/i.test(file.type);
        });
        this.setState({
            files: this.state.files.concat(files)
        },()=>{this.props.getFiles(this.state.files);});

    }
    _closeHandle(index){
        let arr = [];
        let files = this.state.files;
        arr = files.filter((item, i) => {
            if(i != index){
                return item;
            }else{
                URL.revokeObjectURL(item.url);
            }
        });
        this.setState({
            files: arr
        },()=>{this.props.getFiles(this.state.files);});

    }
    _renderImg(){
       return this.state.files.map((item, index)=>{
           const style ={
                background: `url(${item.url}) center center /cover`,
           };
            return (
                <div className='img-item' key={index} style={style}>
                    <div className='close-btn' onClick={()=>{this._closeHandle(index)}}></div>
                </div>
            );
        });
    }
    render(){
        return(
            <div className='img-container clear-fix'>
                {this._renderImg()}
                <label htmlFor='upload' className='upload-btn' onChange={(e)=>this.changeHandle(e)} >
                    <img src={photo} alt=""/>
                    <input type="file" id='upload' multiple="multiple"/>
                </label>
            </div>
        );
    }
}
