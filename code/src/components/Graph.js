import React, { Component } from "react";
import { scaleBand, scaleTime, scaleQuantize } from "d3-scale";
import { timeDay } from "d3-time";
import { axisBottom, axisLeft} from "d3-axis";
import { select } from "d3-selection";
import { timeFormat } from "d3-time-format";
import { pointers } from "d3-selection";
import { mean } from "d3-array";

import AudioPlayer from "./stateless/AudioPlayer";
import ColorScale from "./stateless/ColorScale";
import Transform from "../Transform";

class Graph extends Component{
  //A class componets is necesary so that events linstener can access the state
  //If a functional component is used, the state becomes stale
  constructor (props){
    super(props);
    this.xAxisRef = React.createRef();
    this.yAxisRef = React.createRef();
    this.graphRef = React.createRef();
    this.state = {
      a:1, d:1, e:0, f:0, pointerPosition:null, mp3Link:"", twoFingers: false
    };
  }
  
  margin = { top: 7, right: 0, bottom: 35, left: 80};
  width = 843; //16:9 screen ratio
  height = 1500;
  colorRange = ["#2A00D5", "#63009E", "#A1015D", "#D80027", "#FE0002"];
  
  colorScale = scaleQuantize()
  .domain([0, 1])
  .range(this.colorRange);
    
  firstDay = timeDay.floor(new Date(this.props.dataPoints[0].time));
  lastDay = timeDay.ceil(new Date(this.props.dataPoints[this.props.dataPoints.length - 1].time));
  domainDays = timeDay.range(this.firstDay, this.lastDay);
  
  xScale = scaleBand()
    .domain(this.domainDays)
    .range([ this.margin.left, this.width - this.margin.right ])
    .paddingInner(0.1);
  
  xAxis = axisBottom(this.xScale)
    .tickFormat(timeFormat("%a %d"))
    .tickSizeOuter(0);
  
  //using today date for the domain of Y axis for simplicity
  today = new Date();
  
  yScale = scaleTime()
    .domain([timeDay.floor(this.today), timeDay.ceil(this.today)])
    .range([this.height - this.margin.bottom, this.margin.top]);
  
  yAxis = axisLeft(this.yScale).tickFormat(timeFormat("%H:%M"));
  
  componentDidMount(){
    select(this.xAxisRef.current)
    .style("font-size","1.4rem")
    .call(this.xAxis);

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
        pointerPosition = [ mean(t, d => d[0]),  mean(t, d => d[1])]; // (A)
        
        pointerDistance =
        t.length > 1 && Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]); // (B)
    }else{
      
    }
      
    })
    .on("mouseup touchend", (event) => {
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
      // if (!pointerPosition) dispatch.call("oneFinger", this);
      // if (!pointerPosition) return; // mousemove with the mouse up
     
      
      // const t = pointers(event);
      
      // // (A)
      // if (t.length > 1) {
      //   matrix.e -= pointerPosition[0];
      //   matrix.f -= pointerPosition[1];
      //   pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
      //   matrix.e += pointerPosition[0];
      //   matrix.f += pointerPosition[1];
    
      //   // (B)
      //   // scale /= pointerDistance;
      //   // pointerDistance = Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]);
      //   // scale *= pointerDistance;
        
      //   // graphEvents.call("zoom", this, { k:scale, x:position[0], y:position[1]});
      // }
    })
    .on("wheel", (event) => {
      event.preventDefault();
      const t = pointers(event);
      const pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
      
      const inverseTranformationCoordinates = [
        pointerPosition[0]/this.state.a - this.state.e/this.state.a,
        pointerPosition[1]/this.state.d - this.state.f/this.state.d,
      ];
      
      const zoom = this.state.a * 1 + event.wheelDelta / 1000;
      const move = [ 
        pointerPosition[0] - inverseTranformationCoordinates[0] * zoom,
        pointerPosition[1] - inverseTranformationCoordinates[1] * zoom
      ];
      this.setState({a:zoom, d:zoom, e:move[0], f:move[1]});
      this.adjustAxis();
    });
  }
  
  adjustAxis = () =>{
    const transform = new Transform(this.state.a, this.state.d, this.state.e, this.state.f);
    select(this.yAxisRef.current).call(this.yAxis.scale(transform.rescaleY(this.yScale)));
  }
  
  reproduceSound = (link) =>{
    this.setState({ mp3Link:link });
  };
  
  zoomButtons = (magnification) =>{
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
    
  }
  
  render(){
    const rects = this.props.dataPoints.map( (point, index) =>{
      const time = new Date(point.time);
      const xPosition = this.xScale(timeDay.floor(time));
      this.today.setHours(time.getHours(), time.getMinutes(), time.getSeconds(), 0);
      const yPosition = this.yScale(this.today);
        
      return <rect 
      key={point.mp3Link}
      width={this.xScale.bandwidth()}
      height="1"
      x={xPosition}
      y={yPosition}
      fill={
        this.state.mp3Link === point.mp3Link? 
        "green":
        this.colorScale(point.maxLoudness)
      }
      onClick={() => this.reproduceSound(point.mp3Link)}/>;
    });
    
    return (
      <div className="mb-40">
        <ColorScale />
        <div className="">
          <button onClick={() =>{this.zoomButtons(1.12)}}>
            Zoom In
          </button>
          <button onClick={() =>{this.zoomButtons(0.88)}}>
            Zoom Out
          </button>
          
          <svg 
          ref={this.graphRef}
          height="95vh"
          viewBox={`0 0 ${this.width} ${this.height}`}
          preserveAspecRatio="xMidYMid meet">
            <clipPath id="dataClip">
              <rect 
              x={this.margin.left}
              y={this.margin.top}
              width={this.width - this.margin.right} 
              height={this.height - this.margin.bottom} />
            </clipPath>
            <g ref={this.yAxisRef} transform={`translate(${this.margin.left}, ${this.margin.top})`}/>
              <g clipPath="url(#dataClip)">
                <g transform={`matrix(${this.state.a}, 0, 0, ${this.state.d}, ${this.state.e}, ${this.state.f})`}>
                  {rects}
                </g>
              </g>
            <g ref={this.xAxisRef} transform={`translate(0, ${this.height - this.margin.bottom})`}/>
          </svg>
        </div>
        <div className="">
          <div className="">
            <AudioPlayer audioFile={this.state.mp3Link}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Graph;