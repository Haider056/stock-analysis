import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col } from 'react-bootstrap';
import './CurrencyConversion.css';

const CurrencyConversion = () => {
  const [exchangeRates, setExchangeRates] = useState({});
  const [sourceCurrency, setSourceCurrency] = useState('');
  const [targetCurrency, setTargetCurrency] = useState('');
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');

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

  const handleCurrencyConversion = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://api.exchangerate-api.com/v4/latest/${sourceCurrency}`
      );
      const { rates } = response.data;
      const conversionRate = rates[targetCurrency];
      setResult((parseFloat(amount) * conversionRate).toFixed(2));
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <div className="container currency-conversion "id="div1" >
      <h1>Dashboard Overview</h1>

      <h2>Currency Conversion</h2>
      <Form onSubmit={handleCurrencyConversion}>
        <Row>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="sourceCurrency">
              <Form.Label>Source Currency</Form.Label>
              <Form.Control
                as="select"
                value={sourceCurrency}
                onChange={(e) => setSourceCurrency(e.target.value)}
              >
                <option value="">Select currency</option>
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="targetCurrency">
              <Form.Label>Target Currency</Form.Label>
              <Form.Control
                as="select"
                value={targetCurrency}
                onChange={(e) => setTargetCurrency(e.target.value)}
              >
                <option value="">Select currency</option>
                {Object.keys(exchangeRates).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Col>
          <Col xs={12} sm={6} md={4}>
            <Form.Group controlId="amount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col xs={{ span: 12, order: 2 }} sm={{ span: 6, order: 2 }} md={{ span: 4, order: 1 }} className="convert-button-row">
            <Button variant="primary" type="submit" block>
              Convert
            </Button>
          </Col>
        </Row>
      </Form>
      {result && (
        <div className="result">
          <h3>Value: {result} {targetCurrency}</h3>
        </div>
      )}
    </div>
  );
};

export default CurrencyConversion;
