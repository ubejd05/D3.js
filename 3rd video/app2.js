const dummyData = [
  { id: 'd1', region: 'USA', value: 10 },
  { id: 'd2', region: 'India', value: 12 },
  { id: 'd3', region: 'China', value: 11 },
  { id: 'd4', region: 'Germany', value: 6 },
];

const margins = {top: 20, bottom: 10};
const chartWidth = 600;
const chartHeight = 400 - margins.top - margins.bottom;

let selectedData = dummyData;

const xScale = d3.scaleBand().rangeRound([0, chartWidth]).padding(0.1);
const yScale = d3.scaleLinear().range([chartHeight, 0]);

const chartContainer = d3.select('svg')
  .attr('width', chartWidth)
  .attr('height', chartHeight + margins.top + margins.bottom);

xScale.domain(dummyData.map(data => data.region));
yScale.domain([0, d3.max(dummyData, data => data.value) + 3]);

const chart = chartContainer.append('g');

chart.append('g').call(d3.axisBottom(xScale).tickSizeOuter(0))
  .attr('color', '#4f009e')
  .attr('transform', `translate(0, ${chartHeight})`);

  function renderChart() {
    chart
      .selectAll(".bar")
      .data(selectedData, data => data.id)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("width", xScale.bandwidth())
      .attr("height", (data) => chartHeight - yScale(data.value))
      .attr("x", (data) => xScale(data.region))
      .attr("y", (data) => yScale(data.value));

    chart.selectAll(".bar").data(selectedData, data => data.id).exit().remove();

    chart
      .selectAll(".label")
      .data(selectedData, data => data.id)
      .enter()
      .append("text")
      .text((data) => data.value)
      .attr("x", (data) => xScale(data.region) + xScale.bandwidth() / 2)
      .attr("y", (data) => yScale(data.value) - 20)
      .attr("text-anchor", "middle")
      .classed("label", true);

    chart.selectAll(".label").data(selectedData, data => data.id).exit().remove();
  }

renderChart();

let unselectedIds = [];

const listItems = d3.select('#data')
  .select('ul')
  .selectAll('li')
  .data(dummyData)
  .enter()
  .append('li');

listItems.append('span').text(data => data.region);

listItems
  .append('input')
  .attr('type', 'checkbox')
  .attr('checked', true)
  .on('change', (data) => {
    if (unselectedIds.indexOf(data.id) === -1) {
      unselectedIds.push(data.id);
      console.log(data.id);
    } else {
      unselectedIds.splice(unselectedIds.indexOf(data.id), 1);
    }
    selectedData = dummyData.filter(d => unselectedIds.indexOf(d.id) === -1);
    renderChart();
  });