import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';

function StockNews() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      const apiKey = '3a6b82377a2c4a3b984721b42073f2e8';
      const query = 'Apple';
      const fromDate = '2023-06-29';
      const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=${fromDate}&sortBy=popularity&apiKey=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log('Fetched news data:', data);

        if (data.articles && data.articles.length > 0) {
          setNewsData(data.articles.slice(0, 30));
        } else {
          setNewsData([]);
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        setError('Error fetching news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  console.log('newsData:', newsData);
  console.log('loading:', loading);
  console.log('error:', error);

  return (
    <div className="stock-news-container" style={{ marginLeft: '18%' }}>
      <h2 className="stock-news-title">Stock Market News</h2>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <h3>Error fetching news</h3>
      ) : (
        <div className="stock-news-list">
          {newsData.length > 0 ? (
            newsData.map((newsItem) => (
              <Card key={newsItem.title} className="stock-news-card">
                <Card.Body>
                  <Card.Title>
                    <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                      {newsItem.title}
                    </a>
                  </Card.Title>
                  <Card.Text>{newsItem.description}</Card.Text>
                  {/* Additional content */}
                </Card.Body>
              </Card>
            ))
          ) : (
            <h3>No news articles available</h3>
          )}
          
        </div>
      )}
    </div>
  );
}

export default StockNews;
