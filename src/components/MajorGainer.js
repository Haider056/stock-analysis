import React, { useEffect, useState } from 'react';

const MajorGainers = () => {
  const [gainers, setGainers] = useState([]);

  useEffect(() => {
    const fetchGainers = async () => {
      try {
        const loserAPI = '9efa85bf020191ca01519286bc44c8e0';
        const url = `https://financialmodelingprep.com/api/v3/stock_market/gainers?apikey=${loserAPI}`;
        const response = await fetch(url);
        const data = await response.json();
        setGainers(data);
      } catch (error) {
        console.error('Error fetching gainers:', error);
      }
    };

    fetchGainers();
  }, []);

  return (
    <div style={{ marginLeft: '20%' }}>
      <h2>Major Gainers</h2>
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
          {gainers.map((gainer) => (
            <tr key={gainer.symbol}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{gainer.symbol}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{gainer.name}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{gainer.price}</td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>{gainer.changesPercentage}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style>
        {`
          @media (max-width: 900px) {
            div[style*="margin-left: 20%"] {
              margin-left: 10px !important;
              margin-Top:40px
            }
          }
        `}
      </style>
    </div>
  );
};

export default MajorGainers;
