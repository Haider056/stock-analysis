import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';

const ExchangeRate = () => {
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    fetchExchangeRates();
  }, []);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(
        'https://api.exchangerate-api.com/v4/latest/USD'
      );
      const { rates } = response.data;
      setExchangeRates(rates);
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  return (
    <div className="container exchange-rate">
      <h2>Real-Time Exchange Rate</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Currency Pair</th>
            <th>Exchange Rate</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(exchangeRates).map(([currency, rate]) => (
            <tr key={currency}>
              <td>{`USD/${currency}`}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <style>{`
        .exchange-rate {
          margin-left: 17%;
          width:80%;
        }
        
        @media (max-width: 768px) {
          .exchange-rate {
            margin-left: 3%;
            margin-top:10%;
          }
        }
      `}</style>
    </div>
  );
};

export default ExchangeRate;
