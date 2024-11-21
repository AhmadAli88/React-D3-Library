import{ useRef, useState, useEffect } from 'react';
import * as d3 from 'd3';

function InteractiveBarChart() {
  const [data, setData] = useState([100, 200, 300, 400, 500]);
  const d3Container = useRef(null);

  useEffect(() => {
    // Setting up the D3 chart
    const svg = d3.select(d3Container.current)
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

    // Updating the bars when data changes
    svg.selectAll('rect')
      .data(data)
      .transition()
      .duration(1000)
      .attr('y', (d) => 300 - d)
      .attr('height', (d) => d);
  }, [data]);

  const updateData = () => {
    const newData = data.map(() => Math.floor(Math.random() * 500));
    setData(newData);
  };

  return (
    <div>
      <button onClick={updateData}>Update Data</button>
      <div ref={d3Container}></div>
    </div>
  );
}

export default InteractiveBarChart;
