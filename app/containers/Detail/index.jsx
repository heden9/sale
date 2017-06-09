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
                    lastID: data[data.length-1].id,
                    hasMore: true
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
                const id = data.length ? -1 : data[data.length-1].id;
                this.setState({
                    List: data,
                    lastID: id,
                    hasMore: true
                });
            });
    };
    render(){
        return(
            <ParentContainer top={40}>
                <Search search={this.searchHandle.bind(this)}/>
                {
                    this.state.hasMore ?
                        <DetailList List={this.state.List}/>
                        : <h1>加载中。。。</h1>
                }
                <LoadMore data={[this.state.isLoading,this.loadMoreData.bind(this)]}/>
            </ParentContainer>
        );
    }
}
