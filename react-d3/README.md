This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).


## React and D3

My attempt to see how React and D3 fit together. The idea is to display a bunch of performance charts for composites, accounts and securities
with the charts rendered with D3 but the application itself pulled together with react.

The way I've brought this together is to have D3 handle the math of determining the size and location of the bars in bar charts or the location of the points in the line chart
and to wrap the svg for these charts as react components and then let React handle their actual rendering and refreshing.

[Take a look....](https://reactd3.firebaseapp.com/) 

