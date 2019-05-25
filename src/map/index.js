import React, {Component} from 'react'
import * as d3 from 'd3'
import paths from './paths'
import PropTypes from 'prop-types'


class ChinaMap extends Component {

    static propTypes = {
        dataSource: PropTypes.object.isRequired
    }

    render() {
        return (
            <svg id="cn-map" width="560" height="470"/>
        );
    }


    componentDidMount() {

        this.drawer = d3.select("#cn-map")
            .selectAll(".province")
            .data(paths)
            .enter()
            .append("path")
            .attr("class", "province")
            .attr("d", item => item.d)
            .attr("stroke", "#9c9c9c")
            .attr("stroke-width", 1)
            .style("fill", "#fafafa")

    }


    componentWillReceiveProps(nextProps) {
        console.log('map receive data=', nextProps.dataSource)
        this.drawer.style("fill", item => nextProps.dataSource[item.id].color)
    }


}


export default ChinaMap