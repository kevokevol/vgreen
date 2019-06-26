import React from 'react';
import APIClient from './apiClient'
import WebGLGlobe from './webglGlobe'

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: {}
    }
  }

  async componentDidMount(){
    this.APIClient = new APIClient(null)
    let data = await this.APIClient.apiGet()
    this.setState({data: data}, ()=>{console.log(this.state.data)})
  }
  
  render(){
    return (
      <div className="App">
        <WebGLGlobe/>
      </div>
    );
  }
}

export default App;
