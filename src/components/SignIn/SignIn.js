import React from 'react'
import ReactDom from 'react-dom'

import cookies from 'react-cookies'

import './SignIn.css'

export default class SignIn extends React.Component {
    constructor(){
        super()
        this.state = {
            username:"admin",
            userpsw:"123456"
        }
    }
    submitHandler(e){
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open("post","/api/login");
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.onreadystatechange = ()=>{
            // 请求成功
            if(xhr.readyState == 4 && xhr.status == 200){
                const res = JSON.parse(xhr.responseText);
                // console.log(res);
                // 登录成功
                if(res.code == 200){
                    // 储存cookie
                    cookies.save("userInfo",JSON.stringify(res.result));
                    // 跳转到主页面
                    // 回调函数会改变函数体内this的指向，要改为箭头函数的形式
                    this.props.history.push({"pathname":"main"});
                }
            }
        }
        xhr.send(`tc_name=${this.state.username}&tc_pass=${this.state.userpsw}`);
    }
    render() {
        return (
            <div className="login">
                <div className="login-wrap">
                    <div className="avatar">
                        <img src="./assets/images/default.png" className="img-circle" alt="" />
                    </div>
                    <form onSubmit={this.submitHandler.bind(this)} className="col-md-offset-1 col-md-10">
                        <div className="input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-user"></i>
                            </span>
                            <input type="text" className="form-control" value={this.state.username} 
                            onChange={()=>{}}placeholder="用户名" />
                        </div>
                        <div className="input-group-lg">
                            <span className="input-group-addon">
                                <i className="fa fa-key"></i>
                            </span>
                            <input type="text" className="form-control" value={this.state.userpsw} 
                            onChange={()=>{}}placeholder="密码" />
                        </div>
                        <button type="submit" className="btn btn-lg btn-primary btn-block">登 录</button>
                    </form>
                </div>
            </div>
        )
    }
}