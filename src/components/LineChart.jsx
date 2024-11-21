import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function LineChart() {
  const d3Container = useRef(null);

  useEffect(() => {
    // Ensure that the container is cleared before rendering the chart
    const container = d3Container.current;
    if (!container) return;

    // Clear any existing content in the container to prevent duplicate charts
    container.innerHTML = ''; 

    // Example data
    const data = [
      { date: new Date(2020, 0, 1), value: 100 },
      { date: new Date(2020, 1, 1), value: 150 },
      { date: new Date(2020, 2, 1), value: 250 },
      { date: new Date(2020, 3, 1), value: 300 },
      { date: new Date(2020, 4, 1), value: 400 }
    ];

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 800 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .nice()
      .range([height, 0]);

    svg.append('g')
      .selectAll('.line')
      .data([data])
      .enter()
      .append('path')
      .attr('class', 'line')
      .attr('d', d3.line().x(d => x(d.date)).y(d => y(d.value)))
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 2);

    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    svg.append('g')
      .call(d3.axisLeft(y));

  }, []); // Empty dependency array ensures the effect runs once after the component mounts

  return <div ref={d3Container}></div>;
}

export default LineChart;
