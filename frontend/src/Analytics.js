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
    overflow-y: scroll;
    padding-top: 50px;
    box-sizing: border-box;
`

const Chart = styled.div`
    width: 300px;
    height: 150px;
    &::before {
        content: "${props => props.text}";
        font-family: Metropolis;
        font-weight: medium;
        color: #90C3DA;
        text-transform: uppercase;
        font-size: 0.75rem;
    }
`

const ChartTitle = styled.div`
    width: 275px;
`

const Summary = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    & div {
        width: 12.5vw;
    }
`

const Summary1 = styled.div`
`

const Summary2 = styled.div`
`

const DataCenter = styled.div`
    display: flex;
    justify-content: space-between;
    & h3 {
        color: ${props=>props.color};
    }
`

export default class Analytics extends React.Component {
    render(){
        let powerData = this.props.powerData;
        let renewableData = this.props.renewableData
        let emissionData = this.props.emissionData
        let Greenest, Dirtiest
        if (this.props.dataCenterEmission){
            let n = this.props.dataCenterEmission.length
            let _greenest = this.props.dataCenterEmission.slice(0,5)
            let _dirtiest = this.props.dataCenterEmission.slice(n-5, n).reverse()
            Greenest = _greenest.map((el, i)=>
                <DataCenter color={"green"} key={i}>
                    <h3>{el[0]}</h3>
                    <h3>{el[1]}</h3>
                </DataCenter>
            )
            Dirtiest = _dirtiest.map((el, i)=>
                <DataCenter color={"red"} key={i}>
                    <h3>{el[0]}</h3>
                    <h3>{el[1]}</h3>
                </DataCenter>
            )
        }
        return (
            <AnalyticsWrapper>
                <ChartTitle>
                    <h1>Power Usage (kWH)</h1>
                    <h2>{powerData[powerData.length-1].y} kWH</h2>
                </ChartTitle>
                <Chart>
                    <XYPlot 
                        yDomain={[0,10]}
                        width={300}
                        height={150}>
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
                            text: {
                                stroke: 'none',
                                fill: 'blue',
                                fontWeight: 600,
                                fontFamily: 'Metropolis',
                                fontWeight: 'medium',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={'blue'}
                            fill={'rgba(0,0,255,0.25)'}
                            data={powerData}/>
                    </XYPlot>
                </Chart>
                <ChartTitle>
                <h1>Renewable Power Available (kWH)</h1>
                <h2>{renewableData[renewableData.length-1].y} kWH</h2>
                </ChartTitle>
                <Chart>
                    <XYPlot
                        yDomain={[0,10]}
                        width={300}
                        height={150}>
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
                            text: {stroke: 'none', fill: 'green', fontWeight: 600, fontFamily: 'Metropolis',
                            fontWeight: 'medium',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={'green'}
                            fill={'rgba(0,255,0,0.25)'}
                            data={renewableData}/>
                    </XYPlot>
                </Chart>
                <ChartTitle>
                    <h1>CO2 Emission (Tons)</h1>
                    <h2>{emissionData[emissionData.length-1].y} tons</h2>
                </ChartTitle>
                <Chart>
                    <XYPlot
                        yDomain={[0,10]}
                        width={300}
                        height={150}>
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
                            text: {stroke: 'none', fill: 'red', fontWeight: 600,fontFamily: 'Metropolis',
                            fontWeight: 'medium',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={'red'}
                            fill={'rgba(255,0,0,0.25)'}
                            data={emissionData}/>
                    </XYPlot>
                </Chart>
                <Summary>
                    <Summary1>
                        <h1>Least Polluting Data Centers</h1>
                        <h4>(tons of CO2/kWH)</h4>
                        {Greenest}
                    </Summary1>
                    <Summary2>
                        <h1>Most Polluting Data Centers</h1>
                        <h4>(tons of CO2/kWH)</h4>
                        {Dirtiest}
                    </Summary2>
                </Summary>
            </AnalyticsWrapper>
        )
    }
}