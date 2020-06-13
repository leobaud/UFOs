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

let filters = {};

function handleChange() {
// Grab the datetime value from the filter
let changedElement = d3.select(this);
let filterValue = changedElement.property("value").trim()
let filterId = changedElement.attr("id")
console.log(filterValue, filterId)

if (filterValue){
  filters[filterId] = filterValue
}
else {
  delete filters[filterId]

}
  
console.log(filters);

// if (filterValue) {
//   filteredData = filteredData.filter(row => row. === filterValue);

// } 
// else {buildTable(tableData);

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


//      // Check to see if a date was entered and filter the
//     // data using that date.
// if (date) {
//       // Apply `filter` to the table data to only keep the
//       // rows where the `datetime` value matches the filter value
//     filteredData = filteredData.filter(row => row.datetime === date);
//     }
//     // Rebuild the table using the filtered data
//     // @NOTE: If no date was entered, then filteredData will
//     // just be the original tableData.


// let city = d3.select("#city").property("value");
// filteredData = tableData;
// if (city) {
//     filteredData = filteredData.filter(row => row.city === city);
//     }

// let state = d3.select("#state").property("value")
// filteredData = tableData;
// if (state) {
//     filteredData = filteredData.filter(row => row.city === state);
//     } 
    
// let country = d3.select("#country").property("value");
// filteredData = tableData;
// if (country) {
//     filteredData = filteredData.filter(row => row.city === country);
//     }

// let shape = d3.select("#shape").property("value");
// filteredData = tableData;
// if (shape) {
//     filteredData = filteredData.filter(row => row.city === shape);
//     }
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