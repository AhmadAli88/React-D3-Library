import { useRef, useEffect } from 'react';
// import ReactD3 from 'react-d3-library';
import * as d3 from 'd3';

const D3Chart = () => {
  const chartContainerRef = useRef();

  useEffect(() => {
    // D3 chart creation
    const data = [10, 20, 30, 40, 50];
    const width = 300;
    const height = 150;
    
    // Create SVG element
    const svg = d3.select(chartContainerRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height);
    
    // Create bars for the bar chart
    svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d, i) => i * 60)
      .attr("y", d => height - d)
      .attr("width", 50)
      .attr("height", d => d)
      .attr("fill", "teal");
  }, []);

  return (
    <div ref={chartContainerRef}></div>
  );
};

export default D3Chart;
