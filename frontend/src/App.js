import React from 'react';
import APIClient from './apiClient'
import WebGLGlobe from './webglGlobe'
import Navbar from './Navbar'
import Analytics from './Analytics'
import GlobalStyle, {theme} from './helpers/GlobalStyle'
import styled, {ThemeProvider} from 'styled-components'


const Wrapper = styled.div`
  margin-top: 50px;
  display: flex;
`

const GlobeWrapper = styled.div`
  width: 66vw;
  height: calc(100vh - 50px);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: url('https://inkbox.com/images/loading-transparent.gif');
  background-size: 50px;
  background-repeat: no-repeat;
  background-position: center;
`

class App extends React.Component {
  constructor(props){
    super(props)
    this.powerData = [
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 4, y: 0},
      {x: 5, y: 0}
    ]
    this.renewableData = [
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 4, y: 0},
      {x: 5, y: 0}
  ]
    this.emissionData = [
      {x: 1, y: 0},
      {x: 2, y: 0},
      {x: 3, y: 0},
      {x: 4, y: 0},
      {x: 5, y: 0}
  ]
    this.globeData = null
    this.dataCenterEmission = null
    this.state = {
      data: {},
    }
    this.pushDataPoint = this.pushDataPoint.bind(this)
    this.updateGlobeData = this.updateGlobeData.bind(this)
  }

  componentDidMount(){
    this.APIClient = new APIClient(null)
    let fetchData = async () => {
      let data = await this.APIClient.apiGet()
      await this.setState({data: data}, ()=>{console.log(this.state.data)})
    }
    fetchData()
    setInterval(fetchData, 3000)
  }

  pushDataPoint(dataset, val){
    let currdata = this[dataset]
    let currx = currdata[currdata.length - 1].x
    if(currdata.length >= 5){
      currdata = currdata.slice(1,currdata.length)
    }
    currdata.push({x: currx + 1, y: val})
    this[dataset] = currdata
  }

  updateGlobeData(){
    let data = this.state.data.data_centers
    let coords = []
    let emissions = []
    data.map(element => {
        element[4] /= 10000
        coords.push(...element.slice(2, 6).map(el => parseFloat(el)))
        emissions.push([element[1], element[5]])
      }
    );
    emissions = emissions.sort((a,b)=>a[1] - b[1])
    this.dataCenterEmission = emissions
    this.globeData = [["data", coords]]
  }

  componentDidUpdate(){
    this.pushDataPoint("powerData", this.state.data.power)
    this.pushDataPoint("emissionData", this.state.data.emissions)
    this.pushDataPoint("renewableData", this.state.data.renewable)
    this.updateGlobeData()
  }
  
  render(){
    return (
        <ThemeProvider theme={theme}>
          <React.Fragment>
            <GlobalStyle/>
            <Navbar></Navbar>
            <Wrapper>
              <GlobeWrapper>
                {this.globeData && <WebGLGlobe data={this.globeData}/>}
              </GlobeWrapper>
              <Analytics 
                powerData={this.powerData}
                emissionData={this.emissionData}
                renewableData ={this.renewableData}
                dataCenterEmission = {this.dataCenterEmission}
              ></Analytics>
            </Wrapper>
          </React.Fragment>
        </ThemeProvider>
    );
  }
}

export default App;
