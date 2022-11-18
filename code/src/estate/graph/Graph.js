import React, { Component, Fragment } from "react";
import { scaleTime, scaleLinear} from "d3-scale";
import { timeDay } from "d3-time";
import { select } from "d3-selection";
import { pointers } from "d3-selection";
import { mean } from "d3-array";
import { pointRadial, arc } from "d3-shape";

import AudioPlayer from "./AudioPlayer";
import Controls from "./Controls";

class Graph extends Component{
  //A class componets is necesary so that events linstener can access the state
  //If a functional component is used, the state becomes stale
  
//=============================================================================
  constructor (props){
    super(props);
    this.graphRef = React.createRef();
    this.margin = { top: 0, right: 0, bottom: 0, left: 0};
    this.width = 300;
    this.height = 320;
    this.graphInnerRadius = 73;
    this.graphOuterRadius = 150;
    this.dayInnerRadius = 0;
    this.dayOuterRadius = 40;
    this.hoursLabelRadius = 57;
    this.hourTickLength = 67;
    this.sunrise = "2020-02-13T05:43:00";
    this.sunset = "2020-02-13T20:19:00";
    this.state = {
      a:1, d:1, e:this.width/2, f:this.height/2, 
      pointerPosition:null,
      pointerDistance:null,
      oneFinger: false,
      elapsedTime: undefined
    };
    
    this.title  = new Date(this.props.day);
    
    this.radiusScale = scaleLinear()
    .domain([0, 1]) 
    .range([this.graphInnerRadius, this.graphOuterRadius]);
    
    //using today date for the domain of angle scale for simplicity
    this.today = new Date();
    
    this.angleScale = scaleTime()
      .domain([timeDay.floor(this.today), timeDay.ceil(this.today)])
      .range([ 0, Math.PI * 2 ]);
    
    this.zoomButtons = (magnification) =>{
      const center = [this.width/2, this.height/2];
      const inverseTranformationCoordinates = [
        center[0]/this.state.a - this.state.e/this.state.a,
        center[1]/this.state.d - this.state.f/this.state.d,
      ];
      
      const zoom = this.state.a * magnification;
      const move = [ 
        center[0] - inverseTranformationCoordinates[0] * zoom,
        center[1] - inverseTranformationCoordinates[1] * zoom
      ];
      this.setState( (state, props) => ({
        a:zoom, d:zoom, e:move[0], f:move[1]
      }));
    };
    
    this.resetZoom = () =>{
      this.setState({a:1, d:1, e:this.width/2, f:this.height/2});
    };
    
    this.setElapsedTime = (elapsedTime) =>{
      this.setState({elapsedTime:elapsedTime});
    };
  }
  
//============================================================================
  componentDidMount(){
   
    
    select(this.graphRef.current)
    .on("mousedown", (event) => {
      const t =  pointers(event);
      this.setState({pointerPosition: [mean(t, d => d[0]), mean(t, d => d[1])]});
    })
    
    .on("touchstart", (event) => {
      const t =  pointers(event);
      if (t.length > 1) {
        event.preventDefault();
        const pointerPosition = [
          Math.abs((t[1][0] - t[0][0])/2) + t[0][0],  
          Math.abs((t[1][1] - t[0][1])/2) + t[0][1] 
        ];
        this.setState({
          pointerPosition: pointerPosition,
          pointerDistance: Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0])
        });
        
      }
    })
    
    .on("mouseup touchend", (event) => {
      this.setState({pointerPosition: null, oneFinger: false});
    })
    
    .on("mouseleave", (event) => {
      this.setState({pointerPosition: null});
    })
    
    .on("mousemove", (event) => {
      if (this.state.pointerPosition){
        const t = pointers(event);
        const previousPosition = [
          this.state.e - this.state.pointerPosition[0],
          this.state.f - this.state.pointerPosition[1]
        ];
        const pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
        const move = [
          previousPosition[0] + pointerPosition[0],
          previousPosition[1] + pointerPosition[1]
        ];
        this.setState({e: move[0], f: move[1], pointerPosition: pointerPosition});
      }
    })
    .on("touchmove", (event) => {
      const t = pointers(event);
      if (t.length > 1) {
        event.preventDefault();
        const pointerPosition = [
          Math.abs((t[1][0] - t[0][0])/2) + t[0][0],
          Math.abs((t[1][1] - t[0][1])/2) + t[0][1]
        ];
        const pointerDistance = Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]);
        if ( Math.abs(pointerDistance - this.state.pointerDistance) < 7){
          const previousPosition = [
            this.state.e - this.state.pointerPosition[0],
            this.state.f - this.state.pointerPosition[1]
          ];
          const move = [
            previousPosition[0] + pointerPosition[0],
            previousPosition[1] + pointerPosition[1]
          ];
          
          this.setState({
            e: move[0], 
            f: move[1], 
            pointerPosition: pointerPosition,
            pointerDistance: pointerDistance
          });
          
        }else{
          const inverseTranformationCoordinates = [
            pointerPosition[0]/this.state.a - this.state.e/this.state.a,
            pointerPosition[1]/this.state.d - this.state.f/this.state.d,
          ];
          const yZoom = this.state.d * (pointerDistance / this.state.pointerDistance);
          const xZoom = 1;
          const move = [ 
            pointerPosition[0] - inverseTranformationCoordinates[0] * xZoom,
            pointerPosition[1] - inverseTranformationCoordinates[1] * yZoom
          ];
          this.setState({
            a:xZoom, 
            d:yZoom, 
            e:move[0], 
            f:move[1], 
            pointerPosition: pointerPosition,
            pointerDistance: pointerDistance
          });
        }
      }else{
        this.setState({oneFinger: true});
      }
    })
    .on("wheel", (event) => {
      event.preventDefault();
      const t = pointers(event);
      const pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
      
      const inverseTranformationCoordinates = [
        pointerPosition[0]/this.state.a - this.state.e/this.state.a,
        pointerPosition[1]/this.state.d - this.state.f/this.state.d,
      ];
      
      const zoom = this.state.d * 1 + (event.wheelDelta * 4) / 1000;
      const yZoom = zoom > 1? zoom : 1;
      const xZoom = zoom > 1? zoom : 1;
      const move = [ 
        pointerPosition[0] - inverseTranformationCoordinates[0] * xZoom,
        pointerPosition[1] - inverseTranformationCoordinates[1] * yZoom
      ];
      this.setState({a:xZoom, d:yZoom, e:move[0], f:move[1]});
    });
  }
  
  componentDidUpdate() {
      
    // const invertScale = scale =>{
    //   return (scale - this.state.e) / this.state.a;
    // };
    
    // const rescaleScale = scale =>{
    //   return scale.copy().domain(scale.range().map(invertScale).map(scale.invert, scale));
    // };
    
    // const newAngleScale = rescaleScale(this.angleScale);
    // console.log(newAngleScale.ticks())
    
    // select(this.xAxisRef.current)
    // .style("font-size","2rem")
    // .call(this.xAxis.scale(rescaleX(this.xScale)))
    // .selectAll("text")  
    // .style("text-anchor", "end")
    // .attr("dx", "-.6em")
    // .attr("dy", ".15em")
    // .attr("transform", "rotate(-65)");
  }
  
//===============================================================================
  render(){
    let bars = [];
    for ( let i = 0; i < this.props.graphData.length-2; i ++ ){ 
      const startTime = new Date(this.props.graphData[i].time);
      startTime.setFullYear(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
      const endTime = new Date(this.props.graphData[i + 1].time);
      endTime.setFullYear(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
      const rectangles = arc()
        .innerRadius(this.graphInnerRadius)
        .outerRadius(this.radiusScale(this.props.graphData[i].maxLoudness))
        .startAngle(this.angleScale(startTime))
        .endAngle(this.angleScale(endTime));
      if (
        this.props.graphData[i].hasOwnProperty('sound_start') && 
        this.props.graphData[i].hasOwnProperty('sound_end') &&
        this.props.graphData[i].sound_start < this.state.elapsedTime && 
        this.state.elapsedTime < this.props.graphData[i].sound_end
      ){
        rectangles.innerRadius(0)
        bars.push(<path stroke="green" strokeWidth="0.5" fill="green" d={rectangles()}/>);
      }else {
        bars.push(<path stroke="red" strokeWidth="0.5" fill="none" d={rectangles()}/>);
      }
    }
    
    const sunrise = new Date(this.sunrise);
    const sunset = new Date(this.sunset);
    sunrise.setFullYear(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
    sunset.setFullYear(this.today.getFullYear(), this.today.getMonth(), this.today.getDay());
    
    const day = arc()      .innerRadius(this.dayInnerRadius)
      .outerRadius(this.dayOuterRadius)
      .startAngle(this.angleScale(sunrise))
      .endAngle(this.angleScale(sunset));
    
    const night = arc()
      .innerRadius(this.dayInnerRadius)
      .outerRadius(this.dayOuterRadius)
      .startAngle(this.angleScale(sunset) - Math.PI * 2)
      .endAngle(this.angleScale(sunrise));
    
    const radiusAxis = this.radiusScale.ticks(2).map( tick =>{
      const tickPercent = tick * 100 + "%";
      if (tick == 0) {
        return ( 
          <g> <circle cx="0" cy="0" r={this.radiusScale(tick)} fill="none" stroke="#292524" strokeWidth=".5"/></g>
        ); 
      }
      return ( 
        <g>
          <circle cx="0" cy="0" r={this.radiusScale(tick)} fill="none" stroke="#292524" strokeWidth=".5"/>
          {/* The first text has a stroke white to work as the background of the second text */}
          <text stroke="#fff" strokeWidth="4" font-size="smaller" textAnchor="middle" x="0" y={- this.radiusScale(tick) + 5}>
            {tickPercent}
          </text>
          <text fill="#292524" stroke="none" font-size="smaller" textAnchor="middle" x="0" y={- this.radiusScale(tick) + 5}>
            {tickPercent}
          </text>
         
        </g>
      );
    });
    
    const angleAxis = this.angleScale.ticks().map(tick =>{
      let x = this.hoursLabelRadius * Math.sin(this.angleScale(tick));
      let y = -this.hoursLabelRadius * Math.cos(this.angleScale(tick)) + 5;
      return (
        <g>
          <text textAnchor="middle" x={x} y={y}>{tick.getHours()}</text>
          <path stroke="#292524" d={`
            M${pointRadial(this.angleScale(tick), this.graphInnerRadius)} 
            L${pointRadial(this.angleScale(tick), this.hourTickLength)}`} />
        </g>
      );
    });
    
    return (
      <div className='border-stone-300 border-2'>
        <h5 className="text-stone-800 text-center max-w-screen-md text-sm mb-4 mt-4 font-semibold">
          {this.title.toLocaleDateString("en-US", {weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'})}
        </h5>
        
        <div className="mb-5 flex flex-col items-center" data-cy="estateAudioGraph">
          {this.state.oneFinger && <h3 className="absolute mt-60 ml-9 w-64 z-20 text-center text-xl font-semibold">
            Use two fingers to move the map
          </h3>}
          <div style={{width: this.width + "px"}}>
            <Controls zoomButtons={this.zoomButtons} resetZoom={this.resetZoom}/>
            <svg 
            className="mx-2"
            ref={this.graphRef}
            viewBox={`0 0 ${this.width} ${this.height}`}
            preserveAspectRatio="xMidYMid meet">
              <clipPath id="graphClip">
                <rect 
                x={this.margin.left}
                y={this.margin.top}
                width={this.width - this.margin.right - this.margin.left} 
                height={this.height - this.margin.top - this.margin.bottom} />
              </clipPath>
              <g clipPath="url(#graphClip)">
                <g transform={`matrix(${this.state.a}, 0, 0, ${this.state.d}, ${this.state.e}, ${this.state.f})`}>
                  {radiusAxis}
                  {bars}
                  {angleAxis}
                  <path id="dayPath" fill="#fff069"  d={day()} />
                  <text textAnchor="middle" font-weight="bold" font-size="0.75rem"x={day.centroid()[0]} y={day.centroid()[1]}>DAY</text>
                  <path id="nightPath" fill="#5269fa" d={night()} />
                  <text textAnchor="middle" font-weight="bold" font-size="0.75rem" x={night.centroid()[0]} y={night.centroid()[1]}>NIGHT</text>
                </g>
              </g>
            </svg>
          </div>
        </div>
        
        <AudioPlayer 
        mp3Link={this.props.mp3Link}
        setElapsedTime={this.setElapsedTime}/>
      </div>
    );
  }
}

export default Graph;