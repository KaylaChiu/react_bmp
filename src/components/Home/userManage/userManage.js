import React from 'react'
import ReactDom from 'react-dom'

import { Table } from 'antd'

import axiosX from '../../../utils/axiosX'

export default class TecMgr extends React.Component {
    constructor() {
        super()
        this.state = {
            dataSource: [],
            columns: [
                {
                    title: '编号',
                    dataIndex: 'key',
                    key: 'key',
                },{
                    title: '姓名',
                    dataIndex: 'tc_name',
                    key: 'tc_name',
                },{
                    title: '昵称',
                    dataIndex: 'tc_roster',
                    key: 'tc_roster',
                },{
                    title: '性别',
                    dataIndex: 'tc_gender',
                    key: 'tc_gender',
                },{
                    title: '手机号码',
                    dataIndex: 'tc_cellphone',
                    key: 'tc_cellphone',
                },{
                    title: '出生日期',
                    dataIndex: 'tc_birthday',
                    key: 'tc_birthday',
                },{
                    title: '邮箱',
                    dataIndex: 'tc_email',
                    key: 'tc_email',
                },{
                    title: '加入日期',
                    dataIndex: 'tc_join_date',
                    key: 'tc_join_date',
                },{
                    title: '操作',
                    dataIndex: '',
                    key: '',
                }
            ]
        }
    }

    componentWillMount() {
        axiosX.get("/api/teacher").then(
            (res) => {
                // 性别需要处理 1-男 0-女；需要添加key属性
                let arr = res.data.result.map((item,index)=>{
                    item.tc_gender = item.tc_gender == 1?"男":"女"
                    item.key = index+1;
                    return item;
                });
                this.setState({ dataSource: arr })
            }
        )
    }

    render() {
        return (
            <div>
                <Table dataSource={this.state.dataSource} columns={this.state.columns} />
            </div>
        )
    }
}