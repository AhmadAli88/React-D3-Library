import { useRef, useEffect } from 'react';
import * as d3 from 'd3';

function ForceDirectedGraph() {
  const d3Container = useRef(null);

  useEffect(() => {
    const width = 800;
    const height = 600;

    // Ensure that the container is cleared before rendering the graph
    const container = d3Container.current;
    if (!container) return;

    container.innerHTML = '';  // Clear any existing SVG elements before adding new ones

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const simulation = d3.forceSimulation()
      .force('charge', d3.forceManyBody().strength(-100))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collide', d3.forceCollide(50));

    const nodes = [
      { id: 1, x: 100, y: 100 },
      { id: 2, x: 300, y: 300 },
      { id: 3, x: 500, y: 200 },
      { id: 4, x: 700, y: 400 },
    ];

    const links = [
      { source: 1, target: 2 },
      { source: 2, target: 3 },
      { source: 3, target: 4 },
    ];

    const link = svg.append('g')
      .selectAll('line')
      .data(links)
      .enter()
      .append('line')
      .attr('stroke', '#999')
      .attr('stroke-width', 2);

    const node = svg.append('g')
      .selectAll('circle')
      .data(nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', 'steelblue')
      .call(d3.drag()
        .on('start', dragstart)
        .on('drag', dragged)
        .on('end', dragend));

    simulation
      .nodes(nodes)
      .on('tick', ticked);

    simulation.force('link', d3.forceLink(links).id(d => d.id).distance(200));

    function ticked() {
      link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

      node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);
    }

    function dragstart(event, d) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragend(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
  }, []); // Empty dependency array ensures this runs once on mount

  return <div ref={d3Container}></div>;
}

export default ForceDirectedGraph;
