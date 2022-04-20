import React, { Component, Fragment } from "react";
import { scaleBand, scaleTime, scaleLinear } from "d3-scale";
import { timeDay } from "d3-time";
import { axisBottom, axisLeft} from "d3-axis";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { pointers } from "d3-selection";
import { mean } from "d3-array";

import AudioPlayer from "./AudioPlayer";
import ColorScale from "./ColorScale";
import plusSign from "./plusSignOp.svg";
import minusSign from "./minusSignOp.svg";

class Graph extends Component{
  //A class componets is necesary so that events linstener can access the state
  //If a functional component is used, the state becomes stale
  constructor (props){
    super(props);
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.graphRef = React.createRef();
    this.state = {
      a:1, d:1, e:0, f:0, 
      pointerPosition:null,
      pointerDistance:null,
      oneFinger: false,
      index: undefined
    };
    this.margin = { top: 4, right: 0, bottom: 115, left: 124};
    this.width = 834; //16:9 screen ratio
    this.height = 1560;
    
    this.colorScale = scaleLinear()
    .domain([0, 1])
    .range(["#ffc9c9", "#ff0000"]);
      
    this.firstDay = timeDay.floor(new Date(this.props.dataPoints[0].time));
    this.lastDay = timeDay.ceil(new Date(this.props.dataPoints[this.props.dataPoints.length - 1].time));
    this.recordingDates = `Extracted form recodings taken from ${this.firstDay.toLocaleDateString("en-US")} to ${this.lastDay.toLocaleDateString("en-US")}`;
    this.domainDays = timeDay.range(this.firstDay, this.lastDay);
    
    this.xScale = scaleBand()
      .domain(this.domainDays)
      .range([ this.margin.left, this.width - this.margin.right ])
      .paddingInner(0.1);
    
    this.xAxis = axisBottom(this.xScale)
      .tickFormat(timeFormat("%d %a"))
      .tickSizeOuter(0);
      
    this.widthScale = scaleLinear()
    .domain([0, 1])
    .range([0, this.xScale.bandwidth()]);
    
    //using today date for the domain of Y axis for simplicity
    this.today = new Date();
    
    this.yScale = scaleTime()
      .domain([timeDay.ceil(this.today), timeDay.floor(this.today)])
      .range([this.height - this.margin.bottom, this.margin.top]);
    
    this.yAxis = axisLeft(this.yScale).tickFormat(timeFormat("%I:%M %p"));
    
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
      this.setState({a:zoom, d:zoom, e:move[0], f:move[1]});
      this.adjustAxis();
    };
    
    this.resetZoom = () =>{
      this.setState({a:1, d:1, e:0, f:0});
      select(this.yAxisRef.current).call(this.yAxis.scale(this.yScale));
    };
    
    this.adjustAxis = () =>{
      const invertY = y => {
        return (y - this.state.f) / this.state.d;
      };
      
      const rescaleY = y => {
        return y.copy().domain(y.range().map(invertY).map(y.invert, y));
      };
      
      select(this.yAxisRef.current).call(this.yAxis.scale(rescaleY(this.yScale)));
    };
    
    this.setIndex = (index) =>{
      this.setState({index:index });
    };
    
  }
  
  componentDidMount(){
    select(this.xAxisRef.current)
    .style("font-size","2rem")
    .call(this.xAxis)
    .selectAll("text")  
    .style("text-anchor", "end")
    .attr("dx", "-.6em")
    .attr("dy", ".15em")
    .attr("transform", "rotate(-65)");

    select(this.yAxisRef.current)
    .style("font-size","1.7rem")
    .call(this.yAxis);
    
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
        this.adjustAxis();
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
        if ( Math.abs(pointerDistance - this.state.pointerDistance) < 3){
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
        
          const zoom = this.state.a * (pointerDistance / this.state.pointerDistance) * 3;
          const move = [ 
            pointerPosition[0] - inverseTranformationCoordinates[0] * zoom,
            pointerPosition[1] - inverseTranformationCoordinates[1] * zoom
          ];
          this.setState({
            a:1, 
            d:zoom, 
            e:move[0], 
            f:move[1], 
            pointerPosition: pointerPosition,
            pointerDistance: pointerDistance
          });
          this.adjustAxis();
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
      
      const yZoom = Math.abs(this.state.d * 1 + (event.wheelDelta * 4) / 1000);
      const xZoom = 1;
      const move = [ 
        pointerPosition[0] - inverseTranformationCoordinates[0] * xZoom,
        pointerPosition[1] - inverseTranformationCoordinates[1] * yZoom
      ];
      this.setState({a:xZoom, d:yZoom, e:move[0], f:move[1]});
      this.adjustAxis();
    });
  }
  
  render(){
    const rects = this.props.dataPoints.map( (point, index) =>{
      const time = new Date(point.time);
      const xPosition = this.xScale(timeDay.floor(time)) + (this.xScale.bandwidth()/2 - this.widthScale(point.maxLoudness)/2);
      this.today.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
      const yPosition = this.yScale(this.today);
      if (this.state.index === index) {
        return <rect 
        key={point.mp3Link}
        width={ this.xScale.bandwidth() }
        height="1"
        x={this.xScale(timeDay.floor(time))}
        y={yPosition}
        fill={ "green" }
        onClick={() => this.setIndex(index)}/>;
      }
      return <rect 
      key={point.mp3Link}
      width={ this.widthScale(point.maxLoudness) }
      height="1"
      x={xPosition}
      y={yPosition}
      fill={this.colorScale(point.maxLoudness)}
      onClick={() => this.setIndex(index)}/>;
    });
    
    return (
      <Fragment>
        <h5 className="text-stone-800 text-center max-w-screen-md text-sm mb-6">
          {this.recordingDates}
        </h5>
        <ColorScale />
        <div className="mb-7">
          <div className="flex absolute items-center mt-3 ml-48 select-none" >
            <button 
            onClick={this.resetZoom}
            className="bg-stone-900 text-white tracking-wider text-sm font-medium p-2 mr-3 rounded">
              Reset
            </button>
            <div className="flex flex-col">
              <button onClick={() =>{this.zoomButtons(1.12)}}>
                <img className="w-8 transform hover:scale-125 mb-1" src={plusSign} alt="Zoom in"/>
              </button>
              <button onClick={() =>{this.zoomButtons(0.88)}}>
                <img className="w-8 transform hover:scale-125 mt-1" src={minusSign} alt="Zoom out"/>
              </button>
            </div>
          </div>
          {this.state.oneFinger && <h3 className="absolute mt-60 ml-9 w-64 z-20 text-center text-xl font-semibold">
            Use two fingers to move the map
          </h3>}
          <div style={{width:"318px"}}>
            <svg 
            ref={this.graphRef}
            viewBox={`0 0 ${this.width} ${this.height}`}
            preserveAspectRatio="xMidYMid meet">
              <clipPath id="graphClip">
                <rect 
                x={this.margin.left}
                y={this.margin.top}
                width={this.width - this.margin.right - this.margin.left} 
                height={this.height - this.margin.top - this.margin.bottom -2} />
              </clipPath>
              <g ref={this.yAxisRef} transform={`translate(${this.margin.left}, ${this.margin.top})`} className="select-none"/>
                <g clipPath="url(#graphClip)">
                  <g transform={
                    `matrix(${this.state.a}, 0, 0, ${this.state.d}, ${this.state.e}, ${this.state.f})`
                  }>
                    {rects}
                  </g>
                </g>
                <g ref={this.xAxisRef} transform={
                `matrix(${this.state.a}, 0, 0, 1, ${this.state.e}, ${this.height - this.margin.bottom - this.margin.top})`}
                className="select-none"
                />
            </svg>
          </div>
        </div>
        
        <AudioPlayer 
        dataPoints={this.props.dataPoints}
        index={this.state.index}
        setIndex={this.setIndex}/>
      </Fragment>
    );
  }
}

export default Graph;