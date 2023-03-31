import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Preloader from './components/Preloader/Preloader';
import Header from './components/Header/Header';
import Converter from './components/Converter/Converter';


function App() {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const requestUAH = axios.get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/UAH`);
        const requestUSD = axios.get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/USD`);
        const requestEUR = axios.get(`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/EUR`);

        const responses = await Promise.all([requestUAH, requestUSD, requestEUR]);
        setExchangeRates(getConversionRates(responses));
      }
      catch (err) {
        console.error(err);
      }
      finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function getConversionRates(responses) {
    const [responseUAH, responseUSD, responseEUR] = responses;
    const conversionRates = {
      UAH: {
        USD: responseUSD.data.conversion_rates.UAH,
        EUR: responseEUR.data.conversion_rates.UAH,
        UAH: responseUAH.data.conversion_rates.UAH,
      },
      USD: {
        UAH: responseUAH.data.conversion_rates.USD,
        EUR: responseEUR.data.conversion_rates.USD,
        USD: responseUSD.data.conversion_rates.USD,
      },
      EUR: {
        UAH: responseUAH.data.conversion_rates.EUR,
        USD: responseUSD.data.conversion_rates.EUR,
        EUR: responseEUR.data.conversion_rates.EUR,
      },
    }
    return conversionRates
  };

  if (loading) {
    return (
      <Preloader />
    )
  }
  return (
    <>
      <Header exchangeRates={exchangeRates} />
      <Converter exchangeRates={exchangeRates} />
    </>
  );
}

export default App;
