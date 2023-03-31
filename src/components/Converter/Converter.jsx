import { useState } from "react";
import './Converter.css';

const Converter = (props) => {
    const { exchangeRates } = props;
    const [fromAmount, setFromAmount] = useState(0.00);
    const [toAmount, setToAmount] = useState(0.00);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('UAH');
  
    const handleFromAmountChange = (event) => {
      const value = event.target.value;
      setFromAmount(value);
      const amount = (value / exchangeRates[fromCurrency][toCurrency]).toFixed(2);
      if (value < 0) {
        setToAmount(0);
      }
      else {
        setToAmount(amount);
      }
    };
  
    const handleToAmountChange = (event) => {
      const value = event.target.value;
      setToAmount(value);
      const amount = (value / exchangeRates[toCurrency][fromCurrency]).toFixed(2);
      if (value < 0) {
        setFromAmount(0);
      }
      else {
        setFromAmount(amount);
      }
    };
  
    const handleFromCurrencyChange = (event) => {
      const currency = event.target.value;
      setFromCurrency(currency);
      const amount = (fromAmount / exchangeRates[currency][toCurrency]).toFixed(2);
      setToAmount(amount);
    };
  
    const handleToCurrencyChange = (event) => {
      const currency = event.target.value;
      setToCurrency(currency);
      const amount = (fromAmount / exchangeRates[fromCurrency][currency]).toFixed(2);
      setToAmount(amount);
    };

    return (
      <div className="currency-converter">
        <div className="currency-converter__input-container">
          <input className="currency-converter__currency-input"
            id="currency1"
            type="number"
            min={0}
            value={fromAmount}
            placeholder="Currency 1"
            onChange={handleFromAmountChange}
          />
          <label className="currency-converter__label" htmlFor="currency1">Currency 1</label>

          <select
            className="currency-converter__currency-select"
            value={fromCurrency}
            onChange={handleFromCurrencyChange}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="UAH">UAH</option>
          </select>
        </div>
        <div className="currency-converter__input-container">
          <input className="currency-converter__currency-input"
            id="currency2"
            type="number"
            min={0}
            value={toAmount}
            placeholder="Currency 2"
            onChange={handleToAmountChange} />
          <label className="currency-converter__label" htmlFor="currency2">Currency 2</label>
          <select
            className="currency-converter__currency-select"
            value={toCurrency}
            onChange={handleToCurrencyChange}
          >
            <option value="UAH">UAH</option>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
          </select>
        </div>
      </div>
    )
}

export default Converter