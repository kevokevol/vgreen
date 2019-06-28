import React from 'react'
import styled, { withTheme } from 'styled-components'
import {XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, AreaSeries} from 'react-vis';

const AnalyticsWrapper = styled.div`
    width: 33vw;
    height: calc(100vh - 50px);
    background: #0A0D0E;
    display: inline-flex;
    align-items: center;
    flex-direction: column;
    overflow-y: scroll;
    padding-top: 35px;
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

class Analytics extends React.Component {
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
                <DataCenter color={this.props.theme.color1} key={i}>
                    <h3>{el[0]}</h3>
                    <h3>{el[1]}</h3>
                </DataCenter>
            )
            Dirtiest = _dirtiest.map((el, i)=>
                <DataCenter color={this.props.theme.color3} key={i}>
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
                            line: {stroke: this.props.theme.color2},
                        }}/>
                        <YAxis
                            style={{
                            line: {stroke: this.props.theme.color2},
                            text: {
                                stroke: 'none',
                                fill: this.props.theme.color2,
                                fontWeight: 600,
                                fontFamily: 'Metropolis',
                                fontWeight: 'medium',
                                textTransform: 'uppercase',
                                fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={this.props.theme.color2}
                            fill={this.props.theme.color2transparent}
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
                            line: {stroke: this.props.theme.color1},
                        }}/>
                        <YAxis 
                            style={{
                            line: {stroke: this.props.theme.color1},
                            text: {stroke: 'none', fill: this.props.theme.color1, fontWeight: 600, fontFamily: 'Metropolis',
                            fontWeight: 'medium',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={this.props.theme.color1}
                            fill={this.props.theme.color1transparent}
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
                            line: {stroke: this.props.theme.color3},
                        }}/>
                        <YAxis 
                            style={{
                            line: {stroke: this.props.theme.color3},
                            text: {stroke: 'none', fill: this.props.theme.color3, fontWeight: 600,fontFamily: 'Metropolis',
                            fontWeight: 'medium',
                            textTransform: 'uppercase',
                            fontSize: '0.75rem'}
                        }}/>
                        <AreaSeries
                            stroke={this.props.theme.color3}
                            fill={this.props.theme.color3transparent}
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

export default withTheme(Analytics)