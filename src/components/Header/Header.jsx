import './Header.css';

const Header = (props) => {
  const { exchangeRates } = props;

  return (
    <header className="header">
      <h1 className="header__title">
        Exchange Rates
      </h1>
      {exchangeRates?.UAH.USD && exchangeRates?.UAH.EUR && (
        <div className="header__exchange-rates">
          <span><b>USD:</b></span> {exchangeRates?.UAH.USD} | 
          <span><b> EUR:</b></span> {exchangeRates?.UAH.EUR}
        </div>
      )}
    </header >
  );
};

export default Header;