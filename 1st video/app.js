const dummyData = [
  { id: 1, name: 'John', age: 10 },
  { id: 2, name: 'Jane', age: 11 },
  { id: 3, name: 'Joe', age: 12 },
  { id: 4, name: 'Jenny', age: 6 },
]

const xScale = d3
  .scaleBand()
  .domain(dummyData.map((dataPoint) => dataPoint.name))
  .rangeRound([0, 250])
  .padding(0.1);

const yScale = d3.scaleLinear().domain([0, 15]).range([200, 0]);

const container = d3.select('svg').classed('container', true);

const bars = container
  .selectAll('.bar')
  .data(dummyData)
  .enter()
  .append('rect')
  .classed('bar', true)
  .attr('width', xScale.bandwidth())
  .attr('height', (data) => 200 - yScale(data.age))
  .attr('x', data => xScale(data.name))
  .attr('y', data => yScale(data.age));

  setTimeout(() => {
    bars.data(dummyData.slice(0, 2)).exit().remove();
  }, 2000);