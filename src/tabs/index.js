import React, {Component} from 'react'
import {Tabs} from 'antd'
import DataPanel from '../data-panel/index'
import ColorPanel from '../color-panel/index'
import {Sticky, StickyContainer} from 'react-sticky'
import PropTypes from 'prop-types'


const Panel = Tabs.TabPane

export default class SettingTabs extends Component {

    static propTypes = {
        onGetData:PropTypes.func.isRequired
    }

    constructor(props) {
        super(props);
        this.renderTabBar = this.renderTabBar.bind(this)
    }

    renderTabBar(props, DefaultTabBar) {
        return <Sticky>
            {
                ({style}) => (
                    <DefaultTabBar {...props} style={{...style, zIndex: 1, background: '#fff'}}/>
                )
            }
        </Sticky>
    }

    render() {
        return (
            <StickyContainer>
                    <Tabs renderTabBar={this.renderTabBar}>

                        <Panel tab="数据导入" key="1">
                                <DataPanel onGetData={this.props.onGetData}/>
                        </Panel>

                        <Panel tab="颜色配置" key="2">
                                <ColorPanel/>
                        </Panel>

                    </Tabs>
            </StickyContainer>

        );
    }

}