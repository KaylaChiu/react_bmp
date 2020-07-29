import React from 'react'
import ReactDom from 'react-dom'

// 引入路由
import {
    HashRouter as Router,
    Route,
    Link
} from 'react-router-dom'

// 引入cookies
import cookies from 'react-cookies'

import './index.css'

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
const SubMenu = Menu.SubMenu;

import TecMgr from './userManage/userManage'

// 创建组件并导出
export default class Page extends React.Component {
    constructor(){
        super()
        this.state = {
            userInfo:{}
        }
    }
    state = {
        collapsed: false,
    };
    // 收缩栏双向数据绑定
    onCollapse = (collapsed) => {
        // console.log(collapsed);
        this.setState({ collapsed });
    }

    // 绑定前
    componentWillMount(){
        // 使用cookies获取用户数据
        this.setState({userInfo:cookies.load("userInfo")});

    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} >
                    <div className="logo">
                        <img src={this.state.userInfo.tc_avatar}/>
                        <h2>{this.state.userInfo.tc_name}</h2>
                    </div>
                    {/* <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline"> */}
                    <Menu theme="dark" mode="inline">
                        <Menu.Item key="1">
                            <Icon type="pie-chart" />
                            <span>platform</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="desktop" />
                            <span><Link to="/main/tecmgt">用户管理</Link></span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Icon type="desktop" />
                            <span>分类管理</span>
                        </Menu.Item>
                        
                        <SubMenu key="4" title={<span><Icon type="team" /><span>课程管理</span></span>}>
                            <Menu.Item key="sub1">商品添加</Menu.Item>
                            <Menu.Item key="sub2">商品列表</Menu.Item>
                        </SubMenu>

                    </Menu>
                </Sider>
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }} />
                    <Content style={{ margin: '0 16px' }}>
                        {/* 面包屑 */}
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>首页</Breadcrumb.Item>
                            <Breadcrumb.Item>用户管理</Breadcrumb.Item>
                        </Breadcrumb>

                        {/* 主界面 */}
                        <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                            <Route path="/main/tecmgt" component={TecMgr}></Route>
                        </div>

                    </Content>
                </Layout>
            </Layout>
        )
    }
}