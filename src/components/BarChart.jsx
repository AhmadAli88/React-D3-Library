import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function MyBarChart() {
  const d3Container = useRef(null); // Creating a reference for the D3 container

  useEffect(() => {
    // Ensure that the container is available before proceeding
    const container = d3Container.current;
    if (!container) return;

    // Data for the bar chart
    const data = [100, 200, 300, 400, 500];

    // Setting up the D3 chart
    const svg = d3.select(container)
      .append('svg')
      .attr('width', 500)
      .attr('height', 300)
      .style('background-color', '#f3f3f3');

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 100)
      .attr('y', (d) => 300 - d)
      .attr('width', 50)
      .attr('height', (d) => d)
      .attr('fill', 'steelblue');
  }, []); // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  return <div ref={d3Container}></div>; // The D3 chart is appended to this div
}

export default MyBarChart;
