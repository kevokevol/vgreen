import React from 'react'
import ReactDOM from 'react-dom';
import { WEBGL } from './globe/third-party/WebGL.js'
import { TWEEN } from './globe/third-party/Tween.js'
import DAT from './globe/globe.js';
import './webglGlobe.css'

class WebGLGlobe extends React.Component {
    constructor(props){
        super(props)
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

    shouldComponentUpdate(){
        return false;
    }

    componentDidMount(){
        var _this = this;
        var container = ReactDOM.findDOMNode(_this.refsArray["container"]);
        if ( !WEBGL.isWebGLAvailable() ) {
            var warning = WEBGL.getWebGLErrorMessage();
            container.appendChild( warning );
            return;
        }
        var years = ['1990','1995','2000'];
        // var container = document.getElementById('container');

        var opts = {imgDir: 'assets/'};
        var globe = new DAT.Globe(container, opts);
        var i, tweens = [];

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
            y.addEventListener('mouseover', settime(globe,i), false);
        }

        var xhr;
        TWEEN.start();


        xhr = new XMLHttpRequest();
        xhr.open('GET', 'assets/population909500.json', true);
        var onreadystatechangecallback = function(e) {
            if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                var data = JSON.parse(xhr.responseText);
                console.log(data)
                window.data = data;
                for (i=0;i<data.length;i++) {
                globe.addData(data[i][1], {format: 'magnitude', name: data[i][0], animated: true});
                }
                globe.createPoints();
                (settime(globe,0).bind(this))();
                globe.animate();
                document.body.style.backgroundImage = 'none'; // remove loading
            }
        }
    };
    xhr.onreadystatechange = onreadystatechangecallback.bind(this);
    xhr.send(null);
    }
}export default WebGLGlobe