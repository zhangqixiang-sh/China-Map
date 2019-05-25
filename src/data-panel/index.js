import React, {Component} from 'react'
import './index.css'
import FilePicker from "../filepicker"
import 'antd/dist/antd.css'
import Book from "../excel/Book";
import province from './province'
import * as d3 from "d3";
import PropTypes from 'prop-types'
import ValueTable from "../table";

const getColor = d3.interpolate("#ffffcc", "#800026")

class DataPanel extends Component {

    static propTypes = {
        onGetData: PropTypes.func.isRequired
    }

    state = {
        tableData: []
    }

    sampleUrl = "https://github.com/ZhangQixiangChina/China-Map/raw/master/src/assets/sample.xlsx"


    constructor(props) {
        super(props);
        this.onGetFile = this.onGetFile.bind(this)
    }


    render() {
        return (
            <div className="data-panel">

                <h4>Step1.</h4>
                <p>
                    &emsp;
                    <a href={this.sampleUrl}>下载标准样例表格</a>
                    <span style={{color: "#333333"}}>, 把你的数据填入替换掉样例表格的数据, 注意不要修改表格的其他地方。</span>
                </p>

                <h4>Step2.</h4>
                <div style={{height: 180}}>
                    <FilePicker onGetFile={this.onGetFile}/>
                </div>

                <h4 style={{marginTop: 30}}>预览:</h4>
                <div>
                    <ValueTable dataSource={this.state.tableData}/>
                </div>

            </div>
        )
    }


    onGetFile(file) {
        let wb = new Book(file);
        let sheet = wb.getSheet(0)
        let values = sheet.getColumn(1).slice(1) //去掉第一个
        values.sort((a, b) => a - b)
        // let minVal = values[0]
        let maxVal = values[values.length - 1]
        let mapData = {}
        let tableData = []
        sheet.getRows()
            .forEach((row, i) => {
                if (i > 0) {
                    let pname = row[0]
                    let pvalue = row[1]
                    let pid = province[pname]
                    let pcolor = getColor(pvalue / maxVal)

                    mapData[pid] = {
                        value: pvalue,
                        color: pcolor
                    }

                    tableData.push({
                        name: pname,
                        value: pvalue,
                        key: i
                    })
                }
            })

        this.props.onGetData(mapData)

        this.setState({
            tableData: tableData
        })

    }


}

export default DataPanel