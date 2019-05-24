import React, {Component} from 'react'
import {Icon, Upload} from 'antd';
import PropTypes from 'prop-types'

const Dragger = Upload.Dragger;


export default class FilePicker extends Component {

    static propTypes = {
        onGetFile: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.onFileInput = this.onFileInput.bind(this)
    }


    render() {
        return (
            <Dragger name="file" onChange={this.onFileInput} beforeUpload={f => false}>
                <p className="ant-upload-drag-icon">
                    <Icon type="inbox"/>
                </p>
                <p className="ant-upload-text">将你刚刚填好表格文件拖到这里, 或点击选择文件</p>
                <p className="ant-upload-hint">
                    支持 xls, xlsx, csv 格式
                </p>
            </Dragger>

        );
    }

    onFileInput(info) {

        if (info.file.status !== "removed") {
            let reader = new FileReader();

            reader.onload = e => {
                let file = e.target.result;
                this.props.onGetFile(file)
            }

            reader.readAsBinaryString(info.file);
        }


    }


}
