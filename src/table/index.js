import React, {Component} from 'react'
import {Table} from 'antd'
import PropTypes from 'prop-types'
import './index.css'

export default class ValueTable extends Component {


    static propTypes = {
        dataSource: PropTypes.array.isRequired
    }

    columnns = [
        {
            dataIndex: "name"
        },
        {
            dataIndex: "value"
        }
    ]


    render() {
        return <Table
            dataSource={this.props.dataSource}
            pagination={{pageSize: 15}}
            showHeader={false}
            columns={this.columnns}
            size="small"
        />
    }

    componentWillReceiveProps(nextProps) {
        console.log('table receive data : ', nextProps.dataSource)
    }

}