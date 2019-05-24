import React, {Component} from 'react'

import './App.css';
import ChinaMap from "./map";
import ConfigPanel from "./right";
import {Button} from 'antd'
import {saveSvgAsPng} from 'save-svg-as-png'


class App extends Component {

    state = {
        dataSource: {}
    }

    constructor(props) {
        super(props);
        this.onGetData = this.onGetData.bind(this)
        this.onSavePngClick = this.onSavePngClick.bind(this)
    }


    render() {
        return (
            <div className="app-contaienr">

                <div className="app-map-container">
                    <div style={{marginTop: 50, marginRight: 50}}>
                        <ChinaMap dataSource={this.state.dataSource}/>
                    </div>
                    <div style={{marginTop: 120, marginBottom: 40}}>
                        <Button onClick={this.onSavePngClick}>点击下载png</Button>
                    </div>
                </div>

                <div className="app-config-container">

                    <ConfigPanel onGetData={this.onGetData}/>

                </div>


            </div>
        );
    }

    onGetData(mapData) {
        this.setState({
            dataSource: mapData
        })
    }

    onSavePngClick() {
        saveSvgAsPng(document.getElementById("cn-map"), "cn-map.png", {
            width: 560,
            height: 470
        })
    }


}


export default App;
