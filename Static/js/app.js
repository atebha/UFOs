// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear any existing data
  tbody.html("");

  // Next, loop through each object in data and append a row and cells for each value in row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the data row(dataRow) and add each value as a table cell(td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save changed element as a variable.
    let changedElement = d3.select(this);

    // 4b. Save changed value as a variable.
    let elementValue = changedElement.property("value");
    //console.log(elementValue);

    // 4c. Save changed id as a variable.
    let filterID = changedElement.attr("id");
    //console.log(filterID);
  
    // 5. If a filter value was entered then add that filterId and value to the filters list. 
    //    Otherwise, clear that filter from the filters object.
    if (elementValue) {
      filters[filterID] = elementValue;
    }
    else {
      delete filters[filterID];
    }
        
    // 6. Call function applied to all filters and rebuild table
    filterTable();
  
  }
  
  // 7. Function to filter the table when data is entered
  function filterTable() {
  
    // 8. Filtered data set to tableData
    let filteredData = tableData;
  
    // 9. Loop through all filters and keep any data that matches the filter
    for (const value in filters) {
      filteredData = filteredData.filter(row => row[value] === filters[value]);
    }
    
    // 10. Rebuild the table using the filtered data
    buildTable(filteredData);
  }
  
  // 2. Attach an event to listen for changes to each filter
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);