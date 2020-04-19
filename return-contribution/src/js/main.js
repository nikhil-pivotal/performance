
import App from "./app";

let app = new App();

// Setup the event handlers: The bridge between html and js

// Change of Report Dimension along which we want to see return contributions
let selection = document.getElementById('dimension');
selection.addEventListener('change', function (e) {
    let portfolioDimension = e.currentTarget.value;
    app.showChartForDimension(portfolioDimension);
});

// The back button to go back up the report path
let back = document.querySelector(".back")
back.addEventListener("click", function (e) {
    app.showChartUpOneLevel();
});

// The bar direction
let barDirectionElem = document.getElementById('barMode');
barDirectionElem.addEventListener('change', function (e) {
    app.changeBarDirection(e.currentTarget.value);
});

// Kick off with the initial rendering call with a default root dimension
app.showChartForDimension();