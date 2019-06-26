import React from 'react';
import APIClient from './apiClient'
import WebGLGlobe from './webglGlobe'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {},
      globeData: [['1990', [0,0,0.1,50, 0,100,0.1,50]], ['1995', [0,0,0.1,50, 0,100,0.1,50]], ['2000', [0,0,0.1,50, 0,100,0.1,50]]]
    }
  }

  async componentDidMount(){
    this.APIClient = new APIClient(null)
    let data = await this.APIClient.apiGet()
    this.setState({data: data}, ()=>{console.log(this.state.data)})
    setTimeout(()=>{this.setState({globeData: [['1990', [0,0,1,100, 0,100,0.1,50]], ['1995', [0,0,1,100, 0,100,0.1,50]], ['2000', [0,0,1,100, 0,100,0.1,50 ]]]})}, 2000)
  }
  
  render(){
    return (
      <div className="App">
        <WebGLGlobe data={this.state.globeData}/>
      </div>
    );
  }
}

export default App;
