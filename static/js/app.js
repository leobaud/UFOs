// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
var tbody = d3.select("tbody");

function buildTable(data) {
    // First, clear out any existing data
    tbody.html("");
  
    // Next, loop through each object in the data
    // and append a row and cells for each value in the row
    data.forEach((dataRow) => {
      // Append a row to the table body
      let row = tbody.append("tr");
  
      // Loop through each field in the dataRow and add
      // each value as a table cell (td)
      Object.values(dataRow).forEach((val) => {
        let cell = row.append("td");
        cell.text(val);
        }
      );
    });
  }

// Keep track of all filters
let filters = {};

// This function will replace your handleClick function
function handleChange() {

// Set variable for the handleChange funciton
let changedElement = d3.select(this);
let filterValue = changedElement.property("value").trim()
let filterId = changedElement.attr("id")
console.log(filterValue, filterId)

// Conditional if there is information in the filters filter, if not back to original table.
if (filterValue){
  filters[filterId] = filterValue
}
else {
  delete filters[filterId]

}
  
console.log(filters);

// Call function to apply all filters and rebuild the table
filterTable()
}


function filterTable() {

  // Set the filteredData to the tableData
  let filteredData = tableData;

  // Loop through all of the filters and keep any data that
  // matches the filter values
  Object.entries(filters).forEach(([key, value]) => {
    filteredData = filteredData.filter(row => row[key] === value)
  })


  // Finally, rebuild the table using the filtered Data
  buildTable(filteredData);
}

function clearFilters(){

  d3.selectAll("input").property("value", "")

  filters = {}

  buildTable(tableData);
}

// Attach an event to listen for the form button
d3.selectAll("input").on("change", handleChange);
d3.select("#filter-btn").on("click", clearFilters)

// Build the table when the page loads
buildTable(tableData);