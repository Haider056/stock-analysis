import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

import { useParams } from 'react-router-dom';

function SelectiveSearch(props) {
  const { symbol, detail } = useParams();
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);

  const headerAPIFromTimeDetail = (detail) => {
    if (detail === 'TIME_SERIES_WEEKLY_ADJUSTED') {
      return 'Weekly Adjusted Time Series';
    } else if (detail === 'TIME_SERIES_DAILY_ADJUSTED') {
      return 'Time Series (Daily)';
    } else {
      return 'Monthly Time Series';
    }
  };

  const style = {
    width: '80%',
    float: 'right',
    textAlign: 'center',
    marginTop: '50px',
  };

  const fetchStock = () => {
    const API_KEY = 'DS92UQDTHB4JEV4A';
    const StockSymbol = 'AAPL';
    const headerAP = headerAPIFromTimeDetail(detail);
    const API_Call = `https://www.alphavantage.co/query?function=${detail}&symbol=${symbol}&outputsize=compact&apikey=${API_KEY}`;
    const stockChartXValuesFunction = [];
    const stockChartYValuesFunction = [];

    fetch(API_Call)
      .then((response) => response.json())
      .then((data) => {
        for (let key in data[headerAP]) {
          stockChartXValuesFunction.push(key);
          stockChartYValuesFunction.push(data[headerAP][key]['1. open']);
        }

        setStockChartXValues(stockChartXValuesFunction);
        setStockChartYValues(stockChartYValuesFunction);
      });
  };

  useEffect(() => {
    fetchStock();
  }, []);

  return (
    <div style={style}>
      <h1>Stock Market</h1>
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'red' },
          },
        ]}
        layout={{ width: 1500, height: 720, title: symbol }}
      />
    </div>
  );
}

export default SelectiveSearch;
