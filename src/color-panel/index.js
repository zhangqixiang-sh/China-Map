import React, {Component} from 'react'
import './index.css'
import {Input,Button} from 'antd'

export default class ColorPanel extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        minColor: "#ffffcc",
        maxColor: "#800020"
    }


    render() {
        return (
            <div className="color-panel">

                <div className="color-pick-line">
                    <div className="title">最小值的颜色 :</div>
                    <div className="input">
                        <Input type="text"
                               addonAfter={
                                   <input type="color"
                                          value={this.state.minColor}
                                          onChange={e => {
                                              let value = e.target.value
                                              this.onMinColorChange(value)
                                          }}
                                   />
                               }
                               value={this.state.minColor}
                               onChange={e => {
                                   let value = e.target.value
                                   this.onMinColorChange(value)
                               }}
                        />
                    </div>
                </div>

                <div className="color-pick-line">
                    <div className="title">最大值的颜色 :</div>
                    <div className="input">
                        <Input type="text"
                               addonAfter={
                                   <input type="color"
                                          value={this.state.maxColor}
                                          onChange={e => {
                                              let value = e.target.value
                                              this.onMaxColorChange(value)
                                          }}
                                   />
                               }
                               value={this.state.maxColor}
                               onChange={e => {
                                   let value = e.target.value
                                   this.onMaxColorChange(value)
                               }}
                        />
                    </div>
                </div>


                <Button  type="primary" onClick={this.onConfirm}>确定</Button>


            </div>
        );
    }


    onMinColorChange = value => {

        this.setState({
            minColor: value,
        })
    }


    onMaxColorChange = value => {

        this.setState({
            maxColor: value
        });

    }

    onConfirm = ()=>{

    }


};