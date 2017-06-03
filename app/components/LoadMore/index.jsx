import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import './style.less';
export default class LoadMore extends React.Component{
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
        const loadMoreFn = this.props.data[1];
        const loadMoreNode = this.refs.loadMore;
        let timerId;
        function callback(){
            const top = loadMoreNode.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            if(top && top < windowHeight)
                loadMoreFn();
        }
        window.addEventListener('scroll', () => {
            if(this.props.data[0])
                return;
            if(timerId)
                clearTimeout(timerId);
            timerId = setTimeout(callback, 50);

        },false);
    }
    render(){
        return(
            <div className='load-more' ref='loadMore'>
                {
                    this.props.data[0] ? <span>加载中。。</span>
                        :<span>加载更多</span>
                }
            </div>
        );
    }
}