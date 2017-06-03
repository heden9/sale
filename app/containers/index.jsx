import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Navigator from '../components/Navigator';
import '../static/common.less';
import nav from '../store/nav';
export default class App extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            InitDone: false
        };
    }
    componentDidMount(){
        this.setState({
            InitDone: true
        });
    }
    render(){
        return(
            <div id="flex-container">
                <Navigator nowView={nav.nowView}/>
                { this.state.InitDone ? this.props.children : <div>加载中。。。</div> }
            </div>
        );
    }
}
//export default Time;