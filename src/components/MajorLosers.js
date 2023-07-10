import React, { useEffect, useState } from 'react';

const MajorLosers = () => {
  const [losers, setLosers] = useState([]);

  useEffect(() => {
    const fetchLosers = async () => {
      try {
        const loserAPI = '9efa85bf020191ca01519286bc44c8e0';
        const url = `https://financialmodelingprep.com/api/v3/stock_market/losers?apikey=${loserAPI}`;
        const response = await fetch(url);
        const data = await response.json();
        setLosers(data);
      } catch (error) {
        console.error('Error fetching losers:', error);
      }
    };

    fetchLosers();
  }, []);

  return (
    <div style={{ marginLeft: '20%' }}>
      <h2>Major Losers</h2>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          border: '1px solid #ccc',
        }}
      >
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Symbol</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Name</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Price</th>
            <th style={{ border: '1px solid #ccc', padding: '8px' }}>Change</th>
          </tr>
        </thead>
        <tbody>
          {losers.map((loser) => (
            <tr key={loser.symbol}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{loser.symbol}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{loser.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{loser.price}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{loser.changesPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>
        {`
          @media (max-width: 900px) {
            div[style*="margin-left: 20%"] {
              margin-left: 10px !important;
              margin-Top:40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default MajorLosers;
