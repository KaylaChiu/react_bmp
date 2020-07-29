// 引入react
import React from 'react'
import ReactDom from 'react-dom'

// 导入路由
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// 导入子组件
import SignIn from './components/SignIn/SignIn'
import Home from './components/Home' // 因为文件名为index，所以引入时可以省略

// 创建组件
/* const Main = ()=>{
    return (
        <Router>
            <div>
                <Link to="/singin">登录页</Link>&nbsp;
                <Link to="/main">主页面</Link>&nbsp;
                <Route path="/singin" component={SignIn}></Route>
                <Route path="/main" component={Home}></Route>
            </div>
        </Router>
    )
} */
class Main extends React.Component{
    render(){
        return (
            <Router>
                <div>
                    <Route path="/signin" component={SignIn}></Route>
                    <Route path="/main" component={Home}></Route>
                </div>
            </Router>
        )
    }
}

// 渲染页面
ReactDom.render(
    <Main/>,
    document.getElementById("app")
)