import React from 'react'
import ReactDOM from 'react-dom';
import { WEBGL } from './globe/third-party/WebGL.js'
import { TWEEN } from './globe/third-party/Tween.js'
import * as THREE from 'three';
import DAT from './globe/globe.js';
import './webglGlobe.css'

class WebGLGlobe extends React.Component {
    constructor(props){
        super(props)
        this.globe = null;
        this.refsArray = {}
        this.setRef = (key, el) => {
            this.refsArray[key] = el
        }
    }

    render(){
        return (
            <div>
                <div className="container" ref={(el) => {this.setRef("container", el)}}></div>

                <div id="info">
                    <strong><a href="http://www.chromeexperiments.com/globe">WebGL Globe</a></strong> <span className="bull">&bull;</span> Created by the Google Data Arts Team <span className="bull">&bull;</span> Data acquired from <a href="http://sedac.ciesin.columbia.edu/gpw/">SEDAC</a>
                </div>

                <div id="currentInfo">
                    <span ref={(el) => {this.setRef("year1990", el)}} className="year">1990</span>
                    <span ref={(el) => {this.setRef("year1995", el)}} className="year">1995</span>
                    <span ref={(el) => {this.setRef("year2000", el)}} className="year">2000</span>
                </div>

                <div id="title">
                    World Population
                </div>

                <a id="ce" href="http://www.chromeexperiments.com/globe">
                    <span>This is a Chrome Experiment</span>
                </a>

            </div>
        )
    }

    componentDidMount(){
        
    }

    componentWillUnmount(){
        window.removeEventListener('resize')
    }

    componentDidUpdate(){
        var _this = this;
        var container = ReactDOM.findDOMNode(_this.refsArray["container"]);
        if ( !WEBGL.isWebGLAvailable() ) {
            var warning = WEBGL.getWebGLErrorMessage();
            container.appendChild( warning );
            return;
        }
        var years = ['1990','1995','2000'];
        // var container = document.getElementById('container');

        var colorFn = function(x) {
            var c = new THREE.Color(1- x/100, x/100, 0);
            return c;
        };

        var opts = {imgDir: 'assets/', colorFn: colorFn};
        var i, tweens = [];

        this.globe = new DAT.Globe(container, opts)

        var settime = function(globe, t) {
            return function() {
                new TWEEN.Tween(globe).to({time: t/years.length},500).easing(TWEEN.Easing.Cubic.EaseOut).start();
                var y = ReactDOM.findDOMNode(_this.refsArray[('year'+years[t])]);
                if (y.getAttribute('class') === 'year active') {
                    return;
                }
                var yy = document.getElementsByClassName('year');
                for(i=0; i<yy.length; i++) {
                    yy[i].setAttribute('class','year');
                }
                y.setAttribute('class', 'year active');
            };
        };

        for(i = 0; i<years.length; i++) {
            var y = ReactDOM.findDOMNode(this.refsArray[('year'+years[i])]);
            y.addEventListener('mouseover', settime(this.globe,i), false);
        }

        TWEEN.start();
        
        var data = this.props.data;
        console.log(data)
        window.data = data;
        for (i=0;i<data.length;i++) {
            console.log(data[i][1])
            this.globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
        }
        this.globe.createPoints();
        (settime(this.globe,0).bind(this))();
        this.globe.animate();
        document.body.style.backgroundImage = 'none'; // remove loading
    }

}export default WebGLGlobe