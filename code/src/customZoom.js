import { select, pointers } from "d3-selection";
import { mean } from "d3-array";
import { zoom } from "d3-zoom";

const customZoom = (graph, dispatch) => {
    let position = [0, 0], // (A)
    scale = 1; // (B)
    
    // status of the pointer(s)
    let pointerposition, // (A)
    pointerdistance; // (B)
    
    graph
    .on("mousedown", (event) => {
        event.preventDefault();
        const t =  pointers(event);
        
        pointerposition = [ mean(t, d => d[0]),  mean(t, d => d[1])]; // (A)
        
        pointerdistance =
        t.length > 1 && Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]); // (B)
        
    })
    .on("touchstart", (event) => {
        const t =  pointers(event);
        if (t.length > 1) {
            event.preventDefault();
            pointerposition = [ mean(t, d => d[0]),  mean(t, d => d[1])]; // (A)
            
            pointerdistance =
            t.length > 1 && Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]); // (B)
        }
    })
    .on("mouseup touchend", (event) => {
        pointerposition = null; 
    
    })
    .on("mousemove", (event) => {
        if (!pointerposition) return; // mousemove with the mouse up
        
        const t = pointers(event);
        
        // (A)
        position[0] -= pointerposition[0];
        position[1] -= pointerposition[1];
        pointerposition = [mean(t, d => d[0]), mean(t, d => d[1])];
        position[0] += pointerposition[0];
        position[1] += pointerposition[1];
        
        dispatch.call("zoom", this, { k:scale, x:position[0], y:position[1]});
    })
    .on("touchmove", (event) => {
        if (!pointerposition) dispatch.call("oneFinger", this);;
        if (!pointerposition) return; // mousemove with the mouse up
       
        
        const t = pointers(event);
        
        // (A)
        if (t.length > 1) {
            position[0] -= pointerposition[0];
            position[1] -= pointerposition[1];
            pointerposition = [mean(t, d => d[0]), mean(t, d => d[1])];
            position[0] += pointerposition[0];
            position[1] += pointerposition[1];
        
            // (B)
            scale /= pointerdistance;
            pointerdistance = Math.hypot(t[1][1] - t[0][1], t[1][0] - t[0][0]);
            scale *= pointerdistance;
            
            dispatch.call("zoom", this, { k:scale, x:position[0], y:position[1]});
        }
    })
    .on("wheel", (event) => {
        scale *= 1 + event.wheelDelta / 1000;
        event.preventDefault();
        dispatch.call("zoom", this, {x:position[0], y:position[1], k:scale});
    })
}

export default customZoom;