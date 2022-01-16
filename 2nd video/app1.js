const countryData = {
  items: ['China', 'India', 'USA'],
  addItem(item) {
    this.items.push(item);
  },
  removeItem(index) {
    this.items.splice(index, 1);
  },
  updateItem(index, item) {
    this.items[index] = item;
  }
}

d3.select('ul')
  .selectAll('li')
  .data(countryData.items, data => data)
  .enter()  // find out how many items(li in this case) are missing based on the data
  .append('li')
  .text(data => data);

setTimeout(() => {
  countryData.addItem('Germany');
  d3.select('ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .enter()  
    .append('li')
    .classed('added', true)
    .text(data => data);

}, 2000);

setTimeout(() => {
  countryData.removeItem(0);
  d3.select('ul')
    .selectAll('li') 
    .data(countryData.items, data => data) 
    .exit()  // this finds out which items are no longer needed
    .classed('redundant', true) 
    //.remove(); // this removes the redundant items
}, 4000);

setTimeout(() => {
  countryData.updateItem(1, 'Japan');
  d3.select('ul')
    .selectAll('li')
    .data(countryData.items, data => data)
    .exit()  // this finds out which items are no longer needed
    .classed('updated', true)
    .text('Russia');
}, 6000);