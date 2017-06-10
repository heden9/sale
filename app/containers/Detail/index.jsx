import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Search from '../../components/Search';
import './style.less';
import ParentContainer from '../../components/ParentContainer';
import info from '../../config/info.jsx';
import DetailList from '../../components/DetailList';
import LoadMore from '../../components/LoadMore';
import { getListData } from '../../fetch/Detail';
export default class Detail extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            List: [],
            waitInfo: true,
            isLoading: false,
            hasMore: false,
            lastID: 0,
        };
    }
    componentDidMount(){
        this.getFirstData();
    }
    getFirstData(){
        const result = getListData();
        this.resultHandle(result);
    }
    loadMoreData(){
        this.setState({
            isLoading: true
        });
        const result = getListData(this.state.lastID);
        this.resultHandle(result);
        this.setState({
            isLoading: false
        });

    }
    resultHandle(result){
        result.then((res)=>res.json())
            .then((json)=>{
                const data = json;
                this.setState({
                    List: this.state.List.concat(data),
                    lastID: data.length ?  data[data.length-1].id : -1,
                    hasMore: data.length >= 10 ? true : false,
                    waitInfo: false
                });
        });
    }
    searchHandle(data){
        if(data == '')
            return;
        this.setState({
            isLoading: true
        });
        const result = getListData(-1,data);
        this.searchResultHandle(result);
        this.setState({
            isLoading: false
        });
    };
    searchResultHandle(result){
        result.then((res)=>res.json())
            .then((json)=>{
                const data = json;
                this.setState({
                    List: data,
                    lastID: data.length ?  data[data.length-1].id : -1,
                    hasMore: data.length >= 10 ? true : false,
                });
            });
    };
    render(){
        return(
            <ParentContainer top={40}>
                <Search search={this.searchHandle.bind(this)}/>
                {
                    this.state.waitInfo ? <h5>加载中。。。</h5>
                        : <DetailList List={this.state.List}/>
                }
                {
                    this.state.hasMore ?
                        <LoadMore data={[this.state.isLoading,this.loadMoreData.bind(this)]}/>
                        : <h5>到底啦。。</h5>
                }
            </ParentContainer>
        );
    }
}
