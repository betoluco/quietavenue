import { pointers } from "d3-selection";
import { mean } from "d3-array";
import { dispatch } from "d3-dispatch";

const customZoom = (graph, graphEvents, a, d, e, f) => {
  graph
  .on("mousedown", (event) => {
    const t =  pointers(event);
    const pointerPosition = [ mean(t, d => d[0]),  mean(t, d => d[1])];
    graphEvents.call("mousedown", this, pointerPosition);
  })
  
  .on("touchstart", (event) => {
    const t =  pointers(event);
    if (t.length > 1) {
      event.preventDefault();
      pointerPosition = [ mean(t, d => d[0]),  mean(t, d => d[1])]; // (A)
      
      pointerDistance =
      t.length > 1 && Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]); // (B)
    }
  })
  
  .on("mouseup touchend", (event) => {
    graphEvents.call("mouseupTouchend", this);
  })
  
  .on("mousemove", (event) => {
    // if (!pointerPosition) return; // mousemove with the mouse up
    
    const t = pointers(event);
    
    // matrix.e -= pointerPosition[0];
    // matrix.f -= pointerPosition[1];
    const pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
    // matrix.e += pointerPosition[0];
    // matrix.f += pointerPosition[1];
    
    graphEvents.call( "mousemove", this, pointerPosition);
  })
  
  // .on("touchmove", (event) => {
  //   if (!pointerPosition) dispatch.call("oneFinger", this);
  //   if (!pointerPosition) return; // mousemove with the mouse up
   
    
  //   const t = pointers(event);
    
  //   // (A)
  //   if (t.length > 1) {
  //     matrix.e -= pointerPosition[0];
  //     matrix.f -= pointerPosition[1];
  //     pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
  //     matrix.e += pointerPosition[0];
  //     matrix.f += pointerPosition[1];
  
  //     // (B)
  //     // scale /= pointerDistance;
  //     // pointerDistance = Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]);
  //     // scale *= pointerDistance;
      
  //     // graphEvents.call("zoom", this, { k:scale, x:position[0], y:position[1]});
  //   }
  // })
  
  // .on("wheel", (event) => {
  //   event.preventDefault();
  //   const t = pointers(event);
  //   const pointerPosition = [mean(t, d => d[0]), mean(t, d => d[1])];
    
  //   const inverseTranformationCoordinates = [
  //     pointerPosition[0]/matrix.a - matrix.e/matrix.a,
  //     pointerPosition[1]/matrix.d - matrix.f/matrix.d,
  //   ];
    
  //   matrix.a = matrix.d *= 1 + event.wheelDelta / 1000;
  //   matrix.e = pointerPosition[0] - inverseTranformationCoordinates[0] * matrix.a;
  //   matrix.f = pointerPosition[1] - inverseTranformationCoordinates[1] * matrix.d;
    
  //   graphEvents.call("zoom", this, {...matrix});
  // });
};

export default customZoom;