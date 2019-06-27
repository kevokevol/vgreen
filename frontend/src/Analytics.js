import React from 'react'
import styled from 'styled-components'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, AreaSeries} from 'react-vis';

const AnalyticsWrapper = styled.div`
    width: 33vw;
    height: calc(100vh - 50px);
    background: #0A0D0E;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
`

const Chart = styled.div`
    width: 300px;
    height: 200px;
    margin: 25px 0;
    &::before {
        content: "${props => props.text}";
        color: white;
        font-size: 1rem;
        display: inline-block;
        text-align: center;
        width: 300px;
    }
`

const Summary = styled.div`
    display: flex;
    height: 300px;
    width: 100%;
    justify-content: space-around;
`

const Summary1 = styled.div`
`

const Summary2 = styled.div`
`

export default class Analytics extends React.Component {
    render(){
        return (
            <AnalyticsWrapper>
                <Chart text="Power Usage (kW•H)">
                    <XYPlot 
                        yDomain={[0,10]}
                        width={300}
                        height={200}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                        hideTicks
                        style={{
                            line: {stroke: 'blue'},
                        }}/>
                        <YAxis
                            style={{
                            line: {stroke: 'blue'},
                            text: {stroke: 'none', fill: 'blue', fontWeight: 600}
                        }}/>
                        <AreaSeries
                            stroke={'blue'}
                            fill={'rgba(0,0,255,0.25)'}
                            data={this.props.powerData}/>
                    </XYPlot>
                </Chart>
                <Chart text="Renewable Power Available (kW•H)">
                    <XYPlot
                        yDomain={[0,10]}
                        width={300}
                        height={200}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                        hideTicks
                        style={{
                            line: {stroke: 'green'},
                        }}/>
                        <YAxis 
                            style={{
                            line: {stroke: 'green'},
                            text: {stroke: 'none', fill: 'green', fontWeight: 600}
                        }}/>
                        <AreaSeries
                            stroke={'green'}
                            fill={'rgba(0,255,0,0.25)'}
                            data={this.props.renewableData}/>
                    </XYPlot>
                </Chart>
                <Chart text="CO2 Emission (Tons)">
                    <XYPlot
                        yDomain={[0,10]}
                        width={300}
                        height={200}>
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis 
                        hideTicks
                        style={{
                            line: {stroke: 'red'},
                        }}/>
                        <YAxis 
                            style={{
                            line: {stroke: 'red'},
                            text: {stroke: 'none', fill: 'red', fontWeight: 600}
                        }}/>
                        <AreaSeries
                            stroke={'red'}
                            fill={'rgba(255,0,0,0.25)'}
                            data={this.props.emissionData}/>
                    </XYPlot>
                </Chart>
                <Summary>
                    <Summary1>Top Green Data Centers</Summary1>
                    <Summary2>Top Emitting Data Centers</Summary2>
                </Summary>
            </AnalyticsWrapper>
        )
    }
}