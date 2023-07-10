import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import Select from 'react-select';
import { AuthContext } from '../App';
import { useContext } from 'react';
import './Stock.css';
function Stock() {
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const [timeDetail, setTimeDetail] = useState('TIME_SERIES_DAILY_ADJUSTED');
  const [historicalData, setHistoricalData] = useState([
    { label: 'TIME_SERIES_MONTHLY', value: 'TIME_SERIES_DAILY_ADJUSTED' },
    { label: 'TIME_SERIES_YEARLY', value: 'TIME_SERIES_WEEKLY_ADJUSTED' }
  ]);
  
  const [currentComp,setCurrentComp] = useState('AAPL')

  const [companyC] = useState([
    { label: 'Apple Inc.', value: 'AAPL' },
    { label: 'Microsoft Corporation', value: 'MSFT' },
    { label: 'Amazon.com Inc.', value: 'AMZN' },
    { label: 'Alphabet Inc. (Google)', value: 'GOOGL' },
    { label: 'Facebook, Inc.', value: 'FB' },
    { label: 'Tesla, Inc.', value: 'TSLA' },
    { label: 'Berkshire Hathaway Inc.', value: 'BRK.A' },
    { label: 'Johnson & Johnson', value: 'JNJ' },
    { label: 'JPMorgan Chase & Co.', value: 'JPM' },
    { label: 'Visa Inc.', value: 'V' },
    { label: 'Walmart Inc.', value: 'WMT' },
    { label: 'Procter & Gamble Company', value: 'PG' },
    { label: 'UnitedHealth Group Incorporated', value: 'UNH' },
    { label: 'Mastercard Incorporated', value: 'MA' },
    { label: 'Verizon Communications Inc.', value: 'VZ' },
    { label: 'Intel Corporation', value: 'INTC' },
    { label: 'Adobe Inc.', value: 'ADBE' },
    { label: 'PayPal Holdings, Inc.', value: 'PYPL' },
    { label: 'Bank of America Corporation', value: 'BAC' },
    { label: 'Cisco Systems, Inc.', value: 'CSCO' },
    { label: 'Netflix, Inc.', value: 'NFLX' },
    { label: 'Salesforce.com, Inc.', value: 'CRM' },
    { label: 'Coca-Cola Company', value: 'KO' },
    { label: 'Pfizer Inc.', value: 'PFE' },
    { label: 'AT&T Inc.', value: 'T' },
    { label: 'NVIDIA Corporation', value: 'NVDA' },
    { label: 'Home Depot, Inc.', value: 'HD' },
    { label: 'Visa Inc.', value: 'V' },
    { label: 'Verizon Communications Inc.', value: 'VZ' },
    { label: 'PepsiCo, Inc.', value: 'PEP' },
    { label: 'Walt Disney Company (The)', value: 'DIS' },
    { label: 'Abbott Laboratories', value: 'ABT' },
    { label: 'Merck & Co., Inc.', value: 'MRK' },
    { label: 'AbbVie Inc.', value: 'ABBV' },
    { label: 'Broadcom Inc.', value: 'AVGO' },
    { label: 'Medtronic plc', value: 'MDT' },
    { label: 'McDonald\'s Corporation', value: 'MCD' },
    { label: 'Caterpillar Inc.', value: 'CAT' },
    { label: '3M Company', value: 'MMM' },
    { label: 'Starbucks Corporation', value: 'SBUX' },
    { label: 'Honeywell International Inc.', value: 'HON' },
    { label: 'Costco Wholesale Corporation', value: 'COST' },
    { label: 'Amgen Inc.', value: 'AMGN' },
    { label: 'CME Group Inc.', value: 'CME' },
    { label: 'IBM', value: 'IBM' },
    { label: 'Accenture plc', value: 'ACN' },
    { label: 'Texas Instruments Incorporated', value: 'TXN' },
    { label: 'Thermo Fisher Scientific Inc.', value: 'TMO' },
    { label: 'Nike, Inc.', value: 'NKE' },
    { label: 'Goldman Sachs Group, Inc. (The)', value: 'GS' },
    { label: 'American Express Company', value: 'AXP' },
    { label: 'NextEra Energy, Inc.', value: 'NEE' },
    { label: 'Comcast Corporation', value: 'CMCSA' },
    { label: 'QUALCOMM Incorporated', value: 'QCOM' },
    { label: 'Charter Communications, Inc.', value: 'CHTR' },
    { label: 'Danaher Corporation', value: 'DHR' },
    { label: 'Union Pacific Corporation', value: 'UNP' },
    { label: 'Biogen Inc.', value: 'BIIB' },
    { label: 'Colgate-Palmolive Company', value: 'CL' },
    { label: 'S&P Global Inc.', value: 'SPGI' },
    { label: 'Lockheed Martin Corporation', value: 'LMT' },
    { label: 'T-Mobile US, Inc.', value: 'TMUS' },
    { label: 'Lowe\'s Companies, Inc.', value: 'LOW' },
    { label: 'Amphenol Corporation', value: 'APH' },
    { label: 'General Electric Company', value: 'GE' },
    { label: 'Gilead Sciences, Inc.', value: 'GILD' },
    { label: 'Booking Holdings Inc.', value: 'BKNG' },
    { label: 'Raytheon Technologies Corporation', value: 'RTX' },
    { label: 'Automatic Data Processing, Inc.', value: 'ADP' },
    { label: 'Bristol-Myers Squibb Company', value: 'BMY' },
    { label: 'General Motors Company', value: 'GM' },
    { label: 'Eli Lilly and Company', value: 'LLY' },
    { label: 'DuPont de Nemours, Inc.', value: 'DD' },
    { label: 'Target Corporation', value: 'TGT' },
    { label: 'Anthem, Inc.', value: 'ANTM' },
    { label: 'American International Group, Inc.', value: 'AIG' },
    { label: 'United Technologies Corporation', value: 'UTX' },
    { label: 'Ford Motor Company', value: 'F' },
    { label: 'Deere & Company', value: 'DE' },
    { label: 'Dow Inc.', value: 'DOW' },
    { label: 'ConocoPhillips', value: 'COP' },
    { label: 'Cigna Corporation', value: 'CI' },
    { label: 'Sysco Corporation', value: 'SYY' },
    { label: 'Mondelez International, Inc.', value: 'MDLZ' },
    { label: 'Marriott International, Inc.', value: 'MAR' },
    { label: 'United Parcel Service, Inc.', value: 'UPS' },
    { label: 'Duke Energy Corporation', value: 'DUK' },
    { label: 'Abbott Laboratories', value: 'ABT' },
    { label: 'BHP Group', value: 'BHP' },
  ]);

  const { isLoggedIn, emaill } = useContext(AuthContext);

  useEffect(() => {
    fetchStock();
  }, [currentComp, timeDetail]);

  const changeIt = (e) => {
    setTimeDetail(e.value);
  };

  const changeCompnay = (e) => {
    setCurrentComp(e.value);
  };

  const fetchStock = () => {
    const API_KEY = 'DS92UQDTHB4JEV4A';
    const headerAP = headerAPIFromTimeDetail(timeDetail);
    const API_Call = `https://www.alphavantage.co/query?function=${timeDetail}&symbol=${currentComp}&outputsize=compact&apikey=${API_KEY}`;
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

  const handleSubmit = async (e) => {
    const email =  emaill
    const company= currentComp
    
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:5000/opers/insertW/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, company ,timeDetail })
      });
  
      if (response.ok) {
        alert('Data Added to WatchList');
        console.log('watchlist updated');
      } else {
        alert('Some Thing went Wrong!');
        console.error('Error ');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }}
    const addToWatchList =(e)=>{
      if(isLoggedIn){
        handleSubmit(e)
      }
      else{

        alert("Login to add to watchList!")
      }


    }

  const headerAPIFromTimeDetail = (timeDetail) => {
    if (timeDetail === 'TIME_SERIES_WEEKLY_ADJUSTED') {
      return 'Weekly Adjusted Time Series';
    } else if (timeDetail === 'TIME_SERIES_DAILY_ADJUSTED') {
      return 'Time Series (Daily)';
    } else {
      return 'Monthly Time Series';
    }
  };
return (
  <div className="stock-container">
    <h1>Stock Market</h1>

    <div className="controls-container">
      <div className="select-container">
        <Select
          className="select-option"
          value={companyC.find((option) => option.value === currentComp)}
          options={companyC}
          onChange={changeCompnay}
          placeholder="Select a stock"
          isSearchable
        />

        <Select
          className="select-option"
          value={historicalData.find((option) => option.value === timeDetail)}
          options={historicalData}
          onChange={changeIt}
          placeholder="Select an interval"
          isSearchable
        />
      </div>

      <button className="add-button" onClick={addToWatchList}>
        Add to WatchList
      </button>
    </div>

    <div className="chart-container">
      <Plot
        data={[
          {
            x: stockChartXValues,
            y: stockChartYValues,
            type: 'scatter',
            mode: 'lines+markers',
            marker: { color: 'blue' },
          },
        ]}
        layout={{
          width: '100%',
          height: '720px',
          title: currentComp,
          margin: {
            l: 40,
            r: 40,
            t: 40,
            b: 40,
          },
        }}
      />
    </div>
  </div>
);

}

export default Stock;