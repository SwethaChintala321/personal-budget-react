import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const DonutChart = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:3000/budget')
      .then((response) => {
        const data = response.data.myBudget;
        createDonutChart(data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const createDonutChart = (data) => {
    const width = 350; 
    const height = 150; 
    const radius = Math.min(width, height) / 2;

    const svg = d3.select(svgRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map((d) => d.title))
      .range(d3.schemeCategory10);

    const pie = d3.pie()
      .value((d) => d.budget);

    const pieData = pie(data);

    const arc = d3.arc()
      .innerRadius(radius / 2)
      .outerRadius(radius);

    svg.selectAll('path')
      .data(pieData)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', (d) => color(d.data.title))
      .attr('stroke', 'white')
      .style('stroke-width', '2px');

    svg.selectAll('text')
      .data(pieData)
      .enter()
      .append('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .attr('dy', '.35em')
      .style('text-anchor', 'middle')
      .text((d) => d.data.title);

    svg.append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
  };

  return (
    <div>
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default DonutChart;

