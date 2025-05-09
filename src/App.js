import React, { useState } from 'react';
import CurrencySelect from './components/CurrencySelect';
import 'bootstrap/dist/css/bootstrap.min.css';

const rates = {
  USD: 1,
  EUR: 0.85,
  GBP: 0.75,
  JPY: 110,
};

function App() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const currencies = Object.keys(rates);

  const handleConvert = () => {
    // Проверка: поле должно быть не пустым
    if (amount === '' || isNaN(amount)) {
      setError('Пожалуйста, введите корректное число');
      setResult(null);
      return;
    }

    const inputAmount = parseFloat(amount);

    // Добавляем проверку на отрицательные значения
    if (inputAmount < 0) {
      setError('Отрицательные значения не допускаются');
      setResult(null);
      return;
    }

    setError('');
    const convertedAmount = inputAmount * (rates[toCurrency] / rates[fromCurrency]);
    setResult(`${inputAmount} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`);
  };

  return (
      <div className="container mt-5">
        <h2>Конвертер валют</h2>
        <div className="form-group">
          <label>Сумма</label>
          <input
              type="number"
              min="0"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Введите сумму для конвертирования"
          />
        </div>
        <div className="row">
          <div className="col-md-6">
            <CurrencySelect
                label="Из валюты"
                currencies={currencies}
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <CurrencySelect
                label="В валюту"
                currencies={currencies}
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
            />
          </div>
        </div>
        <button className="btn btn-primary mt-3" onClick={handleConvert}>
          Конвертировать
        </button>
        {error && <div className="alert alert-danger mt-3">{error}</div>}
        {result && <div className="alert alert-success mt-3">{result}</div>}
      </div>
  );
}

export default App;
