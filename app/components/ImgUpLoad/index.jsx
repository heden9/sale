import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import photo from '../../static/Icon/photo.svg';
import './style.less';
const taskQueue = [];
export default class ImgUpLoad extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            files: [],
        };
    }
    changeHandle(e){
        e.preventDefault();
        let files = e.target.files;
        let count = files.length
        for(let i = 0;i < count;i++){
            files[i].url = URL.createObjectURL(files[i]);
        }
        //转换为真正的数组
        files = Array.from(files);
        files.splice(1);
        files = files.filter(file=>{
            return /image/i.test(file.type);
        });

        if(!files.length)
            return;

        let fileTemp = [];

        for(let i = 0; i < files.length; i++){
            const fileItem = {
                data: files[i],
                isUploading: true,
                resultInfo: '待上传'
            };

            fileTemp.push(fileItem);
            taskQueue.push(fileItem);
        }
        let timer = setInterval(()=>{
            if(!taskQueue.length){
                clearInterval(timer);
                return;
            }
            this.props.upload(taskQueue.shift().data,this.state.files.length-1,(id,returnIndex)=>{
                let fileTemp = this.state.files;
                const err = !id ? '上传失败' : '';
                fileTemp[returnIndex].isUploading = false;
                fileTemp[returnIndex].resultInfo = err || '已成功';
                this.props.getID(id);
                this.setState({
                    files: [].concat(fileTemp)
                });
            });
        },0);




        this.setState({
            files: this.state.files.concat(fileTemp),
        });

    }
    _closeHandle(index){
        //删除时 需要将input置空
        const btn = this.refs.fileINPUT;
        btn.value = '';
        let files = this.state.files;
        let arr = files.filter((item, i) => {
            if(i != index){
                return item;
            }else{
                URL.revokeObjectURL(item.data.url);
            }
        });

        this.setState({
            files: arr
        });
        this.props.delID(index);

    }
    _renderImg(){
       return this.state.files.map((item, index)=>{
           const style ={
                background: `url(${item.data.url}) center center /cover`,
           };
            return (
                <div className='img-item' key={index} style={style}>
                    <div className='img-layer'>
                        <div className='close-btn' onClick={()=>{this._closeHandle(index)}}></div>
                        {
                            item.isUploading ? <span>上传中..</span> : <span>{ item.resultInfo }</span>
                        }
                    </div>
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
                    <input type="file" id='upload' multiple="multiple" ref='fileINPUT' />
                </label>
            </div>
        );
    }
}
